let score: number | string = 33;
score = 44;
score = "44";

type User = {
  name: string;
  id: number;
};

type admin = {
  name: string;
  age: number;
};

let anukul: User | admin = { name: "anukul prakash", id: 2344 };
anukul = { name: "aman", age: 23 };

function getDbId(id: number | string) {
  console.log(id);
}

getDbId(24);
getDbId("23");

function getDbId2(id: number | string) {
  // id.toLowerCase() not allowed
  // id.toFixed() not allowe

  id.toString();

  if (typeof id === "string") id.toLowerCase();
  else id.toFixed();
}

// const data: number[] | string[] = [23,"sdkf"]
// const data: number | string[] = [323,"sdkf"]

const data: (number | string)[] = [23, "sdk"]; // allowed

let pi: 3.14 = 3.14; // not a ideal example
// pi = 2.23434;

let promiseStatus: "fulfilled" | "pending" | "rejected";

// promiseStatus = "ksd"
promiseStatus = "pending";

export {};
