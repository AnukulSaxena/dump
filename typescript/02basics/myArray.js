var arr1 = []; // this is a never typed array
// arr1.push("somthing") not allowed
var arr2 = [];
arr2.push(23);
// arr2.push("something") not allowed
var arr3 = []; // also a way to initial a typed array
arr3.push("something");
var multiArr = [];
multiArr.push([23, 23]);
// multiArr.push(['sdk']) not allwed
var multiArr2 = []; // allowed but weird and confusing syntax
var multiMultiArr = []; // hehehe
var objectArr = [];
objectArr.push("sdkdfkdf");
console.log(objectArr);
