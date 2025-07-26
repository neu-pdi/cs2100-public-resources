---
sidebar_position: 4
lecture_number: 4
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
4. Nothing

## The `__str__()` function

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

## Abstraction

We like to organize our lines of code into functions, and our functions into classes. This prodecure of grouping more granular things into less granular groups is called "abstraction." We saw the benefits of abstraction when we learned how functions allow us to reuse code without redundancy, hide implementation details, and break down a problem into smaller, more manageable pieces. The same applies to the idea of putting methods into classes.

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
| Variable | age_or_nonexistent: int = -1 # negative if nonexistent |
| Function | def read_file_compute_average_print_score(filename: str) -> None: |
| Class | class FileManagerAndOutputFormatter |

## The Program Design and Implementation Process
