abstract class Animal {
  eyes: number;
  private gender: "Male" | "Female";
  constructor(public legs: number, eyes: number, gender: "Male" | "Female") {
    this.eyes = eyes;
    this.gender = gender;
  }

  startWalk(): void {
    console.log("its walking");
  }

  abstract willWalk(): void;
}

class Elephant extends Animal {
  constructor(legs: number, eyes: number, gender: "Male" | "Female") {
    super(legs, eyes, gender);
  }

  public willWalk(): void {
    console.log("I'll walk");
  }
}
