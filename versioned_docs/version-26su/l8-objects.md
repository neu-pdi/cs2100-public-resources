---
sidebar_position: 8
lecture_number: 8
title: Using Objects
---

# Using Objects

Poll: What gets printed?
```python
class Cat:
    def __init__(self, name: str, human: str):
        self.name = name
        self.human = human
        print(name * 3)

mini: Cat = Cat('Mini', 'Rasika')
```

1. `Mini`
2. `<__main__.Cat object at 0x10d380200>`
3. `MiniMiniMini`
4. (Nothing)

## State and aliasing

When a variable holds an object, it actually holds a _reference_ to that object. That object is stored somewhere in the memory of the computer, and the variable knows where to access it.

Multiple variables can hold references to the same object.

### Alias vs. copy

Given an object, an alias is simply another reference to the same object (same place in the computer's memory).
A copy is another object (different place in the computer's memory) that has the same elements and looks exactly the same.

```python
original: list[int] = [1, 2, 3]

alias: list[int] = original
copy: list[int] = original.copy()

original[2] = 90

print(alias) # [1, 2, 90]
print(copy) # [1, 2, 3]
```

### Passing mutable objects as arguments

If we pass an object as an argument to a function, an _alias_ is created, not a copy.

```python
def sum_with_bad_manners(in_list: list[int]) -> int:
    sum: int = 0
    while (len(in_list) > 0):
        sum += in_list.pop()
    return sum


my_list: list[int] = [1, 2, 3, 4]
print(f'Sum: {sum_with_bad_manners(my_list)}') # Sum: 10
print(my_list) # []
```

Good manners: Functions should leave their args unchanged (unless they clearly state otherwise in the documentation).

Here's an example using a class that we define ourselves:

```python
class Shirt:
    def __init__(self, size: int):
        self.size = size

def main() -> None:
    six_hundred: int = 600
    subtract_one(six_hundred)
    print(six_hundred)                 # 600

    shirt: Shirt = Shirt(600)
    shrink_shirt(shirt)
    print(shirt.size)                  # 599

def subtract_one(num: int) -> None:
    num -= 1

def shrink_shirt(shirt: Shirt) -> None:
    shirt.size -= 1
```

Poll: Which of these makes it print 4?
```python
def main() -> None:
    shirt: Shirt = Shirt(600)
    modify_shirt(shirt)
    print(shirt.size)

if __name__ == '__main__':
    main()
```

1. 
```python
def modify_shirt(shirt: Shirt) -> None:
    shirt.size = 4
```

2.
```python
def modify_shirt(shirt: Shirt) -> None:
    shirt = Shirt(4)
```

3.
```python
def modify_shirt(shirt: Shirt) -> Shirt:
    return Shirt(4)
```

## The \_\_str\_\_() function

Every class has a `__str__()` method. We can overwrite it with our own `__str__()` method.
When we print an object, it implicitly calls the `__str__()` method.
The default `__str__()` method is not helpful.
See what happens when we print a Cat.

```python
mini = Cat('Mini', 'Rasika')
print(mini) # <__main__.Cat object at 0x1095ca790
```

Why is it different when we print a list (which is also an object)?
We usually write our own `__str__()` method that returns a more helpful `str` for that class.

```python
class Cat:
    ...
    def __str__(self):
        return f'{self.name} meows to {self.human}'


mini = Cat('Mini', 'Rasika')
print(mini) # Mini meows to Rasika
```

Poll: What is printed?
```python
class Cat:
    def __init__(self, name: str, human: str):
        self.name = name
        self.human = human

    def __str__(self) -> str:
        print('MUAHAHAHAHHA')
        return self.name


mini: Cat = Cat('Mini', 'Rasika')
print(mini)
```

1. `Mini`
2. `MUAHAHAHAHHA` // `Mini`
3. `<__main__.Cat object at 0x10d380200>`
4. `MUAHAHAHAHHA` // `<__main__.Cat object at 0x10d380200>`


## Generics
Generics are not covered in our suggested textbook. The [official Python documentation](https://typing.python.org/en/latest/reference/generics.html) will serve as a better reference.

### Generic types

In Python, we are able to put objects of different types into the same list, but it's discouraged because it makes the list harder to process. (We can't process all of its elements the same way.) And in our class, elements of a list must be of the same type since we require types in our Python code. What would be the type of the variable `my_list = [1, 'a']`?

So, even though the elements of a list must all be of the same type (for us), we can have two different lists that have two different types of elements (like a `list[str]` and a `list[int]`).

In our type annotations, the same `list` type works for `list`s of different types. That's because `list` is a _generic_ type.

We can define our own generic type. Here's an example:

```python
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: list[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

    def is_empty(self) -> bool:
        return not self.items

my_stack: Stack[int] = Stack()
my_stack.push(4)
print(my_stack.pop())   # 4
```

We first defined the type variable `T`, and then used it to define the generic type `Stack[T]`. Inside of the class `Stack[T]`, the type `T` can be any type, but all instances of `T` must be the same type as each other.

After defining the generic type `Stack[T]`, we used it to create the parametrized type `Stack[int]`. This means that for the variable `my_stack`, all of the `T`s are replaced with `int`. `Stack[int]` works the same as this:

```python
class Stack:
    def __init__(self) -> None:
        self.items: list[int] = []

    def push(self, item: int) -> None:
        self.items.append(item)

    def pop(self) -> int:
        return self.items.pop()

    def is_empty(self) -> bool:
        return not self.items
```

We can create a separate variable `my_other_stack: Stack[str]`, for which the generic type is replaced with `str` instead of `int`.

Definitions:
- Generic type: a class with a type variable, like `list[T]`
- Parameterized type: a generic type with the type variables filled in, like `list[str]`
- Raw type: a generic type without the type variable, like `list`. We use this if we don't need to re-use the type variable anywhere else in the code

We can even parametrize the type using another user-defined type: `stack_of_stacks: Stack[Stack[int]] = Stack()`

Poll: Which of these is allowed?
```python
class Thing(Generic[T]):
    def __init__(self, item: Optional[T]):
        """Item is of type T or None"""
        self.item = item
```

1. `item: Thing[str] = Thing('hello')`
2. `item: Thing[str] = Thing(None)`
3. `item: Thing[str] = Thing(5)`
4. `item: Thing[Thing[str]] = Thing(Thing('hello'))`

### (Side note if time) Generic functions

A function can also take a generic type as an argument.

```python
def get_first(list: list[T]) -> T:
    if len(list) > 0:
        return list[0]
    else:
        raise ValueError
```

Note: We didn't have to redefine `T` between any of the previous examples -- we only need to define it once at the top, and we can reuse it. If we need to have two different type variables (to specify that the other type can be different from `T`), then we will need to define a second type variable.

Exercise: Let's write a function `map()` that converts a list of one type into a list of another type. Its arguments should be:
- a list of generic type T
- a function that takes T and returns R (another type variable)
Hint: the type for a function that takes T and returns R is `Callable[[T], R]`

```python
def map(original: list[T], mapper: Callable[[T], R]) -> list[R]:
    """Returns a copy of the list containing elements converted using the mapper

    Parameters
    ----------
    original : list[T]
        The original list
    mapper: Callable[[T], R]
        The function to convert elements from the original list to the new list
    
    Returns
    -------
    list[R]
        A new list with the mapped elements
    """
    return [mapper(i) for i in original]
```

Poll: Which function can we NOT pass to `map()`?
1. `def to_str(inp: int) -> str:`
2. `def add_one(inp: int) -> int:`
3. `def to_int_or_None(inp: str) -> Optional[int]:  # returns int or None`
4. `def add(inp1: int, inp2: int) -> int`

## Abstraction

We like to organize our lines of code into functions, and our functions into classes. This procedure of grouping more granular things into less granular groups is called "abstraction." We saw the benefits of abstraction when we learned how functions allow us to reuse code without redundancy, hide implementation details, and break down a problem into smaller, more manageable pieces. The same applies to the idea of putting methods into classes.

For example, this code is hard to debug or modify:

```python
length: int = 5
width: int = 3

print(get_area_of_rectangle(length, width))

length = 6
width = 4

print(get_perimeter_of_rectangle(length, width))
```

If we put all relevant perimeter and area methods into a class for each shape, we can instead do this:

```python
table: Rectangle = Rectangle(5, 3)
print(table.area())

print(Rectangle(6, 4).perimeter())

chair: Square = Square(4)
print(chair.area())
```

Benefits of abstraction:
- We can use the same code multiple times without re-writing it
- It's easier to read
- It's easier to maintain and adapt the code later on
- It's easier to test behaviors in isolation
- Each variable, function, and class has a single, clear responsibility

## The Single Responsbility Principle

A core principle for writing code is that every component of our code must have a single purpose. This makes our code easier to read, test, and maintain.

| Component | Does not Follow Single Responsibility Principle |
| - | - |
| Variable | `age_or_nonexistent: int = -1 # negative if nonexistent` |
| Function | `def read_file_compute_average_print_score(filename: str) -> None:` |
| Class | `class FileManagerAndOutputFormatter` |