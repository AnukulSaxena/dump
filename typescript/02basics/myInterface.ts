interface User {
  id: number;
  email: string;
  // getUser: () => string, allowed but confusing systax
  getUser(): string;
  getUserName(name: string): number;
}

interface User {
  gitHubToken: number;
}

interface Admin extends User {
  role: "admin" | "ta" | "trainee";
}

const anukul: User = {
  id: 323,
  email: "sdkfj",
  getUser: () => "",
  getUserName(anYname) {
    return 3;
  },
  gitHubToken: 233,
};

const anukul2: Admin = {
  id: 323,
  email: "sdkfj",
  getUser: () => "",
  getUserName(anYname) {
    return 3;
  },
  gitHubToken: 233,
  role: "trainee",
};
