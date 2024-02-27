"use strict";
var _User_age;
console.log("typescript is here");
class User {
    constructor(email) {
        _User_age.set(this, 23); // js way of private but use "private"
        this.city = "Dehradun";
        this.mohalla = "khair kala";
        this.houseName = 24;
        this.email = email;
    }
}
_User_age = new WeakMap();
const anukul = new User("a@a.com");
// anukul.city = 2;
anukul.city = "rishikesh";
class Admin {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this._refreshToken = 234;
    } // equally good
    deleteToken() {
        console.log("token deleted");
    }
    get getRefreshToken() {
        return this._refreshToken;
    }
    get getGender() {
        return this.gender;
    }
    set setRefreshToken(newToken) {
        this._refreshToken = newToken;
    }
    set setGender(newGender) {
        this.gender = newGender;
    }
}
class Car {
    constructor(windSheild, isInsured) {
        this.windSheild = windSheild;
        this.isInsured = isInsured;
        this.wheels = 4;
        this.doors = 4;
    }
}
class newCar extends Car {
    constructor() {
        super(...arguments);
        this.modelName = "234";
    }
    get getDoors() {
        return this.wheels;
    }
}
