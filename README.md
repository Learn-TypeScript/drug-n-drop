[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

- This is the continue of the `understanding-typescript` repo.

### Notes

- from package.json: `"start": "react-scripts start",`. We use lite server instead.

9. **Practice time! Build a Drag n' Drop Project**
    - 128. The `ProjectState` class has `projects`. The `addProject` adds a project to `projects`. 
        - We want to call `addProject` from `submitHandler` of `ProjectInput` class. So we create in `ProjectState` class a `private` `constructor` (`Singleton`) and a `private` `static` `instance` and a `static` `getInstance` method. So now we'll always work with the same object of this class. Thus we have one state management object.
        - Then in the `ProjectInput` class, we call `addProject` with the values we got from the user. 
        - Then we want to pass the info to the `ProjectList` class, which outputs the project on the screen. So in `ProjectState`, we create a `listeners` array, which will take functions, which should be called whenever something changes. Then we create the `addListener` function, which takes a function and adds it to the `listeners` array.  
        - In the `addProject` we loop through all the `listeners` and we execute all its functions by passing a copy of the projects.  
        - Then we set up a `listener` in the `ProjectList` class, by calling the `addListener` in the constructor. Then we add the `projects` we get from `addListener` to the field of `ProjectList` the `assignedProjects`.
        - Then we render the projects with `renderProjects` function, by getting the `listEl` of the `DOM` and then loop through the assignedProjects, and getting every project's content.
