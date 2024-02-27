function addTwo(num: number) {
  //   num.toUpperCase();
  return num + 2;
}

// addTwo("sdfk")
addTwo(3);

function getUpper(str: string) {
  return str.toUpperCase();
}
getUpper("3");
// getUpper(3)

function singUpUser(name: string, email: string, password: string) {}

// singUpUser(12,23,34)
singUpUser("anukul", "anu@kool.com", "password");

let loginUser = (name: string, email: string, isPaid: boolean = false) => {};

loginUser("name", "email");

function subTwo(num: number): number {
  return 234 + num;
  // return "hello";
}

let numb = subTwo(23);

console.log(numb);

// function getValue(myVal:number){
//     if(myVal){
//         return true
//     }
//     return "200"
// }

const getHello = (str: string): string => "Hello";

const heros = ["dedpul", "watchman", "venom"];
//const heros = [2,3,4];

heros.map((hero: string): string => `hero is ${hero}`);

function consoleError(errmsg: string): void {
  console.log(errmsg);
}

function handleError(msg: string): never {
  throw new Error(msg);
}

export {};
