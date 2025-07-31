---
sidebar_position: 25
lecture_number: 25
title: "Interfaces: Iterator, Iterable, and Comparable"
---

# Interfaces: Iterable, Iterator, and Comparable

## Iterable

We can iterate over collections and `str`s using `for` loops, but we can't iterate over `int`s:
```python
for letter in 'hello':
    print(letter)

for digit in 12345:  # TypeError: 'int' object is not iterable
    print(digit)
```

That's because `str` and collections like `List` follow the Iterable protocol, and `int`s don't.

Any object that follows the Iterable protocol can be iterated over. The Iterable protocol only requires one method: the object must implement the `__iter__()` method, which returns an an object that follows the _Iterator_ protocol. (Emphasis on the "tor" part)

There is a corresponding `Iterable` ("ble") interface in the `ABC` module which helps make it clear to the reader that an object is iterable ("ble"):
```python
from collections.abc import Iterable

class Calendar(Iterable[str]):
    def __init__(self, days: List[str]):
        self.days = days
    
    def __iter__(self) -> Iterator[str]:
        """Returns an iterator over the lecture days this week"""
        return iter(self.days)

lecture_days = Calendar(['Monday', 'Wednesday', 'Thursday'])

for lecture in lecture_days:
    print(lecture)
```
```
Monday
Wednesday
Thursday
```

The type that goes inside the brackets in `Iterable[str]` and `Iterator[str]` is the type that will be returned one-by-one when iterating. This iterator yields one `str` at a time, so `str` goes in the brackets.

Great! We can now create objects that can be iterated over.

The `for` loop calls the object's `__iter__()` method, which returns `iter(collection)`, which is an iterator ("tor") over a collection. Luckily, Python already has existing iterators ("tor") for `List`, `Set`, `Tuple`, `Dict`, etc.

But what if you want to iterate over your collection in a different way, which is different from the built-in iterator ("tor")? Then your iterable's ("ble") `__iter__()` method will have to return your own custom iterator ("tor").

There is an Iterator protocol in Python, which is enforced by the `ABC` module's `Iterator` ("tor") interface.
```python
from collections.abc import Iterable, Iterator

class Calendar(Iterable[str]):
    def __init__(self, days: List[str]):
        self.days = days
    
    def __iter__(self) -> Iterator[str]:
        """Returns an iterator that returns every other day this week"""
        return AlternatingDayIterator(self.days)

class AlternatingDayIterator(Iterator[str]):
    def __init__(self, days: List[str]):
        self.days = days
        self.index: int = 0
    
    def __next__(self) -> str:
        if self.index >= len(self.days):
            raise StopIteration
        
        value = self.days[self.index]
        self.index += 2
        return value

days = Calendar(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])

for alternating_day in days:
    print(alternating_day)
```
```
Monday
Wednesday
Friday
```
This iterator yields every other day, alternating, rather than returning each day.

The iterator protocol requires two methods:
- `__next__(self) -> T`: returns the next value in the sequence, or raises `StopIteration` if there are no more values left to iterate through
- `__iter__(self) -> Iterator[T]`: returns the iterator object itself

You'll notice that when we use the `ABC` module's `Iterator` interface, it works without us implementing that second method `__iter__(self) -> Iterator[T]`. That's because it is already implemented in the `Iterator` interface, and we inherit it when we do `class AlternatingDayIterator(Iterator[str])`. Like with anything inherited, we can overwrite it if we want (though we rarely need to).

Exercise: If we pass a `min` which is bigger than a `max`, there is no output:
```python
for i in range(5, 2):
    print(i)
```
Let's write our own version called `Range` (with a capital R) that works forwards or backwards. Our version will require a `start` and a `stop`, with an optional `step`.

```python
class Range(Iterable[int]):
    def __init__(self, start: int, stop: int, step: int = 1):
        self.start = start
        self.stop = stop
        self.step = step
    
    def __iter__(self) -> Iterator[int]:
        if self.start < self.stop:
            return iter(range(self.start, self.stop, self.step))
        else:
            return BackwardsIter(self.start, self.stop, self.step)

class BackwardsIter(Iterator[int]):
    def __init__(self, start: int, stop: int, step: int = 1):
        self.start = start
        self.stop = stop
        self.step = step
        self.current = start
    
    def __next__(self) -> int:
        if self.current <= self.stop:
            raise StopIteration
        value = self.current
        self.current -= self.step
        return value


for i in Range(10, -6, 3):
    print(i)
```
```
10
7
4
1
-2
-5
```

Poll: In a `for` loop using the built-in `range()`, what happens if a client passes in a `min` which is bigger than the `max`?
1. Python doesn't allow it because it will iterate forever
2. Python doesn't allow it because it would raise a `StopIeration` before iterating even once
3. There is no output because it raises a `StopIteration`, which is caught by the `for` loop's internal workings
4. It will work as expected, and the loop will count down from the `min` to the `max`

|  | Iterable | Iterator |
| - | - | - |
| Protocol's required methods | `__iter__(self) -> Iterator[T]`: returns an iterator | `__next__(self) -> T`: returns the next element or raises `StopIteration` <br /> `__iter__(self) -> Iterator[T]` : returns itself |
| `abc` interface's required methods | `__iter__(self) -> Iterator[T]` (same as protocol) | `__next__(self) -> T` (same as protocol) <br /> not `__iter__(self) -> Iterator[T]` because it's aleady there |

### Modifying things while iterating over them

#### Lists

It is possible, though confusing, to modify a list while iterating over it:
```python
nums: List[int] = [1, 2, 3]
for i in nums:
    print(f'Element: {i}')
    print(f'Removing {nums.pop(0)}')
    print(f'List: {nums}\n')
```
```
Element: 1
Removing 1
List: [2, 3]

Element: 3
Removing 2
List: [3]

```
Since we removed 1, the indices of the remaining numbers shifted down by one. Since the iterator stayed at the same index, that made it skip an element.

For this reason, modifying list while iterating over it is discouraged. Instead, we encourage iterating over a copy of it, or using list comprehension:
```python
nums: List[int] = [1, 2, 3]
for i in nums.copy():  # iterating over a copy
    print(f'Element: {i}')
    print(f'Removing {nums.pop(0)}')
    print(f'List: {nums}\n')

more_nums: List[int] = [1, 2, 3, 4, 5, 6]
even = [i for i in more_nums if i % 2 == 0]  # list comprehension
print(even)
```
```
Element: 1
Removing 1
List: [2, 3]

Element: 2
Removing 2
List: [3]

Element: 3
Removing 3
List: []

[2, 4, 6]
```

#### Sets and dictionaries

Modifying a set or a dictionary while iterating over it will result in a `RuntimeError`.

```python
nums = {1, 2, 3, 4, 5}
for item in nums:
    nums.add(600)  # RuntimeError
```

```python
my_dict = {'a': 1, 'b': 2, 'c': 3}
for key in my_dict:
    my_dict['d'] = 4  # RuntimeError
```

Just like with lists, iterating over a copy or using list comprehension are viable alternatives.

Poll: Though it's discouraged, and the linter complains about it, we can directly call the `__iter__()` method in any iterable object, and the `__next__()` method in any iterator object. What happens if we iterate through all items in the collection, and then call `__next__()` after that?
```python
iterator: Iterator[int] = range(5).__iter__()
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
```
1. `__next__()` returns `None`
2. It goes back to the beginning and iterates through the collection again
3. It raises a `RuntimeError`
4. It raises a `StopIteration`

## Comparable

<!--
Benefits of using the interface Comparable
Implement a class which uses the Comparable interface
Sort a list of Comparable objects
-->
