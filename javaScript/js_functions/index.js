function foo() {
  // console.log(this); undefined
}

const foo2 = () => {
  console.log(this);
};

foo();
// console.log(this, "second"); undefined

const myFoo = function () {
  // console.log(this); undefined
};

myFoo();

const myFooFoo = () => {
  // console.log(this); undefined
};

myFooFoo();

const myObj = {
  name: "someName",
  class: "someClass",
  someFoo: () => {
    console.log(this);
  },
  foo: function () {
    console.log(this); // container object reference
    const somePoo = () => {
      console.log(this, "somepoo"); // print same value as somePoo's container function
    };
    // somePoo();
  },
  anotherFoo() {
    console.log(this); // myObj reference
    setTimeout(() => {
      console.log(this); // myObj reference
    }, 1000);
  },
};
// myObj.foo(); // containing object Context
// myObj.someFoo(); undefined

// myObj.anotherFoo(); containing Object context

myObj.anotherFoo();
