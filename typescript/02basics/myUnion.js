var score = 33;
score = 44;
score = "44";
var anukul = { name: "anukul prakash", id: 2344 };
anukul = { name: "aman", age: 23 };
function getDbId(id) {
    console.log(id);
}
getDbId(24);
getDbId("23");
function getDbId2(id) {
    // id.toLowerCase() not allowed
    // id.toFixed() not allowe
    id.toString();
    if (typeof id === "string")
        id.toLowerCase();
    else
        id.toFixed();
}
// const data: number[] | string[] = [23,"sdkf"]
// const data: number | string[] = [323,"sdkf"]
var data = [23, "sdk"]; // allowed
var pi = 3.14; // not a ideal example
// pi = 2.23434;
var promiseStatus;
// promiseStatus = "ksd"
promiseStatus = "pending";
