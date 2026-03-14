---
sidebar_position: 31
lecture_number: 31
title: The Decorator and Strategy Patterns
---

# The Decorator and Strategy Patterns

## Strategy Pattern

You are using the Strategy pattern in Homework 8 without knowing it.

### Defining distance

One part of the analysis for Homework 8 is about defining the distance between train stations. There is the basic measure of Euclidean distance, which we use in the code, but there are many more definitions of distance.

For example, we could say, "the station is 15 minutes from here," and that would be a meaningful distance. In that case, we would be defining the distance as the number of minutes it takes to travel between the two nodes.

We also explore defining the distance between two stations as the financial cost of building the track between them (which is bigger if we have to dig a tunnel underwater or through a mountain), or defining it as as `1/n`, where `n` is the number of passengers who regularly travel between the two stations.

### Strategy Pattern

So, we have many definitions of distance, and the same algorithm can use any of these distance definitions.

Suppose we want to write an algorithm to find the shortest path between two physical locations, but using a definition of distance that is chosen by the user at run time. For example, the user might choose that they want the path that takes the least time, or the one that makes the fewest greenhouse gas emissions. To efficiently write a program that performs the algorithm to solve this problem, we need to allow the definition of distance to be chosen at runtime. The Strategy Pattern solves this problem.

The Strategy Pattern (also known as the Duration Pattern) allows us to choose an algorithm at runtime.

Example: Strategies for playing Tic Tac Toe
- Place a third piece in a row to win
- Block the opponent if they're about to win
- Place in an open corner
- Place in any open square
The strategy for choosing a place changes based on the game state.

Example: maps directions
- Shortest path
- Shortest time
- Least emissions
- Least tolls
- Maximize sightseeing
The user chooses the path-finding algorithm at runtime.

<img width="780" height="476" alt="Strategy UML" src="https://github.com/user-attachments/assets/4625cc87-ec7f-45aa-b5c7-4c404c7b510e" />

Poll: How could the Strategy Pattern be used to define multiple definitions of distance in Homework 8 (public transportation MST)?

1. Ignore the distances between stations when building the train track system (assume all stations are equidistant)
2. Take user input to choose between multiple existing implementations of the `distance()` function (which returns the distance between two stations)
3. Take user input to choose between multiple existing implementations of Kruskal's Algorithm (which builds a Minimum Spanning Tree)
4. After the train track system is built, allow passengers to choose where they want to travel using the trains.

<!-- Poll: Why do we use composition to hold the Strategy (instead of inheritance through subclasses)?
1. Because subclasses of the Strategy class would not work properly
2. Using inheritance would require methods to copy over the history when we switch strategies (it would need a method for every possible pair of strategies)
3. When we invent a new Strategy, if we were using inheritance, we would need to write methods to copy over the history to/from that new Strategy
4. Um actually, we do use inheritance to extend the Strategy, not composition to hold it​

