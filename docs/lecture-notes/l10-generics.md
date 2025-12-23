---
sidebar_position: 10
lecture_number: 10
title: Generics
---

# Generics and Changing Arguments

## Generics
Generics are not covered in our suggested textbook. The [official Python documentation](https://typing.python.org/en/latest/reference/generics.html) will serve as a better reference.

### Generic types

In Python, we are able to put objects of different types into the same list, but it's discouraged because it makes the list harder to process. (We can't process all of its elements the same way.) And in our class, elements of a list must be of the same type since we require types in our Python code. What would be the type of the variable `my_list = [1, 'a']`?

So, even though the elements of a list must all be of the same type (for us), we can have two different lists that have two different types of elements (like a `List[str]` and a `List[int]`).

In our type annotations, we import the `List` type using `from typing import List`. And that same `List` that we imported works for `List`s of different types. That's because `List` is a _generic_ type.

We can define our own generic type. Here's an example:

```python
from typing import List, TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: List[T] = []

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
        self.items: List[int] = []

    def push(self, item: int) -> None:
        self.items.append(item)

    def pop(self) -> int:
        return self.items.pop()

    def is_empty(self) -> bool:
        return not self.items
```

We can create a separate variable `my_other_stack: Stack[str]`, for which the generic type is replaced with `str` instead of `int`.

Definitions:
- Generic type: a class with a type variable, like `List[T]`
- Parameterized type: a generic type with the type variables filled in, like `List[str]`
- Raw type: a generic type without the type variable, like `List`. We use this if we don't need to re-use the type variable anywhere else in the code

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

### Generic functions

A function can also take a generic type as an argument.

```python
def get_first(list: List[T]) -> T:
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
def map(original: List[T], mapper: Callable[[T], R]) -> List[R]:
    """Returns a copy of the list containing elements converted using the mapper

    Parameters
    ----------
    original : List[T]
        The original list
    mapper: Callable[[T], R]
        The function to convert elements from the original list to the new list
    
    Returns
    -------
    List[R]
        A new list with the mapped elements
    """
    return [mapper(i) for i in original]
```

Poll: Which function can we NOT pass to `map()`?
1. `def to_str(inp: int) -> str:`
2. `def add_one(inp: int) -> int:`
3. `def to_int_or_None(inp: str) -> Optional[int]:  # returns int or None`
4. `def add(inp1: int, inp2: int) -> int`

## Named and default parameters

Functions with lots of arguments:
```python
def display_text(text: str, size: int, is_bold: bool, is_italic: bool, is_underlined: bool) -> None:
    ...

display_text('hello', 18, False, False, False)
display_text('goodbye', 18, True, False, False)
```
- Pros: multiple options in the same function without compromising flexibility
- Cons: error prone, must keep track of order of arguments, too many things to specify each time we call the function

Named arguments:
```python
def display_text(text: str, size: int, is_bold: bool, is_italic: bool, is_underlined: bool) -> None:
    ...

display_text(text = 'hello', is_underlined = False, is_bold = False, is_italic = False, size = 18)
```
- Make calls more readable
- Enable you to reorder arguments

Default argument values:
```python
def display_text(
    text: str, size: int = 18, is_bold: bool = False, is_italic: bool = False, is_underlined: bool = False
) -> None:
    ...

display_text(text = 'hello', is_bold = True)
```
- If you usually pass the same value
- Specify what the default value is for an argument that doesn't have a value when the function is called
- In the function signature, arguments with default values must come after arguments without default values
- If we have a function that is already widely used, and we want to add another parameter, give it a default value (so the existing code doesn't break, since they didn't specify a value for that parameter)

Note: Default argument values are evaluated when the function is declared, not when it is called. It is stuck with the value it got the first time, and does not "refresh" each time the function is called. Here's the example from our recommended textbook:
```python
number = 5

def print_number(number: int = number) -> None:
    print(number)

number = 6 # This line does nothing; the default value for the argument is stuck at 5

print_number(8) # 8
print_number()  # 5
print(number)   # 6
```

Open-ended poll: What does this output? Why? (This is an example of code that could look like it's doing one thing, when it's actually doing something else)
```python
def send_message_and_cc_self(message: str, sender: str, recipients: List[str] = []) -> None:
    recipients.append(sender) # add sender to recipients so they get a copy as well
    for r in recipients: # send message to each recipient
        print(f"Sending '{message}' from {sender} to {r}")

send_message_and_cc_self("note to self", "Rasika") # self-only message
send_message_and_cc_self("use RSA next time", "Eve", ["Alice", "Bob"]) # message to multiple people
send_message_and_cc_self("super secret", "admin") # another self-only message
```
Source: [Tyler Yeats](https://aeromancer.dev/)

## Variable argument lists

Python allows us to have a function with an arbitrary number of arguments:
```python
def print_args(*args: T) -> None:
    """Print each argument on a separate line"""
    for item in args:
        print(item)

print_args(1, 2, 3)
```

The function `print_args()` above can take any number of arguments, and they are of the generic type `T`. We can access them inside the function -- each argument to `print_args()` becomes an element in the tuple `args`. If there are no arguments, then `args` will be an empty tuple.

And, if we want a variable argument list, but with named arguments:
```python
def print_args(**kwargs: T) -> None:
    """Print each argument on a separate line"""
    for argument_name, argument_value in kwargs.items():
        print(f'{argument_name}: {argument_value}')

print_args(a = 1, b = 2, c = 3)

a: 1
b: 2
c: 3
```

`**kwargs` stands for "keyword arguments", but you can name it anything you want. Notice that we use two asterisks for `**kwargs` and only one for `*args`.

Poll: How many arguments can I pass to this function?
<img width="1406" height="494" alt="Screenshot of numpy fromfunction" src="https://github.com/user-attachments/assets/a6f69c16-4b86-4c84-b82b-203c82ab5383" />
([https://numpy.org/doc/stable/reference/generated/numpy.fromfunction.html](https://numpy.org/doc/stable/reference/generated/numpy.fromfunction.html))
1. 0
2. 1
3. 2
4. 3
5. 4
6. 6
7. 10
