let arr1 = []; // this is a never typed array

// arr1.push("somthing") not allowed

let arr2: number[] = [];
arr2.push(23);
// arr2.push("something") not allowed

let arr3: Array<string> = []; // also a way to initial a typed array
arr3.push("something");

let multiArr: number[][] = [];
multiArr.push([23, 23]);
// multiArr.push(['sdk']) not allwed

let multiArr2: Array<number>[] = []; // allowed but weird and confusing syntax

let multiMultiArr: number[][][][][] = []; // hehehe

let objectArr: { name: string; age: number }[] = [];

// objectArr.push('sdkfsdkfj') not allwed
objectArr.push({ name: "anukul", age: 23 });

const myObj: { name: string; arr: number[] } = { name: "anukul", arr: [234] };

export {};
