---
sidebar_position: 3
lecture_number: 3
title: More Programming in Python
---

## Autograders

### Mutation testing

## None

None works like a value that represents the absence of a value.

```python
bodyguard_name: str = None # doesn't have a value -- I don't have a bodyguard
```

It's different from "" or 0 (see [Null Island](https://en.wikipedia.org/wiki/Null_Island))

Can store `None` in a list​
```python
grades: List[int] = [5, None, 0]
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

## Constants

## Error handling
