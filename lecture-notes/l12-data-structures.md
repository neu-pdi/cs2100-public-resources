---
sidebar_position: 12
lecture_number: 12
title: More Data Structures
---

# Sets and Dictionaries

We have already worked with two data structures: Lists and Tuples. Both are ways to keep an ordered collection of elements, all of which are the same type[^1].
Recall from Lecture 9: a tuple is a lot like a list, but it's immutable: its contents cannot be changed after the tuple is initially created.

[^1]: Yes, Python allows us to put different types in the same List or Tuple, but it's discouraged, and MyPy blocks it for us.

## Sets

A set is very similar to a list: it is a collection of items.

```python
from typing import Set

words: Set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}

print(words)  # {'hi', 'hello', 'howdy'}
```

Differences between a set and a list:
- A set is unordered
- A set can only hold each item (at most) once -- no duplicates​

### Some set syntax

Creating a set:
```python
words: Set[str] = {'hi', 'hi', 'hello', 'hi', 'howdy', 'hi'}  # explicitly listing them

numbers: Set[int] = set(range(5))  # using the set constructor
print(numbers)  # {0, 1, 2, 3, 4}

list_of_floats: List[float] = [3.4, 3.2, 2.9, 3.4, 3.0]
measurements: Set[float] = set(list_of_floats)  # using the set constructor that takes an existing collection
print(measurements)  # {3.2, 3.0, 2.9, 3.4}
```

Adding and removing items, iterating over a set, and getting its size:
```python
nums: Set[float] = set()  # empty set

for i in range(100):
    random_float = round(random(), 2) # random float rounded to nearest hundredth
    nums.add(random_float)  # add it to the set

print(len(nums))  # print the size of the set

numbers: Set[int] = set(range(5))
numbers.remove(3)
print(numbers)  # {0, 1, 2, 4}
```

Binary set operations:
- Union (`a | b`): a set that has all elements that are in either set `a` or set `b`
- Intersection (`a & b`): a set that has all elements that are in both set `a` and set `b`
- Subset (`a <= b`): `True` if all elements in `a` are also in `b`, and `False` otherwise
  - Strict subset (`a < b`): `True` if `a <= b` **and `a` is not equal to `b`**, and `False` otherwise
- Subtraction (`a - b`): a set that has all elements in `a` that are not in `b`

```python
nums_a: Set[int] = set(range(1, 5))
nums_b: Set[int] = set(range(3, 9))

print(nums_a | nums_b)  # {1, 2, 3, 4, 5, 6, 7, 8}
print(nums_a & nums_b)  # {3, 4}
print(nums_a <= nums_b) # False
print(nums_a - nums_b)  # {1, 2}
```

Poll: Why is there no binary "Addition" operation for sets? (There is Subtraction.)
1. Because it would be the same as the Intersection operation
2. Because it would be the same as the Union operation
3. Because it would be the same as the Subtraction operation
4. There is an Addition operation

Exercise: Let's write a function that takes a `str` and counts the number of unique (distinct) words in it.

```python
def count_unique_words(text: str) -> int:
    return len(set(text.split()))

print(count_unique_words('hello hi hi hello howdy hi'))  # 3
```

Exercise: Let's write a function that checks if any two people in this room have the same birthday. It should have a loop that iterates (up to) 80 times. (Instructors should replace that number with the number of students in the room.) Each iteration, it should:
- Ask the user to input their birthday via two separate `int`s: the month and the day (ask twice to get the two `int`s)
- Store their birthday as a tuple
- If that birthday is already in the set, return `True`
- If not, add it to the set
After the loop (which it should only reach if no two people have the same birthday), it should return `False`.

```python
num_students: int = 80

def any_same_birthdays() -> bool:
    birthdays: Set[Tuple[int, int]] = set()

    for _ in range(num_students):
        month: int = int(input('Please enter the month as a number between 1 and 12: '))
        day: int = int(input('Please enter the day as a number between 1 and 31: '))
        date: Tuple[int, int] = (month, day)
        if date in birthdays:
            return True
        else:
            birthdays.add(date)

    return False
```

## Dictionaries

We use curly brackets (`{` and `}`) to represent sets. But we also use them to represent another data type:
```python
print(type({'hello'}))  # <class 'set'>
print(type({}))         # <class 'dict'>
```
Curly brackets, when empty (or non-empty, but formatted a specific way), denote a dictionary.

Exercise: Scrabble helper

### JSON

Poll: Which data structure is best suited for this task:
1. List
2. Tuple
3. Set
4. Dictionary
