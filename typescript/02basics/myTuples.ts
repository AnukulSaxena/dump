let myTuple: [number, string, boolean] = [1, "sdfj", true];

myTuple[2] = false;
// myTuple[2] = 'ksdjf'; not allowed

type newTuple = [boolean, string, number];

const myTuple2: newTuple = [false, "", 2];

myTuple.push("something"); // this is a weird behaviour of typescript
// even it is restricted methods like push shift unshift are allowed
myTuple.pop();
myTuple.shift();
myTuple2.shift();
