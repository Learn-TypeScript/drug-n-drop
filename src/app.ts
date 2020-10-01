class ProjectInput {
  // fields
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

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
    this.attach();
  }

  private attach() {
    //
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
