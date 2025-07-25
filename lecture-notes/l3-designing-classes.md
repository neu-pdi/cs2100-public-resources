---
sidebar_position: 3
lecture_number: 3
title: Designing Classes
---

# Designing Classes

Inspiration: "nouns" in the real world (versus "verbs" which are functions)

Classes encapsulate data and code. ​They achieve abstraction by masking details of implementation. (e.g., like how we push a button/turn a key to start a car without knowing how exactly it works)

Another way to think about a class is a way to create a new type.

Here are some classes that are built in to Python (types that we already use):

| Class (data type) | Object (an instance of a class) |
| ----------------- | ------------------------------- |
| str | word = "hello" |
| list | items = [1, 2, 3] |

## How to make your own class: attributes, methods, and constructor
## Organize tests using unittest.TestCase
## Identify test cases and implement them as unit tests
## Write well-named and organized tests which help the reader understand the purpose of a function
## Use setup and cleanup
## Handle mutable state in tests

### Aside #1 about mutability: alias vs. copy

Given an object, an alias is simply another reference to the same object (same place in the computer's memory).
A copy is another object (different place in the computer's memory) that has the same elements and looks exactly the same.

```python
original = [1, 2, 3]

alias = original
copy = original.copy()

original[2] = 90

print(alias) # [1, 2, 90]
print(copy) # [1, 2, 3]
```

### Aside #2 about mutability: passing mutable objects as arguments

If we pass an object as an argument to a function, an _alias_ is created, not a copy.

```python
def sum_with_bad_manners(in_list: List[int]) -> int:
    sum: int = 0
    while (len(in_list) > 0):
        sum += in_list.pop()
    return sum


my_list = [1, 2, 3, 4]
print(f'Sum: {sum_with_bad_manners(my_list)}') # Sum: 10
print(my_list) # []
```

Good manners: Functions should always leave their args unchanged

## Use try/accept safely
