// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  // fields
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  discriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // Import the content of the element
    // Pass a pointer of the templateElement into importNode
    // 2nd arg: true, ie import a deep clone.
    // We'll use the importedNode, to render some content.
    // NOTE importedNode is a document fragment. We cannot insert it like it is!
    // Instead we need to get access to the HTML element in there
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    /* element is the concrete property that points the node we want to insert */
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // Add an id so the css style for "user-input" will be applied.
    this.element.id = "user-input";
    this.configure();
    this.attach();
    // prettier-ignore
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    // prettier-ignore
    this.discriptionInputElement = this.element.querySelector('#discription') as HTMLInputElement;
    // prettier-ignore
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
  }

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInputElement.value;
    const enterdDiscription = this.discriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
  }

  @autobind
  private sumbitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
  }

  private configure() {
    this.element.addEventListener("submit", this.sumbitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
