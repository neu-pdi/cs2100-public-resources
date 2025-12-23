---
sidebar_position: 26
lecture_number: 26
title: "Hashing"
---

# Hashing

Recall from the previous lecture:
There is a protocol in Python for comparing objects using `<`, `>`, `==`, `!=`, `<=`, and `>=`. In order to use these comparison operators, we can implement these six methods:
- `__eq__(self, other: object) -> bool`: equals `==`
- `__ne__(self, other: object) -> bool`: not equals `!=`
- `__lt__(self, other: object) -> bool`: less than `<`
- `__le__(self, other: object) -> bool`: less than or equal to `<=`
- `__gt__(self, other: object) -> bool`: greater than `>`
- `__ge__(self, other: object) -> bool`: greater than or equal to `>=`

Not all six methods need to be implemented, since Python can derive some from others. Usually, it suffices to only implement `__eq__(self, other: object) -> bool` and one ordering method like `__lt__(self, other: object) -> bool`.
Unlike `Iterable` and `Iterator`, there is not a corresponding interface in the `abc` module for Comparable, likely because we rarely implement all six comparison methods.

Poll: What does this print?
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

print(course_oakland == course_boston)
```
1. True
2. False

Poll: How about now?
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course
        

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

print(course_oakland == course_boston)
```
1. True
2. False

## Hashing

If we try to add a `Course` to a `set`, it raises a `TypeError`.
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course
        

course_oakland = Course('CS', 2100)

courses: Set[Course] = {course_oakland}  # TypeError: unhashable type: 'Course'
```
And the same thing happens if you try to add it as a key in a `dict`.

That's because in order to put someting in a `set` or `dict`, it needs to follow the Hashable protocol.

The Hashable protocol requires that objects implement the method `__hash__(self) -> int`.

There is an interface in the `abc` module called `Hashable` which allows us to enforce that an object follows the Hashable protocol (and indicates to the reader that you intend to put that object in a `set` or `dict`).

### Why hashing?

When faced with the error `TypeError: unhashable type: 'Course'`, one could be tempted to instead just use a `list`, since `list`s don't require their elements to follow the Hashable protocol. But the problem is that `list`s are slower than `set`s in some situations. For example, when we check whether a `list` contains an item, in the worst case, it has to check every item before returning the answer:
```python
T = TypeVar('T')

def list_contains(item: T, list: List[T]) -> bool:
    """Returns True if the item is in the list, and False otherwise"""
    for element in list:
        if element == item:
            return True
    return False
```
There is syntax that makes the above code smaller, but it still needs to check every element. For very long lists, that will be a problem.

On the other hand, sets can check if they contain an item in _constant time_, which means that the amount of time does not depend on the length of the list.

Definitions:
- hash (verb): To map a value to an integer index
- hash table (noun): A list that stores elements via hashing
- hash set (noun): A set of elements stored using the same hash function
- hash function (noun): An algorithm that maps values to indexes

One possible hash function for integers: `i % length`

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   |   |   |   |   |   |   |   |   |   |

```python
set.add(11)  # 11 % 10 == 1
set.add(49)  #  49 % 10 == 9
set.add(24)  #  24 % 10 == 4
set.add(7)  #  7 % 10 == 7
```

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24|   |   | 7 |   | 49|

See any issues?

[dog hash collision gif](https://statics.memondo.com/p/99/gifs/2014/07/GIF_197384_a892292d75d74cc6b6e9143fd1091f80_ni_hablar_yo_quiero_lo_que_el_tiene.webm)
Source: https://m.vayagif.com/busqueda/0/el%20perro%20no%20nace%20agresivo/p/893

[cat collision gif](https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/25fa/collision.mp4)
[no collision](https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/25fa/no_collision.mp4)
Source: [Tyler Yeats](https://aeromancer.dev/)

<video width="320" height="240" controls>
  <source src="https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/25fa/collision.mp4" type="video/mp4"/>
</video>
<video width="320" height="240" controls>
  <source src="https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/25fa/no_collision.mp4" type="video/mp4"/>
</video>


- collision: When hash function maps 2 values to same index

```python
set.add(11)
set.add(49)
set.add(24)
set.add(7)

set.add(54)  # collides with 24
```
| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24|   |   | 7 |   | 49|

- collision resolution (noun): An algorithm for fixing collisions

- probing (verb): Resolving a collision by moving to another index
```python
set.add(11)
set.add(49)
set.add(24)
set.add(7)

set.add(54)  # spot is taken -- probe (move to the next available spot)
```
| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24| 54|   | 7 |   | 49|

- chaining (verb): Resolving collisions by storing a list at each index
  - add / search / remove must traverse lists, but the lists are short
  - impossible to "run out" of indexes

<img width="428" height="176" alt="Chaining" src="https://github.com/user-attachments/assets/e0df7716-7ac8-4227-bbfd-cdf00ea0e83d" />

Poll: Which of these can be done in constant time?
1. Checking if an element is in a set
2. Adding an element to a set
3. Removing an element from a set

4. Checking if a key is present in a map
5. Getting the value associated with a key in a map
6. Changing the value associated with a key in a map
7. Checking if a value appears in a map

### What makes a good hash code?

The `__hash__()` method should return an `int` which is relatively unique to that object, so that it can be used as an index in the hash table.

Rules for `__hash__()`:
- `__hash__()` must always return the same value for a given object
- If two objects are equal, then `__hash__()` must return the same value for them

Poll: Is this a legal hash function?
```python
    def __hash__(self) -> int:
        return 42
```
1. Yes
2. No

In addition to the rules for hash functions, there are some desired characteristics:
- We would like different objects to have different values
- The hash function should be quick to compute (ideally constant time)

Poll: Strings, numbers, and tuples are hashable by default in Python. Lists, sets, and dictionaries are not hashable by default in Python. Why might that be?
1. Because we rarely need to add lists, sets, or dictionaries to a set, or anything that requires hashing
2. Because lists, sets, and dictionaries are mutable, which could result in a changing hash code
3. Because lists, sets, and dictionaries are rarely equal to each other, so they don't need a hash code
4. Because lists, sets, and dictionaries can hold `None` in them, which shouldn't get a hash code

Let's add a good hash function to the `Course` class:
```python
from collections.abc import Hashable

class Course(Hashable):
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __str__(self) -> str:
        return f'{self.department}{self.course}'
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course

    def __hash__(self) -> int:
        return hash(str(self))
        

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

courses: Set[Course] = {course_oakland}
courses.add(course_boston)

print(courses)
```
```
{CS2100}
```
