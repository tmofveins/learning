// JavaScript basics

/*************************************/

// Single line comment - double slash

/* Multi line 
    comment:
    Like this
*/

// Printing to console
console.log("Hello world\n");

/*************************************/

// Data types

// undefined -> something that hasn't been defined
// e.g. a variable that was just created
var a;

// null -> nothing
// counts as a variable, you can set something to nothing
var b = null;

// boolean -> true or false
var bool = true;

// string -> represents sequence of characters
// can be created as primitive value
var firstName = "John";
// or as objects
var firstName2 = new String("John");

// symbol -> object whose constructor returns a guaranteed unique value
// i.e. a primitive which cannot be recreated
let sym1 = Symbol()
let sym2 = Symbol()
console.log(sym1 === sym2); // false

// number -> exactly how it sounds
123
123.0 
123 === 123.0 // true

// object -> can store many different key value pairs
// functions are also objects
let cytus = {type:"game", genre:"rhythm", platform:"ipad"};

/*************************************/

// Declaring variables - 3 ways

// #1. 'var' -> known throughout the function it is defined in, from the start of the function
var myName1 = "Nick";

// #2. 'let' -> known only within the block it is defined in, from the moment it is defined
let myName2 = "Nick";

// #3. 'const' -> constant value
const pi = 3.14;

// if a variable is created without using any keywords, it will default to global

/*************************************/

// Mathematical operators

// +, -, *, / work almost as expected
// % operator also present
console.log(2.0 * 2.5); // 5
console.log(5 / 2); // 2.5
// +=, -=, *=, /= also work

/*************************************/

// More on strings

// Using backticks before and after strings allow the indiscriminate use
// of single and double quotes
var quoteExample = `""''' "'"`;

// Escape characters exist in the same way as in other languages

// Strings can be concatenated with + 
var testStr = "I come first. " + "I come second.";
console.log(testStr);
// += also works

// string length property can be used to find its length
console.log(testStr.length); // 28
// indexing also exists
console.log(testStr[0]); // 'I'

// strings are immutable, i.e. this code would not work
// testStr[0] = 'H';
// but we can reassign strings
testStr = 'something else';
console.log(testStr);

/*************************************/

// Arrays

var someArray = ["Nick", 21];
var emptyArray = [];
var nestedArray = [["String", 20], ["Another string", 25]];

console.log(emptyArray.length); // 0
console.log(nestedArray[0][0]); // "String"

someArray.push("Hi"); // inserts element at end
console.log(someArray);

var poppedElem = someArray.pop(); // deletes final element
console.log(poppedElem); // "Hi";
console.log(someArray);

var anotherArray = [1,2,3,4,5];
var shiftedElem = anotherArray.shift(); // moves elems to left by 1 position and removes first elem
console.log(shiftedElem); // 1
console.log(anotherArray);

anotherArray.unshift(1); // adds this elem to front and shifts everything to right by 1 position
console.log(anotherArray);

/*************************************/

// Equality

// both == and === exist to compare 'equality' in JS
// === is "strict equality", takes variable datatypes into consideration
// == does not

3 === 3 // true
3 === '3' // false
3 == '3' // true, because == will convert the RHS to a numeric type

// same goes for inequality, != (regular) and !== (strict)

/*************************************/

// Objects

var dog = {
    "name": "Spot",
    "legs": 4, 
    "tails": 1,
    "bark": "woof"
};

// fields can be accessed via either dot or bracket notation
console.log(dog.name); // "Spot"
console.log(dog["legs"]); // 4
console.log(dog[2]); // undefined, doe  s not throw error

// deleting properties
delete dog.tails
console.log(dog);

// check if property/field exists
console.log(dog.hasOwnProperty("name")); // true

// functions fairly similar to hashmaps in this sense
// array of objects also possible

console.log(JSON.stringify(dog)); // printing object as string
var dogCopy = JSON.parse(JSON.stringify(dog)); // making a deep copy of the object

/*************************************/

// More object practice 

var collection = {
    "1234": {
        "album": "Goodbye, friend",
        "artist": "colate + kamome sano",
        "tracks": [
            "Goodbye",
            "starlights"
        ]
    }, 
    "2468": {
        "album": "Nurture",
        "artist": "Porter Robinson",
        "tracks": [
            "Look at the Sky",
            "Something Comforting"
        ]
    },
    "1357": {
        "artist": "android52",
        "tracks": []
    },
    "4321": {
        "album": "MBDTF"
    }
}

var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {
    if (value === "") { // if no value specified
        delete collection[id][prop]; // delete that particular property
    } else if (prop === "tracks") {
        // if this property does not exist, create it
        // special case since "tracks" is supposed to be an arrayc
        // if first condition fails, it will just assign to empty array
        collection[id][prop] = collection[id][prop] || []; 
        collection[id][prop].push(value);
    } else {
        collection[id][prop] = value;
    }

    return collection;
}

console.log(updateRecords(2468, "tracks", "Musician"));
console.log(updateRecords(4321, "artist", "Kanye West"));

/*************************************/

// Demo of difference between var and let

