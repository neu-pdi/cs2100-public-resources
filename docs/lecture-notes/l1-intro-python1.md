---
sidebar_position: 1
lecture_number: 1
title: Course Overview and Python
---

# Course Overview and Python

## Structure of this course and expectations for students

Participating in class helps students to connect with each other, learn the material more deeply, and let the instructor know about their understanding. It is also worth a portion of the grade.

Poll: What motivates you? (Choose your top 3)
- Grades
- Learning
- Preparing for job / co-op interviews
- Doing well in the job / co-op
- Doing well in later courses
- Making friends
- Letter of recommendation from instructor
- Enjoying college life
- Addressing societal issues
- Health and well-being

These in-class exercises will be graded on completion, not correctness. (And there was no "correct answer" for that poll.)

Course structure:
- 3 lectures and 1 lab per week​
- ~ weekly homework assignments​
- Four quizzes and a final exam
- Office hours
- Discord

### The AI Policy

AI coding assistants like Cursor and Windsurf are not allowed for this course. We believe that using an AI assistant is an important skill that should be covered _after_ the basics (which is why there is a different policy in CS 3100). Using AI assistants before covering the basics would be like using a calculator before a course on arithmetic -- it would undermine your ability to review and understand code.

AI large language models like ChatGPT and Claude are not allowed for assignment-related use. For example, you may not copy and paste (or otherwise enter) any part of the assignment instructions into the AI, and you may not take assignment solutions from it. You also may not paraphrase the assignment instructions to an AI, "only look" at an AI-generated solution before writing your own, or otherwise undermine your learning using AI. Things that violate the spirit of the policy (loopholes that are not explicitly mentioned) are also not allowed. If you have a question about whether something is allowed, we encourage you to ask an instructor, and you will not be penalized for asking. You may use AI language models for non-assignment-related things.

The exception is the AI overview that appears when using a search engine like Google. You may use a search engine to look up documentation, errors, concepts, etc. when doing assignments. You may read that AI overview.

Open ended poll: How do you feel about the AI policy?

## Resources

