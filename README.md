[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

- This is the continue of the `understanding-typescript` repo.

### Notes

- from package.json: `"start": "react-scripts start",`. We use lite server instead.

9. **Practice time! Build a Drag n' Drop Project**
    - `validatableInput.minLength != null`: with one equal sign, JS checks also for `undefined`. So now zero is also checked.
    - 128. The `ProjectState` class has `projects`. The `addProject` adds a project to `projects`. 
        - We want to call `addProject` from `submitHandler` of `ProjectInput` class. So we create in `ProjectState` class a `private` `constructor` (`Singleton`) and a `private` `static` `instance` and a `static` `getInstance` method. So now we'll always work with the same object of this class. Thus we have one state management object.
        - Then in the `ProjectInput` class, we call `addProject` with the values we got from the user. 
        - Then we want to pass the info to the `ProjectList` class, which outputs the project on the screen. So in `ProjectState`, we create a `listeners` array, which will take functions, which should be called whenever something changes. Then we create the `addListener` function, which takes a function and adds it to the `listeners` array.  
        - In the `addProject` we loop through all the `listeners` and we execute all its functions by passing a copy of the projects.  
        - Then we set up a `listener` in the `ProjectList` class, by calling the `addListener` in the constructor. Then we add the `projects` we get from `addListener` to the field of `ProjectList` the `assignedProjects`.
        - Then we render the projects with `renderProjects` function, by getting the `listEl` of the `DOM` and then loop through the assignedProjects, and getting every project's content.
    - 131. We create a `Component` class, which is `abstract` in order to use it as a `type`. We use a `class` as a `type`, because we want to instantiate it. Then we pass in its `consturctor`: `templateId, hostElementId, insertAtStart, newElementId` to use them accordingly. We also move the `attach` method in `Component`, and we make the `configure` and `renderContent` methods `abstract`. Lastly we create also a `State` class to use it as a type for the `ProjectState` class. The `State` class is `generic`. We pass in the `listeners` and the `addListener` method. So now `ProjectState` may create a `Project` (generic type) or other objects.
    - As about flagging the `renderContent` method as `abstact`, looks that it's redundant. Just leave it `public` and make it optional so `ProjectInput` claas won't have to implement it, and it's working fine. Check: [Optional abstract members](https://github.com/microsoft/TypeScript/issues/6413) and [this](https://www.udemy.com/course/understanding-typescript/learn/lecture/16935850#questions/12474016). Also the branch 131...