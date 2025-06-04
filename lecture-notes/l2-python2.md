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

### None


## Use (non-generic) types in Python code

We started using types in our Python code since day one (last lecture). Here are two new types, which need to be imported:

```python
from typing import List, Set

nums: List[int] = [1, 2, 3]
words: Set[str] = {'hi', 'hello', 'howdy'}
```

## Select and implement appropriate control structures to reflect a problem

Iteration, conditionals

## Read and write data from files (text and image) and user input

## Understand what it means to import code

And why we do:

```
if __name__ == '__main__':
    main()
```

## Choose variable names that fit naming conventions

## Understand the importance of a linter
