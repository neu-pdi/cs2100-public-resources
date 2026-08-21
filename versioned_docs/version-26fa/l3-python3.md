---
sidebar_position: 3
lecture_number: 3
title: More Programming in Python
---

# More Programming in Python

## Mutation testing: how we grade your tests

A lot of work is autograded in this course, including the tests.

We grade student tests by checking that they:
1. Pass on correct code
2. Fail on incorrect code

In our autograder, the first item is required before it moves on to the second item. I.e., tests must first pass on correct code before we check whether they fail on incorrect code.

Checking whether tests fail on incorrect code is a standard software engineering technique called "Mutation testing": programmers insert small, common bugs into their code and check whether the tests catch them.

You are not required to perform your own mutation testing in this course, but your assigmnment submissions must pass our mutation tests.

Disclaimer: All bugs that we inserted into the incorrect code are intended to be simple and common. If the autograder says there is a bug that remains undetected by your tests, look for large missing test cases, rather than digging into obscure ways code can run incorrectly.

Poll: Why is this assignment submission not receiving full points?

```python
def add(a: int, b: int) -> int:
    """Returns the sum of two integers."""
    return a + b

class TestAddFunction(unittest.TestCase):
    """Unit tests for the add function."""

    def test_add_positive_numbers(self) -> None:
        """Test adding two positive numbers."""
        self.fail()

    def test_add_negative_numbers(self) -> None:
        """Test adding two negative numbers."""
        self.assertEqual(add(-1, -1), -2)

    def test_add_mixed_numbers(self) -> None:
        """Test adding a positive and a negative number."""
        self.assertEqual(add(-1, 1), 0)

    def test_add_zero(self) -> None:
        """Test adding zero to a number."""
        self.assertEqual(add(0, 5), 5)
        self.assertEqual(add(5, 0), 5)
```

1. The student implemented `add()` incorrectly.
2. Mutation testing: the student's tests don't cover enough cases.
3. The student's test fails on correct code, so mutation tests are not run.
4. It's something else -- pylint warnings, infinite loop, etc.

## None

None works like a value that represents the absence of a value.

```python
bodyguard_name: str = None # doesn't have a value -- I don't have a bodyguard
```

It's different from "" or 0 (see [Null Island](https://en.wikipedia.org/wiki/Null_Island))

Can store `None` in a list​
```python
grades: list[int] = [5, None, 0]
```

Cannot add `None` to a number or string
- `None + "hi"` does not work
- `len(None)` does not work​

## Optional

To specify that a type might be `None`, we use `Optional`. For example:
```python
from typing import Optional

def get_number_or_None(hopefully_a_number: str) -> Optional[int]:
    try:
        return int(hopefully_a_number)
    except ValueError:
        return None
```

## Data structures (list, set, and dict)

We will have lectures dedicated to lists and sets later on, but here is the basic syntax to create them:

```python
nums: list[int] = [1, 2, 3]
words: set[str] = {'hi', 'hello', 'howdy'}
```

We're assuming you have used lists before. Sets may be new to some.

A set is very similar to a list: it is a collection of items.

Differences between a set and a list:
- A set is unordered
- A set can only hold each item (at most) once -- no duplicates​

## Reading and writing text files

Just as we can read user input using `input(prompt)`, we can also read input from a file:

```python
with open('story.txt', 'r', encoding="utf-8") as file:
    for line in file.readlines():
        print(line)
```

The `readlines()` function returns a list of strings: each line in the file is a string in the list.

If, instead of reading from the file, we want to write to the file, then we must use a different option than `'r'`.

- `open('story.txt', 'r')`: read the file
- `open('story.txt', 'w')`: write the file (overwrite it if it already exists)
- `open('story.txt', 'a')`: append to the end of the file (and create the file if it doesn't exist)

We can then write to the file using `file.write("Line to write to file")`.

## Error handing

There is a control structure that we have not introduced until now: try / except

```python
a: int = 4
b: int = 0

try:
    result = a / b
    print(result)
except ZeroDivisionError:
    print("Cannot divide by zero")
```

It allows us to try to run risky code, and if an error is raised during that risky code, then it jumps immediately to the corresponding `except` block.

It is acceptable to use try / except blocks while testing *whether a function raises an error*: it is an alternative to using the built-in `self.assertRaises()`.

Otherwise, we try to minimize the use of try / except, and only use it when absolutely necessary. We don't want to simply avoid fixing legitimate bugs by wrapping our code in a try / except.

Places where try / except is commonly used:

- Converting values
```python
def get_user_age() -> int:
    """Get a numerical age from the user"""
    user_input: str = input("Enter your age: ")
    try:
        age: int = int(user_input)
        return age
    except ValueError:
        print("Please enter a valid number")
        return -1
```
- Operations that rely on external things like network requests or database operations
- Reading from files (though using a `with` block, as we have been doing, is recommended instead)

Keywords in a try / except block:
- Each error that can be raised should get its own `except` block. It is okay to have multiple `except` blocks for the same `try` block.
- One `except` block can handle multiple errors, if they require the same process: `except (ValueError, TypeError) as e:`
- Inside an `except` block, we may choose to `raise` a different error.
- If there is a `finally` block at the end of a try / except block, then it is run in all cases (whether the `try` was fully executed, or it jumped to the `except`.
- If there is an `else` block at the end of a try / except block, then it is run only if the `try` was fully executed (and it never jumped to an `except` block

Best practices:
- Only use try / except for the few legitimate reasons, not for control flow of the program
- Make the errors handled in `except` blocks as specific as possible. It is okay to list multiple specific errors in the same `except` block.


Poll: What is output?
```python
def noodle(hopefully_a_number: str) -> None:
    try:
        num: int = int(hopefully_a_number)
        print('Cats rule')
    except AssertionError as e:
        print(f'{hopefully_a_number} is not a number')

noodle('hello')
```

1. Cats rule
2. hello is not a number
3. Cats rule
   hello is not a number
4. No output - it raises the error


Poll: What is output?
```python
def noodle(hopefully_a_number: str) -> None:
    try:
        num: int = int(hopefully_a_number)
        print('Cats rule')
    except ValueError as e:
        print(f'{hopefully_a_number} is not a number')

noodle('hello')
```

1. Cats rule
2. hello is not a number
3. Cats rule
   hello is not a number
4. No output - it raises the error
