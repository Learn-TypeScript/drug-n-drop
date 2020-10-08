[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

- This is the continue of the `understanding-typescript` repo.

### Notes

- Remove from package.json: `"start": "react-scripts start",`. We use lite server instead.

9. **Practice time! Build a Drag n' Drop Project**

    122. DOM Element Selection & OOP Rendering

    [Document.importNode()](https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode)

    [Element.insertAdjacentElement()](https://www.w3schools.com/jsref/met_node_insertadjacentelement.asp)

    [firstElementChild](https://www.w3schools.com/jsref/prop_element_firstelementchild.asp)

    `validatableInput.minLength != null`: with one equal sign, JS checks also for `undefined`. So now zero is also checked.
    
    [128]. 
    
    The `ProjectState` class has `projects`. The `addProject` adds a project to `projects`. 

    We want to call `addProject` from `submitHandler` of `ProjectInput` class. So we create in `ProjectState` class a `private` `constructor` (`Singleton`) and a `private` `static` `instance` and a `static` `getInstance` method. So now we'll always work with the same object of this class. Thus we have one state management object.

    Then in the `ProjectInput` class, we call `addProject` with the values we got from the user. 

    Then we want to pass the info to the `ProjectList` class, which outputs the project on the screen. So in `ProjectState`, we create a `listeners` array, which will take functions, which should be called whenever something changes. Then we create the `addListener` function, which takes a function and adds it to the `listeners` array.  

    In the `addProject` we loop through all the `listeners` and we execute all its functions by passing a copy of the projects.  

    Then we set up a `listener` in the `ProjectList` class, by calling the `addListener` in the constructor. A `listener` is a function that we call, when something changes. That function will get a list of projects. So the `listener` uses the list of projects. And what it does is to assign all the projects in `assignedProjects` which then the renderProjects function uses to render the projects to the screen. 

    We render the projects with `renderProjects` function, by getting the `listEl` of the `DOM` and then loop through the assignedProjects, and getting every project's content.

    Check also my reaction to this question: [Please explain the addListener method logic](https://www.udemy.com/course/understanding-typescript/learn/lecture/16935820#questions/10231684)

    [131]. Adding Inheritance & Generics.

    We create a `Component` class, which is `abstract` in order to use it as a `type`. We use a `class` as a `type`, because we want to instantiate it. Then we pass in its `consturctor`: `templateId, hostElementId, insertAtStart, newElementId` to use them accordingly. We also move the `attach` method in `Component`, and we make the `configure` and `renderContent` methods `abstract`. Lastly we create also a `State` class to use it as a type for the `ProjectState` class. The `State` class is `generic`. We pass in the `listeners` and the `addListener` method. So now `ProjectState` may create a `Project` (generic type) or other objects.

    As about flagging the `renderContent` method as `abstact`, looks that it's redundant. Just leave it `public` and make it optional so `ProjectInput` claas won't have to implement it, and it's working fine. Check: [Optional abstract members](https://github.com/microsoft/TypeScript/issues/6413) and [this](https://www.udemy.com/course/understanding-typescript/learn/lecture/16935850#questions/12474016). Also the branch 131...

    [133]. Using a getter in `ProjectItem`. 

    It's a convention to put it under the fields. We use it to show on the screen `1 person assigned` or `2 persons assinged`.
    
    [134]. Utilizing Interfaces to Implement Drag & Drop. 

    We drag n' drop a project from active projects to finished projects. It's not only about updating the UI but also the data in the `ProjectState` class. We use two `interfaces` to force the classes to implement either drag n drop (`Draggable`), or updating the state (`Dragtarget`). 

    `Draggable`: We need the `dragStartHandler` and the `dragEndHandler`. They both take in an `DragEvent` object and return `void`.

     `Dragtarget`: We assign the `dragOverHandler`, `dropHandler`, `dragLeaveHandler`. They receive a DragEvent and return also nothing.

     We assing the `Draggable` to `ProjectItem` class. In the configure method of this class, we add a listener with the `dragstart` event, which points to the `dragStartHandler`. We add also the `@autobind` to the `dragStartHandler`.

     We also need to add the `draggable='true'` attribute, in the `index.html` file, on the `<li>` we want to drag...

    [135]. Drag Events & Reflecting the Current State in the UI.

     We implement the `Dragtarget` interface on the `ProjectList` class. In the `dragOverHandler` we change the UI, so we see where we can drop the project, by changing the background on the area where we want to drop it. We use CSS to do that, so we need to add the `droppable` class on the `<ul>`, by using the [classList](https://developer.mozilla.org/eUS/docs/Web/API/Element/classList). 

    In order to have the `dragOverHandler` get fired, we register a listener in the `configure` method, listening to the `dragover` event. We also add two more listeners, the `dragleave` and `drop`, which trigger the according methods. In the `dragLeaveHandler` we remove the `droppable` class, so the UI changes when we leave the area.

    [136]. Adding a Droppable area.

    In the `dragStartHandler`, on the event object we use the [dataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) property, to set data on that event (which we later can get when dropping), by using the [setData](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData). 

    Then we set the effect that our event want to have, with [DataTransfer.effectAllowed](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed), which is `move`.

    In the `dragOverHandler` we check the type of data we drag, and if OK we update the background. We also call `event.preventDefault()` because the default for JS events is to not allow dropping! 

    [137]. Finishing Drag & Drop.

    Get the `id` of the project we want to move, in the `dropHandler`. 

    In order to change the state of a project (from active to finished) we create a `moveProject` method in `addProject` of `ProjectState` class. The `moveProject` takes as arguments the `projectId` and the `newStatus`. We check if we have a much between the `projects` and the `projectId`, and if yes then we assing to it the `newStatus`.

    We need to update the `listeners` and re-render the `assignedProjects`. So we move the `for-loop` that calls all the `listeners-functions`, from the `addProject` to a new `updateListeners` method, which we now call not only from `addProject`, but also from `moveProject`.

    So now in dropHandler we can call moveProject.

    Lastly in moveProject we first check if the newStatus is changed and then update the listeners and re-render. So it won't re-render if we leave the project where we got it. 

    More on Drag & Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

10. Modules & Namespaces.
    Namespaces is an intresting way to seperate code in files. 

    There is no seperation in this project (just watch the videos).

    These links might also be interesting:

    JavaScript Modules (Overview): https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b
    
    More on ES Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

11. Using Webpack with Typescript.

    [151]. Module Introduction.
    
    NOTE: I copied the code from the course Resources, and deleted the old `app.ts` so I can follow along.
    
    Compare Normal setup with Webpack setup:
    
    With Normal set up we have multiple `.ts` files & imports which means `Http` requests whish yieds **low latency**. But with Webpack we have code bundles, so less imports required.
    
    N: Unoptimized code (not as small as possible). W: Optimized code, so less code to download.
    
    N: External development server needed (lite-server). W: We can add more build steps... 
    
    Packages installed: `npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`
    
    `--save-dev webpack`: Is the heart of the setup. It's a tool that allows us plug certain functionalities, to bundle and **transform** our code, i.e. transform the code to JS and also bundle it.
    
    `webpack-cli`: With that we can run commands to our projects.
    
    `webpack-dev-server`: Starts webpack under the hood. And triggers a re-compile when something changes.
    
    `typescript`: It's smart to have a local specific typescript version, so if you ever change the global TS version, your project will not brake. 
    
    `ts-loader`: Works together with Webpack. It tell Webpack how to convert TS code to JS.

    [154]. Adding Entry & Output Configuration.
    
    In `tsconfig.json` we don't need `rootDir` anymore, because webpack is going to determine where the root files are! This happens by setting the `entry` in the `webpack.config.js` file.
    
    Remove all `.js` from the imports in all .ts files.
    
    In `output` of `webpack.config.js` we can add dynamic parts. E.g. `bundle.[contenthash].js` to tell webpack to automatically create a unique hash, which will help with cashing in the browser (but we're not going to use that here). 
    
    To show the path, webpack wants an **absolute path**, so we need to use nodejs modules. So we import the `path` module, which is to find, in the core nodejs enviroment.
    
    `path: path.resolve(__dirname, 'dist')`: resolve allows to build an absolute path to a certain folder. `__dirname` is a global constant. `'dist'` constracts an absolute path to the dist folder, which then webpack uses to write the output.

    [155]. Adding TypeScript Support with the ts-loader Package.

    In `module` of `webpack.config.js` webpack understands how to work with files. There you can set multiple `rules` that may apply to the files. One rule is: `/\.ts$/` which is a regex that tells webpack to look for files that end with `.ts`.
    
    With `use` specify what to do with the files.
    
    `resolve`: Tell wbp, which file extensions to add to the imports.
    
    `devtools: "inline-source-map"`: extract the source-map files and add them to the bundle.
    
    To use webpack, go to package.json and add: "`build": "webpack",` in the scripts. 

    [156]. Finishing the Setup & Adding webpack-dev-server.
    
    With `webpack-dev-server`, the `bundle.js` file is writen only in memory, not in the disc. So we need to add `publicPath: 'dist'` in `webpack.config.js` to configure that accordingly.
    
    Set `mode: "development"` so WP will do fewer optimizations, and make debugging easier, i.e. give us more meaningfull errors.

    [157]. Adding a Production Workflow.

    For production, we need a different workflow.

    `webpack.config.prod.js` this name is up to you. WP will not look for it by default.

    `clean-webpack-plugin`: cleans the dist folder, i.e. deletes the old bundle.js just before the new is created.

    Add in `package.json` `"build": "webpack --config webpack.config.prod.js` so webpack will run the according file.

    Official Webpack Docs: https://webpack.js.org/