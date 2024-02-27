const user = {
  name: "hitesh",
  email: "hites@lco.dev",
  isActive: false,
};

function createUser({ name: string, isActive: boolean }): {
  name: string;
  isActive: boolean;
} {
  return { name: "anukul", isActive: false };
}

// createUser({ name: "ramu", isActive: "kuch" , email: "mail@mail.com"});

createUser(user);

type User = {
  name: string;
  age: number;
  isActive: boolean;
};

// type str = string; weird but technically allowed

function getUserDetails(user: User): User {
  return {
    name: "",
    age: 23,
    isActive: false,
  };
}

getUserDetails({ name: "", age: 0, isActive: false });

type admin = {
  readonly _id: string; // _id is readonly
  name: string;
  age: number;
  isActive: boolean;
  cardNumber?: number; // cardNumber is Optional
};

const newAdmin: admin = {
  _id: "sdjflk",
  name: "anukul",
  age: 23,
  isActive: false,
};

newAdmin.name = "aman";
// newAdmin._id = 'slkjsdf'; not allowed

const newAdmin2: admin = {
  _id: "sdjflk",
  name: "anukul",
  age: 23,
  isActive: false,
  cardNumber: 12312,
};

type cardNumber = {
  cardnumber: number;
};

type cardName = {
  cardHolderName: string;
};

type cardDetails = cardNumber &
  cardName & {
    cvv: number;
  };

const newCard: cardDetails = {
  cardHolderName: "anukul",
  cardnumber: 234234,
  cvv: 234,
};

// const newCard: cardDetails = { not allowed
//     cardHolderName: "anukul",
//     cardnumber: 234234,
// }

export {};