function checkScope() {
    "use strict";
    var i = "function scope";
    let j = "function scope";

    if(true) {
        i = "block scope";
        let j = "block scope";
        var k = "block scope";
        console.log("Block scope i is: ", i);
        console.log("Block scope j is: ", j);
        console.log("Block scope k is: ", k);
    }

    console.log("Function scope i is: ", i);
    console.log("Function scope j is: ", j);
    console.log("Function scope k is: ", k); // note k will still exist here

    return i;
}

checkScope();

/*************************************/

// const declared arrays can still be modified with bracket notation
const testArr = [1, 2, 3];
testArr[0] = [5]; // will change 

// can stop this behavior with Object.freeze
Object.freeze(testArr);

/*************************************/

// Arrow/anonymous functions

// simple example without parameters
const arrowSimple = () => new Date(); 

// example with parameters 
const myConcat = (arr1, arr2) => arr1.concat(arr2);
console.log(myConcat([1,2], [3,4,5])); // [1,2,3,4,5];

// arrow functions are typically used as arguments of higher order functions
// i.e. functions which take other functions as arguments

const numberArr = [2, 3, 4.2, -1.24, 49, 6, 7.25, -3];

const squareList = (arr) => {
    // passing in an arrow function with only 1 argument as the filter
    // condition: number is an integer that is greater than 0
    // same goes for map: square every number in the filter
    const squaredInts = arr.filter(num => Number.isInteger(num) && num > 0)
                            .map(x => x * x);
    return squaredInts;
}

const squaredInts = squareList(numberArr);
console.log(squaredInts); // [4,9,2401,36];

// writing higher order arrow functions
const increment = (function() {
    return function increment(number, value = 1) {
        return number + value;
    };
})();

console.log(increment(5, 2));
console.log(increment(5))

/*************************************/

// Rest operator

// operator that indicates a variable number of input arguments
const sum = (function() {
    return function sum(...args) {
        return args.reduce((a, b) => a + b, 0);
    };
})();
console.log(sum(1, 2, 3));

// ignoring array elements with rest operator
const oneToTen = [1,2,3,4,5,6,7,8,9,10];
const [, , ...removedFirstTwo] = oneToTen;
console.log(removedFirstTwo);

/*************************************/

// Spread operator

// looks exactly like the rest operator except it "spreads" arrays into separate arguments
const numberSpread = [37, -17, 7, 0]
console.log(Math.min(numberSpread)) // NaN 
console.log(Math.min(...numberSpread)) // -17
// instead of taking the array as a whole it splits it up

// can also be used to create deep copies of arrays
const numberSpread2 = [...numberSpread];

// other uses
const concatSpread1 = [1,2,3]
const concatSpread2 = [...concatSpread1, 4, 5];
console.log(concatSpread2) // [1,2,3,4,5]

const objectSpread1 = {hello: "1"};
const objectSpread2 = {world: "2"};
const objectSpread3 = {...objectSpread1, ...objectSpread2, yay: "3"};
console.log(objectSpread3); // will have props from objectSpread 1 and 2

/*************************************/

// Destructuring
// Easy and fast way to extract object properties to variables

// destructuring simple objects
var structure = {x:1, y:2, z:3};
const {x:s1, y:s2, z:s3} = structure; 
console.log(s1, s2, s3);

// destructuring nested objects
const LOCAL_FORECAST = {
    today: {min:72, max: 83},
    tomorrow: {min: 73, max: 85}
};

const { tomorrow: { max : maxOfTmr }} = LOCAL_FORECAST;
console.log(maxOfTmr); // 85

// destructuring arrays - NOTE: goes in order of array elements
const [ad1, ad2, , ad3] = [1,2,3,4,5,6];
console.log(ad1, ad2, ad3); // 1,2,4

// [var1, var2] = [var2, var1] also fast way to swap values

// destructuring objects to use as function arguments
const stats = {
    max: 55,
    median: 34,
    mode: 23,
    min: -3
}

function half({max, min}) {
    // no need to pass stats and then stats.max, stats.min
    return (max + min) / 2.0;
}

console.log(half(stats)); //26

/*************************************/

// Template literals

const person = {
    name: "Nick",
    age: 21
}
// similar to fstrings
const greeting = `Hi, my name is ${person.name}. 
I am ${person.age} years old.`;

console.log(greeting);

/*************************************/

// Defining objects with arrow syntax

const createPerson = (name, age, gender) => ( {name, age, gender} );
console.log(createPerson("Nick", 21, "Male"));

/*************************************/

// Objects containing functions

// basically Java lol
const bicycle = {
    gear: 2,
    setGear(newGear) {
        "use strict";
        this.gear = newGear;
    }
}

bicycle.setGear(3);
console.log(bicycle.gear); //3

/*************************************/

// Constructors for objects

class Car {
    constructor(model) {
        // add underscore to signify private variable
        this._model = model;
    }

    // Getters and setters
    get make() {
        return this.model;
    }

    set make(updatedModel) {
        this.model = updatedModel;
    }
}

var fiat = new Car('Fiat');
fiat.make = "Subaru";
console.log(fiat.make); // Subaru
