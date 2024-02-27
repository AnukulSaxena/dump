console.log("typescript is here");

class User {
  public email: string;
  #age: number = 23; // js way of private but use "private"
  city: string = "Dehradun";
  readonly mohalla: string = "khair kala";
  private houseName: number = 24;

  constructor(email: string) {
    this.email = email;
  }
}

const anukul = new User("a@a.com");
// anukul.city = 2;
anukul.city = "rishikesh";

class Admin {
  private _refreshToken: number = 234;
  constructor(
    public name: string,
    public age: number,
    private gender: string
  ) {} // equally good

  private deleteToken(): void {
    console.log("token deleted");
  }

  get getRefreshToken(): number {
    return this._refreshToken;
  }

  get getGender(): string {
    return this.gender;
  }

  set setRefreshToken(newToken: number) {
    this._refreshToken = newToken;
  }

  set setGender(newGender: string) {
    this.gender = newGender;
  }
}

class Car {
  protected wheels: number = 4;
  protected doors: number = 4;
  constructor(public windSheild: string, public isInsured: boolean) {}
}

class newCar extends Car {
  private modelName: string = "234";

  get getDoors(): number {
    return this.wheels;
  }
}
