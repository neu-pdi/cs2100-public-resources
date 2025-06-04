---
sidebar_position: 2
lecture_number: 2
title: Programming in Python
---

# Programming in Python

## Choose how to represent data

We've seen these types in the examples so far: `int`, `str`.

### Float

What if we want to represent a number that isn't an integer? Like 2.5? Then we use a `float`.

```python
num: float = 5.3
```

Tip: dividing any two numbers in Python results in a float -- even if the operands are integers, and the result is an integer.
```python
print(type(4 / 2))

<class 'float'>
```

### Boolean

- Store the result of a yes-no question​
- Only 2 (legit) values: True and False

```python
my_decision: bool = True
```

#### Some boolean operators
- Opposite
  - `not my_decision​`
- Comparisons: <, <=, >, >=, ==, !=
  - `4 < 6`
- And (both must be true to result in true)​
  - `my_decision and your_decision`
- Or (true if either/both are true)​
  - `my_decision or your_decision`

### None


## Use (non-generic) types in Python code

We started using types in our Python code since day one (last lecture). Here are two new types, which need to be imported:

```python
from typing import List, Set

nums: List[int] = [1, 2, 3]
words: Set[str] = {'hi', 'hello', 'howdy'}
```

## Select and implement appropriate control structures to reflect a problem

### Conditionals

#### If / else

Can put a conditional expression in one line: `print('yes' if my_decision else 'no'`

#### Match case statements

- Easier when there are many cases
- Finds the first case that matches​
- Only executes one case (or zero cases if none match and there is no `_` catch-all at the end)​

### Iteration

#### Iterating over numbers

#### Iterating over the elements of a collection

### Iterating over a collection, keeping track of indices

## Read and write data from files (text and image) and user input

## Import code

Note: When a Python file is imported, all the code inside it is run. That's why we put all of our code inside functions.

And we add this at the end of the file to run it:

```
if __name__ == '__main__':
    main()
```

A function called `main` should call all of the other functions used in the program.

## Choose variable names that fit naming conventions

## Understand the importance of a linter