Example: There are many algorithms to sort a list. One of the most efficient, especially for long lists, is called [Merge Sort](https://en.wikipedia.org/wiki/Merge_sort#/media/File:Merge-sort-example-300px.gif).
The only time when Merge Sort is not the most efficient is when the length of the list is short (fewer than, say, 30 elements). For short lists, [Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort#/media/File:Insertion_sort.gif) is more efficient.

Insertion Sort: Insert each element into the right position in the list s.t. it's sorted
- O(n^2)

Merge Sort:
1. Split the list in half
2. Sort each half (recursion)
3. Merge the two halves together
- O(n log n)​

​Merge Sort is usually faster, but Insertion Sort is faster for short lists ( < 30).

Here, the `AdaptiveSorter` chooses the correct sorting strategy based on the length of the list.
Let's step through it with the debugger:
```python
from abc import ABC, abstractmethod
from typing import TypeVar, Protocol, Optional

T = TypeVar('T')

class Comparable(Protocol):
    """Ensures that generic objects can be compared with < operator."""
    @abstractmethod
    def __lt__(self: T, other: T) -> bool:
        """Return True if self is less than other."""
        pass
    @abstractmethod
    def __le__(self: T, other: T) -> bool:
        """Return True if self is less than or equal to other."""
        pass
    @abstractmethod
    def __gt__(self: T, other: T) -> bool:
        """Return True if self is greater than other."""
        pass
    @abstractmethod
    def __ge__(self: T, other: T) -> bool:
        """Return True if self is greater than or equal to other."""
        pass

# Use the Comparable protocol with a generic TypeVar
CT = TypeVar("CT", bound=Comparable)

class SortingStrategy(ABC):
    """Interface for sorting strategies."""
    
    @abstractmethod
    def sort(self, data: list[CT]) -> list[CT]:
        """Return a sorted version of the original list."""
        pass

class InsertionSortStrategy(SortingStrategy):
    """Insertion sort strategy - efficient for small lists."""
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort using insertion sort algorithm."""
        if len(data) <= 1:
            return data.copy()
        
        result = data.copy()
        for i in range(1, len(result)):
            key = result[i]
            j = i - 1
            # Move elements greater than key one position ahead
            while j >= 0 and key < result[j]:
                result[j + 1] = result[j]
                j -= 1
            result[j + 1] = key
        
        return result

class MergeSortStrategy(SortingStrategy):
    """Merge sort strategy - efficient for large lists."""
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort using merge sort algorithm."""
        if len(data) <= 1:
            return data.copy()
        
        return self._sort(data.copy())
    
    def _sort(self, arr: list[CT]) -> list[CT]:
        """Recursive merge sort implementation."""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2

        left = self.sort(arr[:mid])
        right = self.sort(arr[mid:])
        
        return self._merge(left, right)
    
    def _merge(self, left: list[CT], right: list[CT]) -> list[CT]:
        """Merge two sorted lists."""
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        
        # Add remaining elements
        result.extend(left[i:])
        result.extend(right[j:])
        
        return result

class AdaptiveSorter(MergeSortStrategy):
    """Sorter that chooses strategy based on list size."""
    
    def __init__(self, fallback_strategy: Optional[SortingStrategy] = None, threshold: int = 30):
        self.threshold = threshold
        if fallback_strategy is not None:
            self.fallback = fallback_strategy
        else:
            self.fallback = InsertionSortStrategy()
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort the data using the appropriate strategy."""
        if len(data) < self.threshold:
            return self.fallback.sort(data)
        else:
            return super().sort(data)
        

# Example usage
if __name__ == "__main__":
    # Small list (insertion sort)
    small_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"Small list: {small_list}")
    
    sorter = AdaptiveSorter()
    sorted_small = sorter.sort(small_list)
    print(f"Sorted small list: {sorted_small}")
    
    # Large list (merge sort)
    large_list = list(range(50, 0, -1))  # [50, 49, 48, ..., 1]
    print(f"\nLarge list: {large_list[:10]}... (50 elements)")
    
    sorted_large = sorter.sort(large_list)
    print(f"Sorted large list: {sorted_large[:10]}... (first 10 elements)")
``` -->


## Function Decorators

We have already seen some decorators:
- `@property` (to create a property named after the method)
- `*.setter` (to give that property a "setter" method)
- `@classmethod` (for `setUpClass(cls)` and `tearDownClass(cls)` to run once before / after unit testing)

In this lecture, we will find out how these decorators were implemented, and how we can create our own decorators.

## Functions are objects that can be mutated

As we already know, in Python, [functions are objects](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l15-design-data1#functions-are-objects).
We can reference them using variables, store them in lists, and pass them as arguments to other functions:
```python
from typing import Callable

def double(num: int) -> int:
    return num * 2

def triple(num: int) -> int:
    return num * 3

functions: list[Callable[[int], int]] = [double, triple]

def apply_functions(num: int) -> list[int]:
    return [func(num) for func in functions]

print(apply_functions(5))  # [10, 15]
```

## Creating a function decorator

A function decorator is a way to mutate a function to modify what it does.

For example, let's create a decorator called `@time_calls` that modifies a given function to print the time it took to run it like this:
```python
@time_calls
def multiply_list(nums: list[int], multiplier: int = 1) -> list[int]:
    return [num * multiplier for num in nums]

print(multiply_list([i for i in range(5)], multiplier = 3))
```
Because we modified `multiply_list()` to do what `@time_calls` tells it to do, this is the printed output:
```
Executed multiply_list with ([0, 1, 2, 3, 4],) and {'multiplier': 3} in 7.152557373046875e-06ms
[0, 3, 6, 9, 12]
```

This is how we created the `@time_calls` decorator to work like that:
```python
def time_calls(func: Callable[..., Any]) -> Callable[..., Any]:
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        now = time.time()
        return_value = func(*args, **kwargs)
        print(f'Executed {func.__name__} with {args} and {kwargs} in {time.time() - now}ms')
        return return_value
    return wrapper
```
We defined a function called `time_calls()` that takes a function as its argument and returns a function.

The function that it returns is a modified version of the function that is passed to it as an argument.

That modification is that, in addition to running the passed function as usual, it prints the number of milliseconds that it took to run it.

All that is needed for the `@time_calls` decorator to work is this definition of the `time_calls()` function (somewhere in the file before the decorator is used).

Poll: What does the `@mystery` decorator do?
```python
T = TypeVar('T')

def mystery(func: Callable[[float], T]) -> Callable[[float], T]:
    def wrapper(x: float) -> T:
        if x < 0:
            raise ValueError("Argument must be positive")
        return func(x)
    return wrapper

@mystery
def square_root(x: float) -> Any:
    return x ** 0.5

print(square_root(9))
```
1. Modifies the function to print the number of milliseconds it took to run it
2. Modifies the function such that it raises a `ValueError` if the argument is negative
3. Modifies the function to run it twice
4. Nothing

## A common use of decorators: caching / memoization

Memoization, or caching, is temporarily storing values that are recalculated often (so they only need to be calculated once).
For example, consider the function where we find the nth Fibonacci number:
```python
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
In order to calculate the 5th Fibonacci number, we need to calculate the 4th and 3rd ones.
And to calculate the 4th number, we need to calculate the 3rd and 2nd ones.
And to calculate the 3rd number, we need to calculate the 2nd and 1st ones...
There are a lot of recalculated numbers here.

So, let's write some code that stores each Fibonacci number _the first time it is calculated_, so that each subsequent time, we can just look it up rather than recalculating it.

(Write this example together, then step through it with the debugger)
```python
R = TypeVar('R')

def memoize(func: Callable[..., R]) -> Callable[..., R]:
    cache: dict[tuple[Any, ...], R] = {}
    def wrapper(*args: Any) -> R:
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

Poll: Can we re-use the `@memoize` decorator to perform memoization for other functions in the same file?
1. Yes
2. Yes, but that other function would share the "cache" of stored values, which are specific to Fibonacci
3. No, it would not run

Easiest way to test this: create a duplicate method called `fibonacci2()`, decorate it, call it after the regular `fibonacci()`, and step through it in the debugger.

<!-- ## Preserving function metadata

Functions have metadata such as their name and docstring:
```python
def double(num: int) -> int:
    """Doubles a number."""
    return num * 2

print(double.__name__)  # double
print(double.__doc__)   # Doubles a number.
```

When we create a decorator that "wraps" a function within another function, its metadata is overwritten by the wrapper's metadata:
```python
def my_decorator(func: Callable[..., Any]) -> Callable[..., Any]:
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print("Before calling function")
        result = func(*args, **kwargs)
        print("After calling function")
        return result
    return wrapper

@my_decorator
def double(num: int) -> int:
    """Doubles a number."""
    return num * 2

print(double.__name__)  # wrapper
print(double.__doc__)   # None
```

Luckily, the `functools` module has an easy fix: the `@wraps` decorator.
The `@wraps` decorator takes the metadata from the passed function, and copies it to the wrapper function:
```python
from functools import wraps

def my_decorator(func: Callable[..., Any]) -> Callable[..., Any]:
    @wraps(func)  # This copies func's metadata to wrapper
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print("Before calling function")
        result = func(*args, **kwargs)
        print("After calling function")
        return result
    return wrapper

@my_decorator
def double(num: int) -> int:
    """Doubles a number."""
    return num * 2

print(double.__name__)  # double
print(double.__doc__)   # Doubles a number.
```

Poll: Why do we use `wraps` from the `functools` package?
1. To copy the metadata from the original (un-decorated) function to the wrapper function that decorates it
2. To copy the metadata from the decorating wrapper function to the original (un-decorated) function
3. To make it so we can use a function as a decorator with the `@` symbol
4. `wraps` is like a type hint: it doesn't do anything and isn't enforced in Python by default -->

<!-- ## Class decorators

_Function_ decorators are popular in Python.
However, _class_ decorators are more popular in other languages including Java.

A _class_ decorator is also a decorator that uses the `@` symbol. The only difference is that it decorates a class instead of a function.

Here is an example where we create a class decorator called `@add_logging` that modifies a class's `__init__()` to add a `print()` statement for logging.
(Note that we create the `HasInit` protocol to ensure that we only use the `@add_logging` decorator on classes that have an `__init__()`.)
```python
class HasInit(Protocol):
    def __init__(self, *args: Any, **kwargs: Any) -> None: ...

C = TypeVar('C', bound=HasInit)

def add_logging(cls: Type[C]) -> Type[C]:
    original_init = cls.__init__
    
    @wraps(original_init)
    def new_init(self: Any, *args: Any, **kwargs: Any) -> None:
        print(f"Creating instance of {cls.__name__}")
        original_init(self, *args, **kwargs)
    
    cls.__init__ = new_init  # type: ignore[misc]
    return cls

@add_logging
class User:
    def __init__(self, name: str) -> None:
        self.name = name

user = User('Mini')
``` -->
