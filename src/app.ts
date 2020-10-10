import "reflect-metadata"; // "class-transformer" depens on this import.
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import Product from "./product.model";

// For `lodash`
import _ from "lodash";
console.log(_.shuffle([1, 2, 3]));

// For `declare`
declare var GLOBAL: any;
console.log(GLOBAL);

// For Drag n Drop
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

// Imagine you got this from the backend
const products = [
  { title: "Carpet", price: 30 },
  { title: "A book", price: 10 }
];

// Create manually instances of Product class.
// const loadedProducts = products.map(product => {
//   return new Product(product.title, product.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}

const p1 = new Product("A book", 13);
console.log(p1.getInformation());

// Testing class-validator
const newProd = new Product("", -2);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS: ", errors);
  } else {
    console.log(newProd.getInformation());
  }
});
