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
- My health and well-being

These in-class exercises will be graded on completion, not correctness. (And there was no "correct answer" for that poll.)

Course structure:
- 3 lectures and 1 lab per week​
- ~ weekly homework assignments​
- Four quizzes and a final exam
- Office hours and the discussion board

### The AI Policy

AI coding assistants like Cursor and Windsurf are not allowed for this course. We believe that using an AI assistant is an important skill that should be covered _after_ the basics (which is why there is a different policy in CS 3100). Using AI assistants before covering the basics would be like using a calculator before a course on arithmetic -- it would undermine your ability to review and understand code.

AI large language models like ChatGPT and Claude are not allowed for assignment-related use. For example, you may not copy and paste (or otherwise enter) any part of the assignment instructions into the AI, and you may not take assignment solutions from it. You also may not paraphrase the assignment instructions to an AI, "only look" at an AI-generated solution before writing your own, or otherwise undermine your learning using AI. Things that violate the spirit of the policy (loopholes that are not explicitly mentioned) are also not allowed. If you have a question about whether something is allowed, we encourage you to ask an instructor, and you will not be penalized for asking. You may use AI language models for non-assignment-related things.

The exception is the AI overview that appears when using a search engine like Google. You may use a search engine to look up documentation, errors, concepts, etc. when doing assignments. You may read that AI overview.

Open ended poll: How do you feel about the AI policy?

## Locations of relevant resources

- [Pawtograder](https://app.pawtograder.com):
  - Office hours
  - Discussion board
  - Starting assignments (homework and labs)
  - Checking grades
- Git / GitHub: Submitting assignments
- [Lecture notes](https://neu-pdi.github.io/cs2100-public-resources)
- Textbook: "Python 3 Object Oriented Programming: Harness the Power of Python 3 Objects" by Dusty Phillips covers most of the object-oriented concepts relevant to this course, though we will not follow it exactly.

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

How to set up the VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. It looks like this: <img width="36" height="38" alt="Four squares, one of which is slanted" src="https://github.com/user-attachments/assets/883c178f-f0c0-4cd3-ba41-3e8b6948b20f" />
2. Search for and install "Pylint"


## Tracing Python code which includes types, and why it's important to keep track of the types

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

How to set up the VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. Search for and install "Mypy Type Checker"
2. Then, go to VSCode's Settings menu
   - Mac: `Code` > `Settings...` > `Settings`  (or `Cmd` + `,`)
   - Windows: `File` > `Preferences` > `Settings`  (or `Ctrl` + `,`)
4. Navigate to `Extensions` > `Mypy Type Checker`
5. In the `Args` section, add three args:
   - `--strict`
   - `--disallow-untyped-defs`
   - `--disable-error-code=empty-body`

<img width="911" height="278" alt="Screenshot showing specified args" src="https://github.com/user-attachments/assets/e6ce79ed-f56a-446c-afc3-c4f6205c35d7" />

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

## Given a problem that has a function-sized solution, write a solution including documentation and tests

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

## Why Python?

Many employers use Python extensively, and it is common to use Python in technical interviews. Its popularity has led to hundreds of thousands of Python packages available for public use. It's popular among data scientists, web developers, game developers, machine learning engineers, and many others. There are also many online resources for learning Python.

The next course in this sequence (CS 3100: PDI2) will use Java, another widely popular language. While our current course (CS 2100: PDI1) covers object-oriented programming, and most object-oriented concepts can be achieved in Python, we know that some object-oriented concepts are better taught in Java, and they will be covered next semester instead. We will learn Python in a way that sets students up for success next semester by, for example, requiring types in the code.

<img width="1080" height="903" alt="Hello world meme" src="https://github.com/user-attachments/assets/e9978dc9-168e-4589-ac4b-266af17227c1" />
(Source: https://www.reddit.com/r/ProgrammerHumor/comments/64s93u/hello_world_oc)
