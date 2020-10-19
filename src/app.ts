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
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectClass;

  private constructor() {}

  addProject(title: string, people: number, description: string) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectClass();
    return this.instance;
  }

  addListener(listernFn: Function) {
    this.listeners.push(listernFn);
  }
}

const projectInstance = ProjectClass.getInstance();

class ListClass {
  templateElem: HTMLTemplateElement;
  hostElem: HTMLDivElement;
  element: HTMLElement;
  assingedProjects: any[] = [];

  constructor(public type: "active" | "finished") {
    this.templateElem = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElem = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElem.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectInstance.addListener((projects: any[]) => {
      this.assingedProjects = projects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assingedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
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
    console.log(userInput);
    // Without this if check we get the following error:
    // Type 'void | [string, number, string]' must have a '[Symbol.iterator]()' method that returns an iterator.
    if (Array.isArray(userInput)) {
      const [title, people, desc] = userInput;
      projectInstance.addProject(title, people, desc);
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
