"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const project_input_1 = require("./components/project-input");
const project_list_1 = require("./components/project-list");
const product_model_1 = __importDefault(require("./product.model"));
const lodash_1 = __importDefault(require("lodash"));
console.log(lodash_1.default.shuffle([1, 2, 3]));
console.log(GLOBAL);
new project_input_1.ProjectInput();
new project_list_1.ProjectList("active");
new project_list_1.ProjectList("finished");
const products = [
    { title: "Carpet", price: 30 },
    { title: "A book", price: 10 }
];
const loadedProducts = class_transformer_1.plainToClass(product_model_1.default, products);
for (const product of loadedProducts) {
    console.log(product.getInformation());
}
const p1 = new product_model_1.default("A book", 13);
console.log(p1.getInformation());
const newProd = new product_model_1.default("", -2);
class_validator_1.validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log("VALIDATION ERRORS: ", errors);
    }
    else {
        console.log(newProd.getInformation());
    }
});
//# sourceMappingURL=app.js.map