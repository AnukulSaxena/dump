function myIdentity(num: number): number {
  return num;
}

function myIdentity2(num: number | string): number | string {
  return num;
}

function myIdentity3(num: any): any {
  return num;
}

function myIdentity4<Type>(num: Type): Type {
  return num;
}

myIdentity4(234);
myIdentity4("2342");
myIdentity4(false);

interface myType {
  name: string;
  age: number;
}

myIdentity4<myType>({ name: "anukul", age: 23 });
myIdentity4({ class: "Mca", gender: "Male" });

function myIdentity5<T>(arr: T[]): T {
  return arr[3];
}

myIdentity5([2, 3, "sdk", false]);

const myIdentity6 = <T>(val: T): T => val;
const myIdentity7 = <Type>(arr: Array<Type>): void => {
  console.log("Something");
};

const myIdentity8 = <Type>(arr: Array<Type>): Array<Type> => arr;
const myIdentity9 = <T>(arr: Array<T>): T => arr[0];

function anotherFunc<T, U extends string>(val1: T, val2: U): object {
  return { val1, val2 };
}

anotherFunc(2, "Three");

interface db {
  name: string;
  id: number;
}

interface Course {
  name: string;
  author: string;
  subject: string;
}

class Sellable<T> {
  public cart: T[] = [];

  addToCart(product: T) {
    this.cart.push(product);
  }
}

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity20: GenericIdentityFn = identity;

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
// getProperty(x, "m"); m is not a key in x object
