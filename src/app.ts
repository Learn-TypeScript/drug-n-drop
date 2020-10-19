function Autobind(_: any, _2: any, desc: PropertyDescriptor) {
  return {
    get() {
      return desc.value.bind(this);
    }
  };
}

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
  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.title.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
  private attach() {
    this.hostElem.insertAdjacentElement("afterbegin", this.element);
  }
}

const input1 = new InputClass();
