---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# The Strategy and Decorator Patterns
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

# Strategy Pattern

You are using the Strategy pattern in Homework 8 without knowing it.

---

## Defining distance

Algorithms for "shortest distance" (root to each node, MST) -> must define "distance"

Part of HW8: defining the distance between train stations
- Basic measure of Euclidean distance (used in code)
- Number of minutes it takes to travel: "the station is 15 minutes from here"
- Financial cost of building th track (which is bigger if we have to dig a tunnel underwater or through a mountain)
- `1/n`, where `n` is the number of passengers who regularly travel between the two stations

---

## Strategy pattern

Many definitions of distance, one algorithm that can use any of them

Strategy (Duration) Pattern: allow user to choose / change distance definition at run time

<div class="grid grid-cols-2 gap-4">
<div>

##### Ex: Strategies for Tic Tac Toe

- Place a third piece in a row to win
- Block the opponent if they're about to win
- Place in an open corner
- Place in any open square

Strategy for choosing a place changes based on game state

</div>
<div>

##### Ex: maps directions
- Shortest path
- Shortest time
- Least emissions
- Least tolls
- Maximize sightseeing

User chooses the path-finding algorithm at runtime

</div>
</div>

---

<img width="780" height="476" alt="Strategy UML" src="https://github.com/user-attachments/assets/4625cc87-ec7f-45aa-b5c7-4c404c7b510e" />

---

## Poll: How could the Strategy Pattern be used to define multiple definitions of distance in Homework 8 (public transportation MST)?

1. Ignore the distances between stations when building the train track system (assume all stations are equidistant)
2. Take user input to choose between multiple existing implementations of the `distance()` function (which returns the distance between two stations)
3. Take user input to choose between multiple existing implementations of Kruskal's Algorithm (which builds a Minimum Spanning Tree)
4. After the train track system is built, allow passengers to choose where they want to travel using the trains.

---

## Function Decorators

We have already seen some decorators:

- `@property` (to create a property named after the method)
- `*.setter` (to give that property a "setter" method)
- `@classmethod` (for `setUpClass(cls)` and `tearDownClass(cls)` to run once before / after unit testing)

We will find out how these decorators were implemented / how to create our own decorators

---

## Functions are objects that can be stored in mutable variables

We already knew functions are objects:

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

A function decorator is a way to "mutate" a function to modify what it does.

---

## Function decorators "mutate" functions by wrapping them in other functions

Example: `@time_calls` modifies a given function to print the time it took to run it:

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

---

How we created that `@time_calls` decorator:

```python
def time_calls(func: Callable[..., Any]) -> Callable[..., Any]:
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        now = time.time()
        return_value = func(*args, **kwargs)
        print(f'Executed {func.__name__} with {args} and {kwargs} in {time.time() - now}ms')
        return return_value
    return wrapper
```


`time_calls()` takes a function as its argument and returns a function.

The returned function is a modified version of the argument function.

That modification: in addition to running the function as usual, it prints the number of milliseconds that it took to run it.


---

## Poll: What does the `@mystery` decorator do?

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

<style scoped>
section {
    font-size: 25px;
}
</style>

1. Modifies the function to print the number of milliseconds it took to run it
2. Modifies the function such that it raises a `ValueError` if the argument is negative
3. Modifies the function to run it twice
4. Nothing
   
---

## Caching: a common use of decorators

Caching: temporarily storing values that are recalculated often (so they only need to be calculated once).

```python
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

In order to calculate the 5th Fibonacci number, we need to calculate the 4th and 3rd ones.
And to calculate the 4th number, we need to calculate the 3rd and 2nd ones.
And to calculate the 3rd number, we need to calculate the 2nd and 1st ones...

There are a lot of recalculated numbers here. Let's store and re-use solutions.

---

Let's store each Fibonacci number _the first time it is calculated_, so that each subsequent time, we can just look it up

```python
R = TypeVar('R')

def cache(func: Callable[..., R]) -> Callable[..., R]:
    storage: dict[tuple[Any, ...], R] = {}
    def wrapper(*args: Any) -> R:
        if args in storage:
            return storage[args]
        result = func(*args)
        storage[args] = result
        return result
    return wrapper

@cache
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

---

## Poll: Can we re-use the `@cache` decorator to perform caching for other functions in the same file?

1. Yes
2. Yes, but that other function would share the "cache" of stored values, which are specific to Fibonacci
3. No, it would not run

Easiest way to test this: create a duplicate method called `fibonacci2()`, decorate it, call it after the regular `fibonacci()`, and step through it in the debugger.

---

# [Let's cache an LLM](https://colab.research.google.com/drive/1mFWNiRTlctAUOQPZs_CdvMW_OF2Rgkzh?usp=sharing)

---

<!-- ---

<div class="grid grid-cols-2 gap-4">
<div>

## Preserving function metadata

Functions have metadata such as their name and docstring:
```python
def double(num: int) -> int:
    """Doubles a number."""
    return num * 2

print(double.__name__) # double
print(double.__doc__) # Doubles a number.
```

</div>
<div>

Its metadata is overwritten by the wrapper's metadata:

```python
def my_decorator(
        func: Callable[..., Any]
) -> Callable[..., Any]:

    def wrapper(
            *args: Any, **kwargs: Any
    ) -> Any:
        print("Before calling function")
        result = func(*args, **kwargs)
        print("After calling function")
        return result
    return wrapper

@my_decorator
def double(num: int) -> int:
    """Doubles a number."""
    return num * 2

print(double.__name__) # wrapper
print(double.__doc__) # None
```

</div>
</div>

---

#### `@wraps` decorator copies metadata from passed function to wrapper function

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

---

## Poll: Why do we use `wraps` from the `functools` package?

1. To copy the metadata from the original (un-decorated) function to the wrapper function that decorates it
2. To copy the metadata from the decorating wrapper function to the original (un-decorated) function
3. To make it so we can use a function as a decorator with the `@` symbol
4. `wraps` is like a type hint: it doesn't do anything and isn't enforced in Python by default

---

## Class decorators

_Function_ decorators are popular in Python.

_Class_ decorators are more popular in other languages including Java.

A _class_ decorator is also a decorator that uses the `@` symbol. The only difference is that it decorates a class instead of a function.

---

`@add_logging` modifies a class's `__init__()` to add a `print()` statement for logging.

```python
class HasInit(Protocol):
    # to ensure we only use`@add_logging on classes that have `__init__()`
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
```
 -->
 
---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?