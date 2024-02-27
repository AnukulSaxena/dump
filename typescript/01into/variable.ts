let greetings: string = "Anukul";
console.log(greetings);
let myNum = 7;
// greetings.toLowercase()
greetings.toLowerCase();

//number
let userId: number = 2323; // too obvious nor mandatory neither best practice

let userId2 = 234234; // equally good

//boolean
let isLoggedIn: boolean = false;

// any it basically turn off type checking of a value

let hero; // in this situation let hero: string;

function getHero() {
  return "batman";
  //   return true;
}

hero = getHero(); // hero can we anything

export {};
