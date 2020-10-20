type validate = {
  value: string | number;
  required: boolean;
  minLength?: number;
  min?: number;
  max?: number;
};

function validation(obj: validate) {
  let isValid = true;
  if (typeof obj.required === "boolean" && obj.required) {
    isValid = isValid && obj.value.toString().length > 0;
  }
  if (typeof obj.value === "string" && obj.minLength) {
    isValid = isValid && obj.value.length > obj.minLength;
  }
  if (typeof obj.value === "number" && obj.min) {
    isValid = isValid && obj.value > obj.min;
  }
  if (typeof obj.value === "number" && obj.max) {
    isValid = isValid && obj.value < obj.max;
  }
  return isValid;
}

function Autobind(_: any, _2: any, desc: PropertyDescriptor) {
  return {
    get() {
      return desc.value.bind(this);
    }
  };
}

enum Status {
  Active,
  Finished
}

type ProjectType = {
  id: string;
  title: string;
  people: number;
  desc: string;
  status: Status;
};
// class ProjectType {
//   constructor(
//     public id: string,
//     public title: string,
//     public people: number,
//     public desc: string,
//     public status: Status
//   ) {}
// }

abstract class BaseClass<T extends HTMLElement, U extends HTMLElement> {
  templateElem: HTMLTemplateElement;
  hostElem: T;
  element: U;

  constructor(
    tempElementId: string,
    hostElemId: string,
    elemId: string,
    afterBegin: boolean
  ) {
    this.templateElem = document.getElementById(
      tempElementId
    )! as HTMLTemplateElement;
    this.hostElem = document.getElementById(hostElemId)! as T;

    const importedNode = document.importNode(this.templateElem.content, true);
    this.element = importedNode.firstElementChild as U;
    if (elemId) {
      this.element.id = elemId;
    }

    this.attach(afterBegin);
  }

  private attach(afterBegin: boolean) {
    /* If we use a string we get the following error:
    Argument of type 'string' is not assignable to parameter of type 'InsertPosition'. */
    this.hostElem.insertAdjacentElement(
      afterBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectClass {
  projects: ProjectType[] = [];
  static instance: ProjectClass;

  private constructor() {}

  static createInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectClass();
    return this.instance;
  }

  public addProject(t: string, p: number, d: string) {
    console.log("addProject");

    const newProject: ProjectType = {
      id: Math.random().toString(),
      title: t,
      people: p,
      desc: d,
      status: Status.Active
    };
    this.projects.push(newProject);
    list.renderProjects();
  }

  public getProjects() {
    console.log("getProjects");

    return this.projects.slice();
  }
}

const project = ProjectClass.createInstance();

class ListClass extends BaseClass<HTMLDivElement, HTMLElement> {
  constructor(public type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`, false);

    this.renderContent();
  }

  public renderProjects() {
    console.log("renderProjects");

    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.textContent = "";
    const projects = project.getProjects();
    for (const project of projects) {
      const listItem = document.createElement("li")!;
      console.log("project.title", project.title);
      if (!!project) {
        listItem.textContent = project.title;
        listEl.appendChild(listItem);
      }
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase();
  }
  configure() {}
}

const list = new ListClass("active");
const list1 = new ListClass("finished");

//--------------
class InputClass extends BaseClass<HTMLDivElement, HTMLFormElement> {
  title: HTMLInputElement;
  people: HTMLInputElement;
  desc: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input", true);
    this.configure();

    this.title = this.element.querySelector("#title") as HTMLInputElement;
    this.people = this.element.querySelector("#people") as HTMLInputElement;
    this.desc = this.element.querySelector("#description") as HTMLInputElement;
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}

  private clearInputs() {
    this.title.value = "";
    this.people.value = "";
    this.desc.value = "";
  }

  private getUserInput(): [string, number, string] | void {
    const title = this.title.value;
    const people = this.people.value;
    const desc = this.desc.value;

    const validTitle = { value: title, minLength: 3, required: true };
    const validPeople = { value: +people, min: 1, max: 10, required: true };
    const validDesc = { value: desc, minLength: 5, required: true };

    if (
      validation(validTitle) &&
      validation(validPeople) &&
      validation(validDesc)
    ) {
      return [title, +people, desc];
    } else {
      alert("No valid input...");
      return;
    }
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.getUserInput();
    // Without this if check we get the following error:
    // Type 'void | [string, number, string]' must have a '[Symbol.iterator]()' method that returns an iterator.
    if (Array.isArray(userInput)) {
      const [title, people, desc] = userInput;
      project.addProject(title, people, desc);
      console.log(title, people, desc);
    }
    this.clearInputs();
  }
}

const input1 = new InputClass();
