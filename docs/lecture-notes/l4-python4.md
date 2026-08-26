---
sidebar_position: 4
lecture_number: 4
title: Text Files and User Input
---

# Text Files and User Input

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

## Testing functions that print or take user input

We've been using the `input('prompt')` function which returns the user's response to the provided `'prompt'`. We've also been `print()`ing things.

To make testing practical, we can't rely on the user to type in `input()`, and we don't want to rely on them to check the printed output to verify things that were `print()`ed.

So, instead, we "mock" the user. The `unittest` module is great for this -- it can imitate a user typing things, and it can read the output that would have been printed to the console.

<img width="600" height="417" alt="image" src="https://github.com/user-attachments/assets/fb8b3f7a-8e3b-4bd7-8086-1ebf16c8d1df" />

Source: https://en.meming.world/wiki/Mocking_SpongeBob

### Tests that mock user input

To make a test function "mock" a user typing in inputs, we use `@patch('builtins.input', side_effect=user_inputs)`, replacing `user_inputs` with an array of things that the mock user should type.

Here is an example testing a function that takes three inputs from the user and returns them, concatenated with commas:

```python
import pytest
from unittest.mock import patch, Mock


def concat_three_inputs() -> str:
    """Reads three inputs from the user and concatenates them into a single string separated by spaces."""
    inputs = []
    for _ in range(3):
        user_input = input("Enter something: ")
        inputs.append(user_input)
    return ', '.join(inputs)


@patch('builtins.input', side_effect=['first thing typed by user', 'second thing', 'third thing'])
def test_concat_three_inputs(_: Mock) -> None:
    """Test that concat_three_inputs correctly concatenates three user inputs."""
    result = concat_three_inputs()
    assert result == 'first thing typed by user, second thing, third thing'
```

Notice the `_: Mock` argument to the test function.

This example replaces the built-in `input()` function with a different `input()` function that returns the three strings listed as "side effects" instead of real user input.

Note: If there are not enough inputs specified in the `side_effect` array, the call to `input()` will wait forever (until it times out).

### Tests that mock console output

We use `@patch('builtins.print')` to mock things being printed to the console, and then we make assertions on that printed output inside the test function.

```python
import pytest
from unittest.mock import patch, Mock

def repeat_three_inputs() -> str:
    """Reads three inputs from the user and prints them."""
    for _ in range(3):
        user_input = input("Enter something: ")
        print(user_input)


@patch('builtins.input', side_effect=['first thing typed by user', 'second thing', 'third thing'])
@patch('builtins.print')
def test_repeat_three_inputs(mock_print: Mock, _: Mock) -> None:
    """Test that repeat_three_inputs correctly reads and prints three inputs."""
    repeat_three_inputs()
    expected_calls = [
        unittest.mock.call("first thing typed by user"),
        unittest.mock.call("second thing"),
        unittest.mock.call("third thing"),
    ]
    mock_print.assert_has_calls(expected_calls)
```

Notice the order of the two `Mock` arguments to the test function: `@patch` decorators "stack" such that the first decorator is the last argument, and vice versa.
Since we don't use the mock input's argument inside the test function, we name it using `_`.

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

It is acceptable to use try / except blocks while testing *whether a function raises an error*: it is an alternative to using `pytest.raises()`.

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
