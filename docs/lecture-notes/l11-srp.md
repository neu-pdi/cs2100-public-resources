---
sidebar_position: 11
lecture_number: 11
title: The Single Responsibility Principle, Named and Default Arguments
---

# The Single Responsibility Principle, Named and Default Arguments

## The Single Responsbility Principle

A core principle for writing code is that every component of our code must have a single purpose. This makes our code easier to read, test, and maintain.

| Component | Does not Follow Single Responsibility Principle |
| - | - |
| Variable | `age_or_nonexistent: int = -1 # negative if nonexistent` |
| Function | `def read_file_compute_average_print_score(filename: str) -> None:` |
| Class | `class FileManagerAndOutputFormatter` |

## Named and default parameters

Motivate by showing `list.sort()` documentation: https://docs.python.org/3/library/stdtypes.html#list.sort

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
def send_message_and_cc_self(message: str, sender: str, recipients: list[str] = []) -> None:
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