- [Pawtograder](https://app.pawtograder.com):
  - Assignments
    - Submit through GitHub
  - Checking grades
- [Lecture notes](https://neu-pdi.github.io/cs2100-public-resources)
- Textbook: "Python 3 Object Oriented Programming: Harness the Power of Python 3 Objects" by Dusty Phillips covers most of the object-oriented concepts relevant to this course, though we will not follow it exactly.

## VSCode, Pawtograder, and GitHub

## The command line

<img width="564" height="500" alt="Meme: using the command line" src="https://github.com/user-attachments/assets/da179ae8-52ac-437f-8057-77d12e784817" />

The command line is a powerful way to navigate a computer. In this course, we will be using the command line to navigate assignment files.

- Mac or Linux: Terminal app
- Windows: [Git Bash](https://gitforwindows.org) (After installing it, pin Git Bash to the Taskbar and configure it to open to your home directory.)

Most popular commands:
| Command | Description | Example |
| - | - | - |
| `ls` | short for “list”; prints the contents of the current working directory | `ls` |
| `cd` | short for “change directory”; moves you to the given directory | `cd ~/Desktop` |
| `pwd` | short for "print working directory" | `pwd` |
| `mkdir` | short for “make directory”; creates a new subdirectory at the current location with the given name | `mkdir nuresources` |
| `touch` | creates an empty file in the current directory with the given filename | `touch lecture8.py` |

Changing the directory using `cd`:
- Using the absolute directory, the complete path from the root to a given directory or file: `cd ~/Desktop/Lectures/2100`
- Using the relative directory, the path from our current working directory to a given directory or file: `cd Lectures/2100` (from the Desktop)

Poll: The command `cd fa25-hw3-lists-rasikabh/src/data` results in an error. What is NOT likely to be the cause of this error?
1. The current location is not the directory where I store my homework assignments
2. There is no directory called `src` in the directory `fa25-hw3-lists-rasikabh`
3. `data` is a single file, not a directory
4. The assignment submission for Homework 3 is closed

## git

Have you ever wished you could...
- go back to an earlier working version of a project?
- see what changed between versions of your code?
- tell who made a certain change, when and why?
- switch between using your laptop and desktop to work on a project?
- work with a friend without worrying about overwriting each other's changes?
- have someone review your changes before adding them to a project?
- make some experimental changes with the option of undoing them?
- create your own version of an existing project, change it, and incorporate updates to the original project?
(List source: Ellen Spertus)

Git is the leading distributed version control software, created by Linus Torvalds in 2005.
GitHub is a website owned by Microsoft that hosts git repositories and has a web interface (plus other tools like automated testing and issue tracking)

<img width="887" height="455" alt="Two users using GitHub" src="https://github.com/user-attachments/assets/fb0db5d1-d596-4fb9-8cc2-bcfb48c155e3" />

When you "accept" an assignment using Pawtograder, it creates a code repository on GitHub containing the "starter code" for that assignment. You will then use `git clone` to copy that code repository to your laptop, and open / edit the code using VSCode on your laptop.

Key concepts:
- Repository (repo): a set of code and its history
  - local: on your computer
  - remote: on another computer (like GitHub)
- Commit
  - the codebase at a given point in time (noun)
  - to add a set of changes to the repository (verb)
  - Push: to move code from a local to remote repository

Tip: git repositories have a directory in them called `.git` which is invisible by default. To get it to show up when you use the `ls` command, you must modify it slightly, so it looks like this: `ls -al`

Locations of versions of code:
| Location | Definition | git command to put code there | Postal analogy |
| - | - | - | - |
| working area | code that you are currently writing / saving in VSCode |  | Writing on a paper |
| staging area | code that is ready to be commited | `git add .` | Add a stamp and put it in your backpack |
|​ local repository | code that has been committed | `git commit -m "descriptive message"` | Drop off all stamped postcards at the post office |
| remote repository | code that is on GitHub | `git push` | Postal workers moving postcards to destinations |

Most assignments will go like this:
- Pawtograder creates your GitHub repo when the assignment is "released"
- Using your command line, use `git clone <GitHub repo URL (ssh version)>` to copy the files to your computer
  - Most people have a "CS2100" folder or directory where they clone all their assignment repos
- You open the resulting files on your computer using VSCode and work on the assignment, saving as you go.
- After each significant chunk of progress on the assignment:
  - `git add .` to stage changes in all files in this directory
  - `git commit -m "descriptive message"` to commit the changes
  - `git push` to push the changes to the online repo in GitHub
    - Pawtograder will automatically take that as your submission (if the submission is still open)
  - `git status` to make sure it worked

Other commands:
- `git pull` takes changes any that others pushed to the repo on GitHub, and copies them to your local repo
- `git status` reports which files have been changed and staged
- `git diff` shows every changed line
- `git diff --staged` shows the difference between staged and committed changes
- `history` shows the history of commands you typed into the command line

Poll: Why is this not an ideal commit message? `"Complete Homework 3"`
1. It doesn't describe the code changes
2. It implies that all changes to the entire assignment were submitted in a single commit
3. We can't change Homework 3 again, since we said we completed it
4. All of the above
5. (1) and (2) only


## Practices for code-level design (style guidlines)

### Why enforce a Style Guide?

Any code that we write will be read by at least one other person, and probably more. Many employers require all submitted code to be verified by at least two other people before it is accepted into the code base. And, at the very least, the TA grading your homework will read your code -- and we want them to be in a good mood when they do it, right?

So, we follow a standard set of rules, called a "Style Guide," to make our code easier to read.

It also helps other people to easily contribute to our codebase if they know where to look for things, or they know the format of the thing for which they are searching. Sometimes that "other person" is actually ourselves, years in the future, attempting to use our old code.

In this course, we will use the "official" Python style guide, PEP8: [https://peps.python.org/pep-0008](https://peps.python.org/pep-0008/)

#### Variable naming conventions

Part of the style guide is naming conventions. The names of variables, functions, and modules in Python use snake_case: the words are in lowercase, separated by underscores (`_`).

#### Pylint

We will use Pylint [(documentation here)](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint) to check that our code follows the style guidelines.

Please set up the Pylint VSCode extension using the steps in the [Setup Guide](https://neu-pdi.github.io/cs2100-public-resources/setup).


## Types in Python code

Your classmate wants help finding a bug in their code:

```python
def get_area_of_rectangle(width, height):
    return width * height

width = '3'
height = 4

result = get_area_of_rectangle(width, height)

print(f'Area of a {width} by {height} rectangle: {result}')
```

Its output is `Area of a 3 by 4 rectangle: 3333`, which is false.
Wouldn't it be nice if the IDE could save us a bit of time finding the bug?

Unconvinced? How about this code:

```python
num1 = input('Please enter a number: ')
num2 = input('Please enter another number: ')
print(num1 + num2)
```

It says that 3 + 5 is 35. We'll revisit that in a bit.

Python is a strongly typed language, which means that variables have types.
Python is also a dynamically typed language, which means that it checks the types for consistency at run time, not compile time.
We love Python, but being a strongly typed and dynamically typed language can make it hard for introductory learners -- and make it hard to catch bugs in code that we haven't seen before.

Python supports putting types in the code:

```python
def get_area_of_rectangle(width: int, height: int) -> int:
    return width * height

width: int = '3'
height: int = 4

result: int = get_area_of_rectangle(width, height)

print(f'Area of a {width} by {height} rectangle: {result}')
```

Python does not enforce the types. The above code runs exactly the same as before, even after adding the types.

So, in this course, we will use MyPy to enforce the type checking.

#### MyPy

MyPy's documentation can be found at [https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker)

Please set up the MyPy VSCode extension using the steps in the [Setup Guide](https://neu-pdi.github.io/cs2100-public-resources/setup).

Now, any missing or mismatched types will be reported in the "Problems" tab every time you save or open a file:
   - Mac: `Cmd` + `Shift` + `M`
   - Windows: `Ctrl` + `Shift` + `M`

If MyPy is set up properly, then this code:

```python
def add(num1: int, num2) -> int:
    return num1 + num2

result: str = add(3, 'hi')

def func() -> int:
    pass
```

should result in three errors: `num2`'s missing type, `add()`'s returning something other than the promised `int`, and `result`'s value being an `int` when the variable type is `str`.

If there is an error about `func()` missing a return, then the arg `--disable-error-code=empty-body` was not specified correctly in the settings.

Back to the example where 3 + 5 is 35:

```python
num1: int = input('Please enter a number: ')
num2: int = input('Please enter another number: ')
print(num1 + num2)
```

Adding the types for `num1` and `num2` prompted MyPy to remind us that the `input()` function returns a `str`, not an `int`.

## Functions (including documentation and tests)

In this course, we consider testing to be part of the function design process. We like to write tests to ensure our code works, but also to convince *others* that our code works.

We also require all functions to have appropriate documentation. Make sure to include:
- All parameters
- Any returns
- Any errors or exceptions that might be raised

We assume that if we asked you to write a function to calculate the area of a rectangle (given the width and height), you would know how to implement it.

Here we show you how to format it with documentation and tests:

```python
"""Module for unit testing"""
import unittest


def get_area_of_rectangle(width: int, height: int) -> int:
    """Returns the area of a rectangle.

    Parameters
    ----------
    width : int
        The width of the rectangle
    height : int
        The height of the rectangle
    
    Returns
    -------
    int
        The area of the rectangle

    Raises
    ------
    ValueError
        If width or height is negative
    """
    if (width < 0 or height < 0):
        raise ValueError("Rectangle dimensions cannot be negative")
    return width * height


class TestArea(unittest.TestCase):
    """Tests for the function get_area_of_rectangle(width: int, height: int) -> int"""

    def test_3_by_4(self) -> None:
        """3 by 4 rectangle"""
        self.assertEqual(12, get_area_of_rectangle(3, 4))

    def test_negative_area(self) -> None:
        """Make sure it raises a ValueError for a negative width"""
        with self.assertRaises(ValueError):
            get_area_of_rectangle(-1, 4)


if __name__ == '__main__':
    unittest.main()

```

Formatting the documentation in this way makes it so that it shows up in official places like `str.__doc__` and `help(str)`.

Notice that one of the tests makes sure that the function raises a ValueError if it's given an invalid argument.

## Using VSCode's debugger to trace code

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

Tip: Use tests to debug buggy functions. If there is a function with a bug, write a test that calls that function in a way that is likely to make the bug happen. (The test will fail at first, which is good because if the test passes, then you know you have fixed the bug.) Then, place a breaking point in the buggy function, and start the debugger on the test.


## Why Python?

Many employers use Python extensively, and it is common to use Python in technical interviews. Its popularity has led to hundreds of thousands of Python packages available for public use. It's popular among data scientists, web developers, game developers, machine learning engineers, and many others. There are also many online resources for learning Python.

The next course in this sequence (CS 3100: PDI2) will use Java, another widely popular language. While our current course (CS 2100: PDI1) covers object-oriented programming, and most object-oriented concepts can be achieved in Python, we know that some object-oriented concepts are better taught in Java, and they will be covered next semester instead. We will learn Python in a way that sets students up for success next semester by, for example, requiring types in the code.

<img width="1080" height="903" alt="Hello world meme" src="https://github.com/user-attachments/assets/e9978dc9-168e-4589-ac4b-266af17227c1" />
(Source: https://www.reddit.com/r/ProgrammerHumor/comments/64s93u/hello_world_oc)