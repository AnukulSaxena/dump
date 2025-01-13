async generatePdf(data: any, flag: boolean) {
        let BasicDetails = data.Table;
        let LoadDetails = data.Table1;
        let PricingDetails = data.Table2.filter((obj: any) => obj.itemType == 'InvoiceItemCode' || obj.itemType == 'Manual_rate');
        let AccessorialDetails = data.Table2.filter((obj: any) => obj.itemType == 'Accessorial');
        let OrderDetails = data.Table3;
        let Commoditydetails = data.Table4;

        const DecimalPlaces = BasicDetails[0].decimalplaces;
        const doc = new jsPDF();

        // ********* Basic Details ***************************************
        let YAxis = 10;
        doc.setFontSize(30);
        doc.setFont('Times New Roman', 'bold');
        doc.text("Invoice", 200, 10, { align: 'right' }).setFontSize(11);

        doc.setFontSize(9);
        doc.setFont('Times New Roman', 'bold');
        doc.text("" + BasicDetails[0].InvoiceNumber + "", 200, 20, { align: 'right' }).setFontSize(10).setFont('Times New Roman', 'bold');

        doc.setFont('Times New Roman', 'normal');
        doc.text("Invoice No. :", (200 - doc.getTextWidth(BasicDetails[0].InvoiceNumber)), 20, { align: 'right' }).setFontSize(9);

        doc.setFontSize(12);
        doc.setFont('Times New Roman', 'bold');
        doc.text(BasicDetails[0].LegalEntityName, 13, YAxis).setFontSize(9)

        doc.setFontSize(9);
        doc.setFont('Times New Roman', 'normal');
        doc.text("Email : ", 13, (YAxis + 5)).setFontSize(9)
        doc.setFont('Times New Roman', 'normal');
        doc.text("" + BasicDetails[0].legalEntityEmail + "", 30, (YAxis + 5)).setFontSize(9).setFont('Times New Roman', 'normal');

        if (BasicDetails[0].legalEntityPhone) {
            doc.setFont('Times New Roman', 'normal');
            doc.text("Contact : ", 13, (YAxis + 10)).setFontSize(9)
            doc.setFont('Times New Roman', 'normal');
            doc.text("" + BasicDetails[0].legalEntityPhone + "", 30, (YAxis + 10)).setFontSize(9).setFont('Times New Roman', 'normal');

            YAxis = YAxis + 10;
        }
        else {
            YAxis = YAxis + 5;
        }

        doc.setFont('Times New Roman', 'normal');
        doc.text("Address : ", 13, (YAxis + 5)).setFontSize(9)
        doc.setFont('Times New Roman', 'normal');
        doc.text("" + BasicDetails[0].legalEntitystreetAddress + ", ", 30, (YAxis + 5)).setFontSize(9).setFont('Times New Roman', 'normal');
        doc.text("" + BasicDetails[0].legalEntityAddress + "", 30, (YAxis + 10)).setFontSize(9).setFont('Times New Roman', 'normal');

        YAxis = YAxis + 10;
        let Y2Axis = YAxis;
        //Horizontal Line
        // doc.line(10, (YAxis +2), 200, (YAxis +2));

        // ********* Customer Details ***************************************
        doc.setFont('Times New Roman', 'bold');
        doc.text("Bill To ", 13, (YAxis + 5)).setFontSize(9)

        doc.setFont('Times New Roman', 'normal');
        doc.text("Name :", 13, (YAxis + 10)).setFontSize(9)

        doc.setFont('Times New Roman', 'normal');
        doc.text(BasicDetails[0].CustomerName, 30, (YAxis + 10)).setFontSize(9)

        YAxis = YAxis + 10;
        if (BasicDetails[0].CustomerEmail) {
            doc.setFont('Times New Roman', 'normal');
            doc.text("Email :", 13, (YAxis + 5)).setFontSize(9);

            doc.setFont('Times New Roman', 'normal');
            doc.text(BasicDetails[0].CustomerEmail, 30, (YAxis + 5)).setFontSize(9);
            YAxis = YAxis + 5;
        }

        if (BasicDetails[0].CustomerContact) {
            doc.setFont('Times New Roman', 'normal');
            doc.text("Contact :", 13, (YAxis + 5)).setFontSize(9)

            doc.setFont('Times New Roman', 'normal');
            doc.text(BasicDetails[0].CustomerContact, 30, (YAxis + 5)).setFontSize(9);
            YAxis = YAxis + 5;
        }


        doc.setFont('Times New Roman', 'normal');
        doc.text("Address :", 13, (YAxis + 5)).setFontSize(9)

        doc.setFont('Times New Roman', 'normal');
        // doc.text(BasicDetails[0].CustomerStreetAddress , 30, (YAxis + 5)).setFontSize(9)
        doc.text(BasicDetails[0].CustomerAddress, 30, (YAxis + 5)).setFontSize(9)

        YAxis = YAxis + 5;
        // ********* Invoice Details ***************************************

        doc.setFontSize(9);
        doc.setFont('Times New Roman', 'normal');
        doc.text(moment(BasicDetails[0].InvoiceDate).format(this.dateFormat).toString(), 200, (Y2Axis + 5), { align: 'right' }).setFontSize(9)

        doc.setFont('Times New Roman', 'normal');
        doc.text("Invoice date : ", (200 - doc.getTextWidth(moment(BasicDetails[0].InvoiceDate).format(this.dateFormat).toString())), (Y2Axis + 5), { align: 'right' }).setFontSize(9)

        Y2Axis = Y2Axis + 5;
        if (BasicDetails[0].DueDate) {
            doc.setFont('Times New Roman', 'normal');
            doc.text(moment(BasicDetails[0].DueDate).format(this.dateFormat).toString(), 200, (Y2Axis + 5), { align: 'right' }).setFontSize(9)

            doc.setFont('Times New Roman', 'normal');
            doc.text("Due date : ", (200 - doc.getTextWidth(moment(BasicDetails[0].DueDate).format(this.dateFormat).toString())), (Y2Axis + 5), { align: 'right' }).setFontSize(9);
            Y2Axis = Y2Axis + 5;
        }

        if (BasicDetails[0].PaymentTerm) {
            doc.setFont('Times New Roman', 'normal');
            doc.text(BasicDetails[0].PaymentTerm, 200, (Y2Axis + 5), { align: 'right' }).setFontSize(9);

            doc.setFont('Times New Roman', 'normal');
            doc.text("Payment term : ", (200 - doc.getTextWidth(BasicDetails[0].PaymentTerm)), (Y2Axis + 5), { align: 'right' }).setFontSize(9);

            Y2Axis = Y2Axis + 5;
        }


        doc.setFont('Times New Roman', 'normal');
        doc.text((OrderDetails[0].ServiceType + ', ' + OrderDetails[0].ShippingTypeCode), 200, (Y2Axis + 5), { align: 'right' }).setFontSize(9)
        doc.setFont('Times New Roman', 'normal');
        doc.text("Service : ", (200 - doc.getTextWidth(OrderDetails[0].ServiceType + ', ' + OrderDetails[0].ShippingTypeCode)), (Y2Axis + 5), { align: 'right' }).setFontSize(9)

        doc.setFont('Times New Roman', 'normal');
        doc.text(OrderDetails[0].PONumber, 200, (Y2Axis + 10), { align: 'right' }).setFontSize(9)
        doc.setFont('Times New Roman', 'normal');
        doc.text("Customer PO : ", (200 - doc.getTextWidth(OrderDetails[0].PONumber)), (Y2Axis + 10), { align: 'right' }).setFontSize(9)

        Y2Axis = Y2Axis + 10;

        if (YAxis > Y2Axis) {
            YAxis = YAxis;
        }
        else {
            YAxis = Y2Axis;
        }
        // ********* Load Details ***************************************

        doc.line(10, (YAxis + 2), 200, (YAxis + 2)); //Horizontal Line
        let LoadYpixl = (YAxis + 10);
        let SubTotal = 0;
        for (let loadIndex = 0; loadIndex < LoadDetails.length; loadIndex++) {
            doc.setFontSize(10);
            doc.setFont('Times New Roman', 'bold');
            doc.text("Load No. :", 13, LoadYpixl).setFontSize(10)

            doc.setFont('Times New Roman', 'bold');
            doc.text(LoadDetails[loadIndex].load_number_to_display, 30, LoadYpixl).setFontSize(9)

            doc.setFont('Times New Roman', 'bold');
            doc.text("Shipper :", 13, (LoadYpixl + 5)).setFontSize(9)

            doc.setFont('Times New Roman', 'normal');
            doc.text(LoadDetails[loadIndex].ShipperValue, 30, (LoadYpixl + 5)).setFontSize(9)
            doc.text(LoadDetails[loadIndex].PickupCity + ', ' + LoadDetails[loadIndex].PickupState + ', ' + LoadDetails[loadIndex].PickupZipcode, 13, (LoadYpixl + 10)).setFontSize(9)


            doc.setFont('Times New Roman', 'normal');
            doc.text(LoadDetails[loadIndex].ConsigneeValue, 200, (LoadYpixl + 5), { align: 'right' }).setFontSize(9)
            doc.text(LoadDetails[loadIndex].DeliveryCity + ', ' + LoadDetails[loadIndex].DeliveryState + ', ' + LoadDetails[loadIndex].DeliveryZipcode, 200, (LoadYpixl + 10), { align: 'right' }).setFontSize(9)
            doc.setFont('Times New Roman', 'bold');
            doc.text("Consignee :", (200 - doc.getTextWidth(LoadDetails[loadIndex].ConsigneeValue)), (LoadYpixl + 5), { align: 'right' }).setFontSize(9)

            LoadYpixl = LoadYpixl + 10;
            if (LoadDetails[loadIndex].TrailerEquipment) {
                doc.setFont('Times New Roman', 'bold');
                doc.text("Equipment Type :", 13, (LoadYpixl + 5)).setFontSize(9)
                doc.setFont('Times New Roman', 'normal');
                doc.text(LoadDetails[loadIndex].TrailerEquipment, 40, (LoadYpixl + 5)).setFontSize(9)

                LoadYpixl = LoadYpixl + 5;
            }



            //*******************Commodities ************************* */

            let commoditiesPos = (LoadYpixl + 5)
            let CommodityPerLoad = await Commoditydetails.filter((obj: any) => obj.OrderLoadId === LoadDetails[loadIndex].OrderLoadId)
            if (CommodityPerLoad && CommodityPerLoad.length > 0) {
                doc.setFont('Times New Roman', 'bold');
                doc.text("Commodities :", 13, (LoadYpixl + 5)).setFontSize(9);

                for (let ComIndex = 0; ComIndex < CommodityPerLoad.length; ComIndex++) {
                    doc.text('\u2022', 37, commoditiesPos);
                    doc.setFont('Times New Roman', 'normal');
                    if (CommodityPerLoad[ComIndex].TotalWeightUnit && CommodityPerLoad[ComIndex].TotalWeight) {
                        doc.text(CommodityPerLoad[ComIndex].ItemName + ' x ' + CommodityPerLoad[ComIndex].Quantity + ', ' + CommodityPerLoad[ComIndex].TotalWeight + ' ' + CommodityPerLoad[ComIndex].TotalWeightUnit, 40, commoditiesPos).setFontSize(9)
                    }
                    else {
                        doc.text(CommodityPerLoad[ComIndex].ItemName + ' x ' + CommodityPerLoad[ComIndex].Quantity, 40, commoditiesPos).setFontSize(9)
                    }
                    commoditiesPos = commoditiesPos + 5;
                }
            }
            LoadYpixl = commoditiesPos;

            //*********************************Pricing Details******************************8 */
            if (PricingDetails && PricingDetails.length > 0) {
                let PricingPerLoad = PricingDetails.filter((obj: any) => obj.load_number === LoadDetails[loadIndex].OrderLoadId)
                let PricingTable = [];
                if (PricingPerLoad && PricingPerLoad.length > 0) {
                    doc.setFontSize(9);
                    doc.setFont('Times New Roman', 'bold');
                    doc.text("Charge Items", 13, LoadYpixl).setFontSize(9);

                    LoadYpixl = LoadYpixl + 2;
                    for (let PIndex = 0; PIndex < PricingPerLoad.length; PIndex++) {
                        let Rowdata = [];
                        Rowdata.push(PIndex + 1);
                        let formattedItemName = PricingPerLoad[PIndex].ItemName?.includes(',')
                            ? PricingPerLoad[PIndex].ItemName.split(', ').join('\n')
                            : PricingPerLoad[PIndex].ItemName;
                        Rowdata.push(formattedItemName);  // Push formatted ItemName to Rowdata

                        Rowdata.push(PricingPerLoad[PIndex].quantity);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + PricingPerLoad[PIndex].rate);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + this.SharedService.toFixedInteger(((PricingPerLoad[PIndex].quantity * PricingPerLoad[PIndex].rate) - PricingPerLoad[PIndex].taxable_amount), DecimalPlaces));
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + PricingPerLoad[PIndex].tax_amount);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + PricingPerLoad[PIndex].total_charge);
                        SubTotal = SubTotal + PricingPerLoad[PIndex].total_charge;
                        PricingTable.push(Rowdata);
                    }
                }

                autoTable(doc, {
                    startY: LoadYpixl,
                    head: [['#', 'Item', 'Quantity', 'Rate', 'Discount', 'Tax', 'Total']],
                    body: PricingTable,
                    theme: 'plain',

                    bodyStyles: {
                        fontSize: 9,
                        halign: 'left',
                        font: 'Times New Roman', fontStyle: 'normal',
                        minCellHeight: 5,
                    },
                    headStyles:
                    {
                        fontSize: 9,
                        halign: 'left',
                        font: 'Times New Roman', fontStyle: 'normal',
                        textColor: [0, 0, 0],
                        fillColor: '#e2e2e2',
                    },
                    columnStyles: {
                        0: { cellWidth: 10 },  // '#' 
                        1: { cellWidth: 40 }, // 'Item'
                        2: { cellWidth: 20 }, // 'Quantity'
                        3: { cellWidth: 30 }, // 'Rate'
                        4: { cellWidth: 30 }, // 'Discount' 
                        5: { cellWidth: 30 }, // 'Tax' 
                        6: { cellWidth: 25 }, // 'Total'
                    },

                });
                doc.setDrawColor('#8c8c8c');

                let AccPerLoad = AccessorialDetails.filter((obj: any) => obj.load_number === LoadDetails[loadIndex].OrderLoadId)
                if (!AccPerLoad || AccPerLoad.length == 0) {
                    doc.line(13, ((doc as any).lastAutoTable.finalY + 2), 197, ((doc as any).lastAutoTable.finalY + 2));
                    LoadYpixl = (doc as any).lastAutoTable.finalY + 10;
                }
                else {
                    LoadYpixl = (doc as any).lastAutoTable.finalY + 5;
                }
                // doc.line(13, ((doc as any).lastAutoTable.finalY + 2), 197, ((doc as any).lastAutoTable.finalY + 2));
                // LoadYpixl = (doc as any).lastAutoTable.finalY + 10;
            }


            if (AccessorialDetails && AccessorialDetails.length > 0) {
                let AccessorialPerLoad = AccessorialDetails.filter((obj: any) => obj.load_number === LoadDetails[loadIndex].OrderLoadId)
                let AccessrialTable = [];
                if (AccessorialPerLoad && AccessorialPerLoad.length > 0) {
                    doc.setFontSize(9);
                    doc.setFont('Times New Roman', 'bold');
                    doc.text("Accessorials", 13, LoadYpixl).setFontSize(9);

                    LoadYpixl = LoadYpixl + 2;
                    for (let PIndex = 0; PIndex < AccessorialPerLoad.length; PIndex++) {
                        let Rowdata = [];
                        Rowdata.push(PIndex + 1);
                        let formattedItemName = AccessorialPerLoad[PIndex].ItemName?.includes(',')
                            ? AccessorialPerLoad[PIndex].ItemName.split(', ').join('\n')
                            : AccessorialPerLoad[PIndex].ItemName;
                        Rowdata.push(formattedItemName);  // Push formatted ItemName to Rowdata

                        Rowdata.push(AccessorialPerLoad[PIndex].quantity);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + AccessorialPerLoad[PIndex].rate);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + this.SharedService.toFixedInteger(((AccessorialPerLoad[PIndex].quantity * AccessorialPerLoad[PIndex].rate) - AccessorialPerLoad[PIndex].taxable_amount), DecimalPlaces));
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + AccessorialPerLoad[PIndex].tax_amount);
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + AccessorialPerLoad[PIndex].total_charge);
                        SubTotal = SubTotal + AccessorialPerLoad[PIndex].total_charge;
                        AccessrialTable.push(Rowdata);
                    }
                }

                autoTable(doc, {
                    startY: LoadYpixl,
                    head: [['#', 'Item', 'Quantity', 'Rate', 'Discount', 'Tax', 'Total']],
                    body: AccessrialTable,
                    theme: 'plain',

                    bodyStyles: {
                        fontSize: 9,
                        halign: 'left',
                        font: 'Times New Roman', fontStyle: 'normal',
                        minCellHeight: 5,
                    },
                    headStyles:
                    {
                        fontSize: 9,
                        halign: 'left',
                        font: 'Times New Roman', fontStyle: 'normal',
                        textColor: [0, 0, 0],
                        fillColor: '#e2e2e2',
                    },
                    columnStyles: {
                        0: { cellWidth: 10 },  // '#' 
                        1: { cellWidth: 40 }, // 'Item'
                        2: { cellWidth: 20 }, // 'Quantity'
                        3: { cellWidth: 30 }, // 'Rate'
                        4: { cellWidth: 30 }, // 'Discount' 
                        5: { cellWidth: 30 }, // 'Tax' 
                        6: { cellWidth: 25 }, // 'Total'
                    },
                });
                doc.setDrawColor('#8c8c8c');
                doc.line(13, ((doc as any).lastAutoTable.finalY + 2), 197, ((doc as any).lastAutoTable.finalY + 2));
                LoadYpixl = (doc as any).lastAutoTable.finalY + 10;
            }

        }


        //**********************************Footer***********************8 */

        doc.setFontSize(10);
        doc.setFont('Times New Roman', 'bold');
        doc.text("Invoice Summary ", 13, LoadYpixl).setFontSize(9)
        LoadYpixl = LoadYpixl + 5;

        let textHeight = 0;
        if (BasicDetails[0].notes) {
            doc.setFont('Times New Roman', 'bold');
            doc.text("Notes", 13, LoadYpixl).setFontSize(9)
            let notesText = doc.splitTextToSize(BasicDetails[0].notes, 100);

            doc.setFont('Times New Roman', 'normal');
            doc.text(doc.splitTextToSize(BasicDetails[0].notes, 100), 13, (LoadYpixl + 5)).setFontSize(9)
            textHeight = 4 * notesText.length;
            textHeight = LoadYpixl + textHeight;
        }

        // doc.setFontSize(10);
        // doc.setFont('Times New Roman', 'bold');
        // doc.text(BasicDetails[0].CurrencySymbol+ " " + String(SubTotal) , 200, LoadYpixl, { align: 'right' }).setFontSize(10);
        // doc.setFont('Times New Roman', 'bold');
        // doc.text( "Sub-Total : ", (200 - doc.getTextWidth(BasicDetails[0].CurrencySymbol+ " " + String(SubTotal))), LoadYpixl, { align: 'right' }).setFontSize(10);




        let TaxSummary = [];
        LoadYpixl = LoadYpixl + 7;


        // Populate TaxSummary array
        if (BasicDetails[0].overall_tax_id) {
            let Rowdata = [];
            Rowdata.push(BasicDetails[0].overall_tax_name + '[' + BasicDetails[0].overall_tax_percent + ' %] :');
            // Rowdata.push(BasicDetails[0].overall_tax_percent + ' %');
            Rowdata.push(BasicDetails[0].CurrencySymbol + " " + BasicDetails[0].overall_tax_amount);
            // Rowdata.push(BasicDetails[0].CurrencySymbol + " " + BasicDetails[0].taxable_amount);
            TaxSummary.push(Rowdata);
        }
        else {
            if (PricingDetails && PricingDetails.length > 0) {
                for (let TIndex = 0; TIndex < PricingDetails.length; TIndex++) {
                    let Rowdata = [];
                    if (PricingDetails[TIndex].tax_id) {
                        Rowdata.push(PricingDetails[TIndex].tax_name + '[' + PricingDetails[TIndex].tax_percent + ' %] :');
                        // Rowdata.push(PricingDetails[TIndex].tax_percent + ' %');
                        Rowdata.push(BasicDetails[0].CurrencySymbol + " " + PricingDetails[TIndex].tax_amount);
                        // Rowdata.push(BasicDetails[0].CurrencySymbol + " " + PricingDetails[TIndex].taxable_amount);
                        TaxSummary.push(Rowdata);
                    }
                }
            }

            if (AccessorialDetails && AccessorialDetails.length > 0) {
                for (let TIndex = 0; TIndex < AccessorialDetails.length; TIndex++) {
                    let Accdata = [];
                    if (AccessorialDetails[TIndex].tax_id) {
                        Accdata.push(AccessorialDetails[TIndex].tax_name + '[' + AccessorialDetails[TIndex].tax_percent + ' %] :');
                        // Accdata.push(AccessorialDetails[TIndex].tax_percent + ' %');
                        Accdata.push(BasicDetails[0].CurrencySymbol + " " + AccessorialDetails[TIndex].tax_amount);
                        // Accdata.push(BasicDetails[0].CurrencySymbol + " " + AccessorialDetails[TIndex].taxable_amount);
                        TaxSummary.push(Accdata);
                    }
                }
            }


        }

        // Setup initial document
        doc.setFont('Times New Roman', 'bold'); // Set the font to bold
        doc.setFontSize(10);

        // Define initial vertical position
        let currentY = LoadYpixl;

        // if (TaxSummary && TaxSummary.length > 0) {
        //   TaxSummary.forEach(item => {
        //     let taxName = item[0];
        //     let taxPercent = item[1];
        //     let taxAmount = item[2];
        //     let combinedText = `${taxName} [${taxPercent}]    ${taxAmount}`;
        //     let combinedTextWidth = doc.getTextWidth(combinedText);
        //     let taxAmountX = rightMarginX - combinedTextWidth;
        //     doc.text(combinedText, taxAmountX, currentY);
        //     currentY += 5; 
        //   });
        // }
        LoadYpixl = currentY;

        const pageWidthTable = doc.internal.pageSize.width; // Get the page width
        const tableWidth = 100; // Set an approximate width of your table in mm or adjust dynamically
        const rightMargin = 10; // Set the desired margin on the right side

        const leftMargin = pageWidthTable - tableWidth - rightMargin;

        const body = [
            ['Sub-Total :', BasicDetails[0].CurrencySymbol + " " + String(SubTotal)],
            ['Discount :', BasicDetails[0].CurrencySymbol + " " + String(this.SharedService.toFixedInteger((BasicDetails[0].overall_tax_amount + SubTotal) - this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces), DecimalPlaces))],
            ['Total :', BasicDetails[0].CurrencySymbol + " " + String(this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces))],
        ];

        if (TaxSummary && TaxSummary.length > 0) {
            body.splice(1, 0, ...TaxSummary);
        }

        autoTable(doc, {
            head: [],
            body: body,
            theme: 'plain',
            bodyStyles: {
                fontSize: 9,
                font: 'Times New Roman',
                fontStyle: 'bold',
            },
            headStyles: {
                fillColor: '#e2e2e2',
                fontSize: 10,
                font: 'Times New Roman',
                fontStyle: 'bold',
            },
            margin: { left: leftMargin, right: rightMargin },
            columnStyles: {
                0: { halign: 'right', cellWidth: 75 },
                1: { halign: 'right', cellWidth: 25 },
            },
            didParseCell: (data) => {
                data.cell.styles.cellPadding = 1; // Adjust cell padding to reduce row gap
            },
        });


        // doc.setFont('Times New Roman', 'bold');
        // doc.text(BasicDetails[0].CurrencySymbol+ " " + String(this.SharedService.toFixedInteger((BasicDetails[0].overall_tax_amount + SubTotal) - this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces), DecimalPlaces)) , 200, (LoadYpixl), { align: 'right' }).setFontSize(10);
        // doc.setFont('Times New Roman', 'bold');
        // doc.text( "Discount : ", (200 - doc.getTextWidth(BasicDetails[0].CurrencySymbol+ " " + String(this.SharedService.toFixedInteger((BasicDetails[0].overall_tax_amount + SubTotal) - this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces), DecimalPlaces)))), (LoadYpixl), { align: 'right' }).setFontSize(10)


        // doc.setFont('Times New Roman', 'bold');
        // doc.text(BasicDetails[0].CurrencySymbol+ " " + String(BasicDetails[0].overall_tax_amount) , 200, (LoadYpixl + 10), { align: 'right' }).setFontSize(10)
        // doc.setFont('Times New Roman', 'bold');
        // doc.text( "Tax : ", (200 - doc.getTextWidth(BasicDetails[0].CurrencySymbol+ " " + String(BasicDetails[0].overall_tax_amount))), (LoadYpixl + 10), { align: 'right' }).setFontSize(10)


        // doc.setFont('Times New Roman', 'bold');
        // doc.text(BasicDetails[0].CurrencySymbol+ " " + String(this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces)) , 200, (LoadYpixl + 5), { align: 'right' }).setFontSize(10)
        // doc.setFont('Times New Roman', 'bold');
        // doc.text( "Total : ", (200 - doc.getTextWidth(BasicDetails[0].CurrencySymbol+ " " + String(this.SharedService.toFixedInteger(BasicDetails[0].total_amount, DecimalPlaces)))), (LoadYpixl + 5), { align: 'right' }).setFontSize(9)


        if ((LoadYpixl + 5) > textHeight) {
            LoadYpixl = LoadYpixl + 5;
        }
        else {
            LoadYpixl = textHeight;
        }
        if (BasicDetails[0].Column1) {
            doc.setFont('Times New Roman', 'bold');
            doc.text("Terms & conditions", 13, (LoadYpixl + 5)).setFontSize(9)
            doc.setFont('Times New Roman', 'normal');
            doc.text(doc.splitTextToSize(BasicDetails[0].Column1, 100), 13, (LoadYpixl + 10)).setFontSize(9)
        }



        // ********* Footer ***************************************
        if (BasicDetails[0].FactoringCompany) {
            doc.setFontSize(9);
            const pageWidth = doc.internal.pageSize.getWidth();
            doc.text('This Invoice is assigned and Payment should be send to:', (pageWidth / 2), doc.internal.pageSize.height - 18, { align: 'center' })
            doc.text(BasicDetails[0].FactoringCompany, (pageWidth / 2), doc.internal.pageSize.height - 14, { align: 'center' })
            doc.text(BasicDetails[0].FactoringStreetAddress, (pageWidth / 2), doc.internal.pageSize.height - 10, { align: 'center' })
            doc.text(BasicDetails[0].FactoringAddress, (pageWidth / 2), doc.internal.pageSize.height - 6, { align: 'center' })
        }

        if (!flag) {
            doc.save('Dispatch Invoice' + 2 + '.pdf');
            window.open(doc.output('bloburl'));
        } else {
            const file = new File([doc.output('blob')], 'manualInvoice.pdf', {
                type: 'application/pdf',
            });

            const fileSize = file.size;

            if (fileSize > 5 * 1024 * 1024) {
                return;
            }

            this.SharedService.UploadDocuments(file).then((response: any) => {
                this.DocumentData = {
                    FileURL: "http://52.235.39.94/DocumentUploaderAPI_QA/Image/" + response,
                    FileName: 'DispatchInvoice.pdf'
                };
                this.isLoading = false;
            });


        }

    }