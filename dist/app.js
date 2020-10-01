"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validateInput(target, _2, descriptor) {
    console.log(target);
    console.log(descriptor);
}
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.configure();
        this.attach();
        this.titleInputElement = this.element.querySelector('#title');
        this.discriptionInputElement = this.element.querySelector('#discription');
        this.peopleInputElement = this.element.querySelector('#people');
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enterdDiscription = this.discriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        return [enteredTitle, enterdDiscription, +enteredPeople];
    }
    sumbitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        console.log(userInput);
    }
    configure() {
        this.element.addEventListener("submit", this.sumbitHandler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    validateInput
], ProjectInput.prototype, "gatherUserInput", null);
__decorate([
    autobind
], ProjectInput.prototype, "sumbitHandler", null);
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map