---
sidebar_position: 1
lecture_number: 1
title: Course Overview and Python
---

# Course Overview and Python

## Understand the structure of this course and its learning outcomes, and expectations for students

## See the locations of relevant resources

## Describe the purpose of our practices for code-level design (style guidlines)

- Helps other people to more easily understand / contribute to existing software
- Companies have conventions that dictate the style of how code is written ​
- "Official" Python style guide: [https://peps.python.org/pep-0008](https://peps.python.org/pep-0008/)

## Trace Python code which includes types, and understand why it's important to keep track of the types

### MyPy Setup

MyPy's documentation can be found at [https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker)

How to set up the VSCode extension:

1. In VSCode, go to the "Extensions" tab on the left. Search for and install "Mypy Type Checker"
2. Then, go to VSCode's Settings menu
   - Mac: `Code` > `Settings...` > `Settings`  (or `Cmd` + `,`)
   - Windows: `File` > `Preferences` > `Settings`  (or `Ctrl` + `,`)
4. Navigate to Extensions > Mypy Type Checker
5. In the Args section, add two args:
   - --strict
   - --disallow-untyped-defs

Now, any missing or mismatched types will be reported in the "Problems" tab (next to "Output" and "Debug Console").

If MyPy is set up properly, then this code:

```
def add(num1: int, num2) -> int:
    return num1 + num2

result: str = add(3, 'hi')
```

should result in three errors: `num2`'s missing type, `add()`'s returning something other than the promised `int`, and `result`'s value being an `int` when the variable type is `str`.

## Given a problem that has a function-sized solution, write a solution including documentation and tests

## Describe the reasons why Python is popular, and what it mean to "run" Python code
