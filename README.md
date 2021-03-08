# MVC-TODO-Quick-Tutorial
A quick tutorial from /taniarascia on how to write an app using the MVC pattern. Learning a lot about it and this has helped clear a few points up for me so far.

This is the link to the guide: https://www.taniarascia.com/javascript-mvc-todo-app/

### My Understanding:

The simpler To-do app has offered a slightly less intimidating view of how each component interacts and depends on one another.

The App Pattern appears to break down into the 3 parts in the following way:

**Model**: Where the data Happens - This is where you handle all computation of the users input, and 
how different functions should handle that inputted data once they are called. For example, you have to outline what a ToDo task looks 
like, how & from where the data (Tasks) should be removed.

**View**: This is the Window into our application - This part of the program deals with the visual elements that typically are 
generated as the result of new data being added to the app, or existing date being remove or changed. 
You will typically see alot of methods talking about 'creating', 'removing' or 'getting' items in here.

**Controller**: This is the D-Pad to the Apps 'Playstaion'/'XBOX' (View/Model) - You set up all the data, and how the data should be presented in the View/Model, 
you then BIND that data in the VIEW/MODEL using a callback method, then you call them in the controler as and when they are needed. Are they needed immediately? 
Put them in the constructor of the Controller class, Are they needed when a user deletes an item on the page? 
Call them at that point via the Controller class.

This last part is still a bit of a grey area, especiall the Callbacks. I need to nail down this part of the model, but overall 
I am feeling more at home and confident with it.
