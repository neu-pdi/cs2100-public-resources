---
sidebar_position: 4
lecture_number: 4
title: Using Objects
---

# Using Objects

Poll: What's wrong with this Cat class? Why doesn't it do what the docstring says?

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

## Procedural abstraction
## The single responsbility principle
## State and aliasing
(https://courses.dbp.io/2000/web/lectures/30/index.html)
## The Program Design and Implementation Process
