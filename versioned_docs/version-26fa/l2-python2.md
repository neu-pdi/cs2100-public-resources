---
sidebar_position: 2
lecture_number: 2
title: Functions, Documentation, Pytest, and Data Types
---

# Functions, Documentation, Pytest, and Data Types

Poll: How can I swap the values of `x: int` and `y: int`?

a)
```python
temp: int = x
x = y
y = temp
```

b)
```python
temp: int = x
temp = y
y = x
```

c)
```python
temp: int = y
x = y
x = temp
```

d)
```python
temp: int = x
y = temp
x = y
```

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
import pytest


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
    if width < 0 or height < 0:
        raise ValueError("Rectangle dimensions cannot be negative")
    return width * height


def test_3_by_4() -> None:
    """3 by 4 rectangle"""
    assert get_area_of_rectangle(3, 4) == 12


def test_negative_area() -> None:
    """Make sure it raises a ValueError for a negative width"""
    with pytest.raises(ValueError):
        get_area_of_rectangle(-1, 4)


if __name__ == '__main__':
    pytest.main() # or just run `pytest` from the command line
```

The Python Docstring presented above follows the [NumPy Python Style](https://numpydoc.readthedocs.io/en/latest/format.html). There are other styles used in practice, [Google Python Style](https://google.github.io/styleguide/pyguide.html) is another popular option. We will **follow the NumPy style** presented above.

The unit test function names must start with `test_` in order for Pytest to recognize them.

Formatting the documentation in this way makes it so that it shows up in official places like `str.__doc__` and `help(str)`.

Notice that one of the tests makes sure that the function raises a ValueError if it's given an invalid argument.

## Data types

### Strings

Strings in Python can be represented using single quotes (`'cat'`) or double quotes (`"cat"`).

One way to represent a double quote in a string is to represent the string using single quotes, and vice versa:

- `'This is a double quote: "'`
- `"This is a single quote: '"`

We can also represent a literal double quote in the string using an escape sequence to indicate that it shouldn't end the string: `"This is a double quote: \""`

Here is a list of string escape sequences:

- `"\t"`    tab character
- `"\n"`    newline character
- `"\r"`    carriage return
- `"\""`    double quote character
- `"\'"`    single quote character
- `"\\"`    backslash character

#### String concatenation

- "Joseph" + "Aoun"
- "Joseph" + " " + "Aoun"
- We can multiply a string by an integer: "!" * 10

Poll: What does this print? `print("I am so excited" + "!" * 3)`

1. I am so excited! I am so excited! I am so excited!
2. I am so excited!I am so excited!I am so excited!
3. I am so excited!!!​
4. Nothing – it breaks

#### F-string​

We can put a variable directly in a string to save time.

```python
cats: int = 4
print(f"There are {cats} cats in this room."​)


>> There are 4 cats in this room.
```

It also helps reduce the number of places where a bug can happen in the code.

### Float

We've seen these types in the examples so far: `int`, `str`.

What if we want to represent a number that isn't an integer? Like 2.5? Then we use a `float`.

```python
num: float = 2.5
```

Tip: dividing any two numbers in Python results in a float -- even if the operands are `int`s, and the result has an integer value.
```python
print(type(4 / 2))

>> <class 'float'>
```

### Boolean

- Store the result of a yes-no question​
- Only 2 (legit) values: True and False
- We're assuming you've seen booleans before

```python
my_decision: bool = True
```

#### Some boolean operators
- Opposite
  - `not my_decision​`
- Comparisons: `<`, `<=`, `>`, `>=`, `==`, `!=`
  - `4 < 6`
- Conjunction uses `and`: both conditions must evaluate to true, for the full expression (conjunction) to result in true
  - `my_decision and your_decision`
- Disjunction uses `or`: if either/both conditions are true, the full expression (disjunction) results in true
  - `my_decision or your_decision`

### Order of operations

- Math order of operations:
  1. (Parentheses)
  2. Exponents
    - `4**2 * 3` evaluates to: `48`
  3. Multiplication/Division (left to right)
  4. Addition/Subtraction (left to right)
- Math happens before comparison operations
  - `7 < 2 + 8` evaluates to: `True`
- Comparison happens before boolean operations​
  - `3 < 4 and 5 < 7` evaluates to: `True`


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


def test_add_positive_numbers() -> None:
    """Test adding two positive numbers."""
    pytest.fail()

def test_add_negative_numbers() -> None:
    """Test adding two negative numbers."""
    assert add(-1, -1) == -2

def test_add_mixed_numbers() -> None:
    """Test adding a positive and a negative number."""
    assert add(-1, 1) == 0

def test_add_zero() -> None:
    """Test adding zero to a number."""
    assert add(0, 5) == 5
    assert add(5, 0) == 5
```

1. The student implemented `add()` incorrectly.
2. Mutation testing: the student's tests don't cover enough cases.
3. The student's tests fail on correct code, so mutation tests are not run.
4. It's something else -- pylint warnings, infinite loop, etc.
