import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
} from "@mui/material"; 
import {
  clearSuccess,
  setTabValue as setTab,
} from "../../features/slices/attendees";
import { getAttendees } from "../../features/actions/attendees";
import { attendeeTableColumns } from "../../utils/columnData";
import { 
  Visibility, 
} from "@mui/icons-material";
import AttendeesFilterModal from "../../components/Attendees/AttendeesFilterModal";
import ExportWebinarAttendeesModal from "../../components/Export/ExportWebinarAttendeesModal";
import { resetReAssignSuccess } from "../../features/slices/reAssign.slice";
import { resetAssignSuccess } from "../../features/slices/assign";
import PageLimitEditor from "../../components/PageLimitEditor";
import AttendeesTable from "../../components/Table/AttendeesTable";
import DataTableContainer from "../../components/Table/DataTableContainer";


const WebinarAttendeesPage = (props) => {
  const {
    tabValue,
    page,
    setPage,
    subTabValue,
    selectedRows,
    setSelectedRows,
    setIsSelectVisible,
    setSelectedAssignmentType,
    selectedAssignmentType,
  } = props;

  const tableHeader = "Attendees Table";
  const exportExcelModalName = "ExportWebinarAttendeesExcel";
  const AttendeesFilterModalName = "AttendeesFilterModal";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { attendeeData, isLoading, isSuccess, totalPages } = useSelector(
    (state) => state.attendee
  );
  const { isSuccess: isSuccessReAssign } = useSelector(
    (state) => state.reAssign
  );
  const { leadTypeData, isSuccess: assignSuccess } = useSelector(
    (state) => state.assign
  );
  const LIMIT = useSelector((state) => state.pageLimits[tableHeader] || 10);

  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    if (tabValue !== "enrollments" && subTabValue === "attendees") {
      dispatch(
        getAttendees({
          id,
          isAttended: tabValue === "postWebinar",
          page,
          limit: LIMIT,
          filters,
          validCall: selected === "All" ? undefined : selected,
          assignmentType:
            selectedAssignmentType === "All"
              ? undefined
              : selectedAssignmentType,
        })
      );
    }
  }, [page, tabValue, LIMIT, filters, selected, selectedAssignmentType]);

  useEffect(() => {
    if (isSuccess || assignSuccess || isSuccessReAssign) {
      console.log("isssucess", isSuccess, assignSuccess, isSuccessReAssign);
      dispatch(
        getAttendees({
          id,
          isAttended: tabValue === "postWebinar",
          page: 1,
          limit: LIMIT,
          filters,
          validCall: selected === "All" ? undefined : selected,
          assignmentType:
            selectedAssignmentType === "All"
              ? undefined
              : selectedAssignmentType,
        })
      );
      dispatch(clearSuccess());
      dispatch(resetReAssignSuccess());
      dispatch(resetAssignSuccess());
      setSelectedRows([]);
    }
  }, [isSuccess, assignSuccess, isSuccessReAssign]);

  const actionIcons = [
    {
      icon: () => (
        <Visibility className="text-indigo-500 group-hover:text-indigo-600" />
      ),
      tooltip: "View Attendee Info",
      onClick: (item) => {
        navigate(
          `/particularContact?email=${item?.email}&attendeeId=${item?._id}`
        );
      },
      readOnly: true,
    },
  ];

  const AttendeeDropdown = () => {
    const handleChange = (event) => {
      const label = event.target.value;
      setSelected(label);
      setPage(1);
    };

    const handleAssignmentChange = (event) => {
      const label = event.target.value;
      if (label === "All") {
        setIsSelectVisible(false);
        setSelectedRows([]);
      } else {
        setIsSelectVisible(true);
        setSelectedRows([]);
      }
      setSelectedAssignmentType(label);
      setPage(1);
    };

    return (
      <div className="flex gap-4">
        <FormControl className="w-40 " variant="outlined">
          <InputLabel id="attendee-label">Activity</InputLabel>
          <Select
            labelId="attendee-label"
            className="h-10"
            value={selected}
            onChange={handleChange}
            label="Activity"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Worked">Worked</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-40 " variant="outlined">
          <InputLabel id="attendee-label">Assignment</InputLabel>
          <Select
            labelId="attendee-label"
            className="h-10"
            value={selectedAssignmentType}
            onChange={handleAssignmentChange}
            label="Assignment"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
            <MenuItem value="Not Assigned"> Not Assigned</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };
  return (
    <>
      <DataTableContainer
        tableHeader={tableHeader}
        tableUniqueKey="webinarAttendeesTable"
        ButtonGroup={AttendeeDropdown}
        filters={filters}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        setFilters={setFilters} 
        filterModalName={AttendeesFilterModalName}
        exportModalName={exportExcelModalName}
        isLoading={isLoading}
      >
        <AttendeesTable
          tableData={{
            columns: attendeeTableColumns,
            rows: attendeeData.map((row) => ({
              ...row,
              leadType: leadTypeData.find((lead) => lead._id === row?.leadType),
            })),
          }}
          actions={actionIcons}
          page={Number(page) || 1}
          limit={LIMIT}
          isLoading={isLoading}
   
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </DataTableContainer>

      <AttendeesFilterModal
        modalName={AttendeesFilterModalName}
        filters={filters}
        setFilters={setFilters}
      />
      <ExportWebinarAttendeesModal
        modalName={exportExcelModalName}
        filters={filters}
        webinarId={id}
        isAttended={tabValue === "postWebinar" ? true : false}
      />
    </>
  );
};


  export default WebinarAttendeesPage
