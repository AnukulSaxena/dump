interface vehicle {
  wheelCount: number;
  doorCount: number;
  fuelType: "Electricity" | "Petrol" | "Diesel";
  drive(): void;
}

class Maruti implements vehicle {
  constructor(
    public wheelCount: number,
    public doorCount: number,
    public fuelType: "Electricity" | "Petrol" | "Diesel"
  ) {}

  drive(): void {
    console.log("rom rom bhaio");
  }
}
