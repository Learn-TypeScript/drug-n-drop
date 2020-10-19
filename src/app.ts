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

class ProjectClass {
  projects: any[] = [];
  static instance: any;

  private constructor() {}

  static createInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectClass();
    return this.instance;
  }

  public addProject(t: string, p: string, d: string) {
    console.log("addProject");

    const newProject = {
      id: Math.random().toString(),
      title: t,
      people: p,
      desc: d
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

class ListClass {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLElement;
  //   assingedProjects: any[] = [];

  constructor(public type: "active" | "finished") {
    this.templateElem = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElem.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    this.attach();
    this.renderContent();
  }

  public renderProjects() {
    console.log("renderProjects");

    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
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

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase();
    // this.element.querySelector("h3")!.textContent = this.type.toUpperCase();
    // this.element.querySelector("p")!.textContent = this.type.toUpperCase();
  }

  private attach() {
    this.hostElem.insertAdjacentElement("beforeend", this.element);
  }
}

const list = new ListClass("active");
const list1 = new ListClass("finished");

class InputClass {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLFormElement;
  title: HTMLInputElement;
  people: HTMLInputElement;
  desc: HTMLInputElement;

  constructor() {
    this.templateElem = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElem.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.attach();
    this.configure();

    this.title = this.element.querySelector("#title") as HTMLInputElement;
    this.people = this.element.querySelector("#people") as HTMLInputElement;
    this.desc = this.element.querySelector("#description") as HTMLInputElement;
  }

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
      const [title, desc, people] = userInput;
      project.addProject(title, people, desc);
      console.log(title, people, desc);
    }
    this.clearInputs();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
  private attach() {
    this.hostElem.insertAdjacentElement("afterbegin", this.element);
  }
}

const input1 = new InputClass();
