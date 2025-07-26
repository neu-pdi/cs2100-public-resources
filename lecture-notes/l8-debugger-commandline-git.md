---
sidebar_position: 8
lecture_number: 8
title: Debugger, Command Line, and Git
---

# Debugger, Command Line, and Git

## Use the debugger to trace code

Poll: My code keeps printing the wrong thing. What should I do?

1. Run it again -- maybe it will magically work this time!
2. Stare at the code for a couple more hours trying random things
3. Use the debugger
4. Nothing -- this is unfixable

In order to use the debugger, we first need to set a breaking point on at least one line. When we start the debugger, it will execute all of the code up to (but not including) that line. To set a breaking point, click next to the line number. A red dot will appear. (Click the same spot again to remove the breaking point.)

<img width="96" height="20" alt="Screenshot of breaking point" src="https://github.com/user-attachments/assets/4272efbb-d9ed-428f-bb64-67b85453161b" />

To start the debugger in VSCode, rather than clicking the "run" button, use the menu to select "Python Debugger: Debug Python File".
<img width="304" height="211" alt="Screenshot of debug button" src="https://github.com/user-attachments/assets/03657698-0a9a-4c83-9ce7-0ffd5087f2b3" />

Once you've started the debugger, two things will appear: the "Run and Debug" window, and the menu of controls. The "Run and Debug" window contains the "call stack": the stack functions that are currently running. In the screenshot below, it shows that we called the `main()` function, and from there, we called the `print_cat()` function (which is currently running, and waiting for us to take any action using the menu of controls).

<img width="293" height="407" alt="Screenshot of the Run and Debug menu" src="https://github.com/user-attachments/assets/b2c10aaf-efe0-4a1f-b69f-3dd38efbf2ad" />

The "Run and Debug" menu also contains the current values stored inside all local and global variables.

Tip: The debugger uses the method `__repr__(self) -> str` to get the string used to represent objects in the "Run and Debug" menu. If you want the `__str__(self) -> str` method to be used to represent your object instead, you will need to add this to your class:
```python
def __repr__(self) -> str:
    return self.__str__()
```

The menu of controls looks like this:

<img width="188" height="40" alt="Screenshot of menu of controls" src="https://github.com/user-attachments/assets/9aff1dec-30a5-423b-819b-c8b32a50778a" />

The six dots on the left can be used to drag the menu elsewhere on your screen. The buttons, from left to right, are:
1. Continue running the program until the next breaking point (or until the end, if there are no more breaking points)
2. Run the current (highlighted) line of code. If that line contains a function call, execute the entire function.
3. Run the current (highlighted) line of code. If that line contains a function call, enter that function and run only its first line.
4. Continue running the code in the current function, until we return control to the outer function that had called this function. Then stop at the next line of code in the outer function.
5. Restart the debugger from the beginning of the program.
6. Stop the debugger and close it without running the remaining code.

We sometimes use the debugger during class to show the current state of the program and data structures. We also often use the debugger during office hours to step through students' assignment code. (If you come to us with a bug in your code, we will probably start by asking if you have tried using the debugger!)

## Use the command line to navigate the file system: pwd, cd, ls -al
## Use git through the command line: clone, add, commit, push, pull, status
## use tests to debug a function
