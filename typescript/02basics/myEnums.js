"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var someType;
(function (someType) {
    someType[someType["FIRST"] = 0] = "FIRST";
    someType[someType["Second"] = 1] = "Second";
    someType[someType["Third"] = 2] = "Third";
})(someType || (someType = {}));
var someType2;
(function (someType2) {
    someType2[someType2["one"] = 5] = "one";
    someType2[someType2["two"] = 6] = "two";
    someType2[someType2["three"] = 7] = "three";
})(someType2 || (someType2 = {}));
var someType3;
(function (someType3) {
    someType3["one"] = "skdf";
    someType3["two"] = "sdk";
    someType3["three"] = "skdjf";
})(someType3 || (someType3 = {}));
var someType4;
(function (someType4) {
    someType4["one"] = "somethign";
    someType4[someType4["two"] = 2] = "two";
    someType4[someType4["three"] = 3] = "three";
    someType4[someType4["four"] = 4] = "four";
})(someType4 || (someType4 = {}));
var smalVar = someType4.one; // look the generated js code before and after this
var smlvar = 0 /* someType5.one */;
