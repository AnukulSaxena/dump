enum someType {
  FIRST, // initial to 0 and rest of the values will follow after 0
  Second,
  Third,
}

enum someType2 {
  one = 5, // initialized to 5 and rest will follow
  two,
  three,
}

enum someType3 {
  one = "skdf", // when you have  initialized it with a string you do need to
  two = "sdk", // initialize all but there is a catch
  three = "skdjf",
}

enum someType4 {
  one = "somethign",
  two = 2, // after this all the values are automatically initialized
  three,
  four,
}

const smalVar = someType4.one; // look the generated js code before and after this

const enum someType5 {
  one,
  two,
  three,
}

const smlvar = someType5.one;

export {};
