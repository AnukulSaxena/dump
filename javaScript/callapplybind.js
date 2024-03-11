// Call
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function (something) {
    return this.firstName + ` ${something} ` + this.lastName;
  },
};

const anotherPerson = {
  firstName: "Jane",
};

// console.log(person.fullName("rahul"));
// console.log(person.fullName.call(anotherPerson, "aman"));

// Apply
const numbers = [1, 2, 3, 4];

function sum(...d) {
  let sum = 0;
  d.map((item) => (sum += item));
  return sum;
}

const total = sum(numbers); // null for this as we don't care about it here
// console.log(total); // Output: 10

// bind

function greet(greeting) {
  return greeting + ", " + this.name;
}

const persona = { name: "Alice" };
const boundGreet = greet.bind(persona, "Hello"); // Pre-bind this to person and greeting as "Hello"
// console.log(boundGreet()); // Output: Hello, Alice

const rectangle = {
  width: 5,
  height: 10,
  getArea: function () {
    return this.width * this.height;
  },
};

const square = { width: 7, height: 7 };

const squareArea = rectangle.getArea.call(square); // Borrowing getArea with square's context
// console.log(squareArea); // Output: 49

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const personas = { name: "Bob" };

// console.log(greet.call(personas, "Hello", "!")); // Output: Hello, Bob!

const numberso = [2, 3, 4, 3];
const numbersi = [1, 2, 3];

function sum(a, b, c, d, e, f) {
  // console.log(a, b, c, d, e, f);

  return a + b + c;
}

const totala = sum.apply(null, numbersi);
// console.log(totala); // Output: 9

const args = [1, 2];

// console.log(Math.max.apply(null, args)); // Output: 2

function greet(name) {
  return "Hello, " + name;
}

// console.log(greet.apply(null, [])); // Output: Hello,

// console.log(sum.apply(null, [23, 3, 3], 3)); // Throws TypeError

const car = {
  name: "somehtin",
  type: "somehting",
};

const someBrand = {
  name: "some",
  type: "someType",
  someFunc: function () {
    console.log(this.name, " and ", this.type);
    function innerFunc() {
      console.log(this.name, " and ", this.type, " and ", this.something);
    }
    innerFunc.call(this);
  },
};

// someBrand.someFunc();

function distance(x1, y1) {
  console.log(x1, y1);
  const dx = this.x - this.y;
  const dy = x1 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

const point1 = { x: 0, y: 0 };
const boundDistance = distance.bind(point1); // Pre-bind point1's context

const distanceToP2 = boundDistance(); // Pass remaining arguments
console.log(distanceToP2); // Output: 5 (distance from point1 to {x: 3, y: 4})
