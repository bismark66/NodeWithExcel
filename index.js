/** @format */

let xlsx = require("xlsx");
let fs = require("fs");

let workbook = xlsx.readFile("fyp-data.xlsx");
console.log(workbook);
