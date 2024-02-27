interface User {
  name: string;
  age: number;
}

interface Admin {
  name: string;
  age: number;
  isAdmin: boolean;
}

function checkAdmin(user: Admin | User): boolean {
  // return user.isAdmin not allowed because User might not have the feild "isAdmin"
  if ("isAdmin" in user) return user.isAdmin;
  return false;
}

function checkDate(currentDate: Date | string): void {
  // console.log(currentDate.getUTCDay) bot allowed
  // console.log(currentDate.toLowerCase)

  if (currentDate instanceof Date) console.log(currentDate.getUTCDay);
  else console.log(currentDate.toLowerCase);
}
type Fish = { swim: () => void }; // property
type Bird = { fly(): void }; // method

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function getFood(pet: Fish | Bird) {
  if (isFish(pet)) console.log(pet, "Get Fish Food");
  else console.log(pet, "Get Bird Food");
}
