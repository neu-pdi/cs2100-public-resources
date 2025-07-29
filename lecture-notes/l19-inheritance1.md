---
sidebar_position: 19
lecture_number: 19
title: Inheritance
---

# Inheritance

[![Lion kneading](https://img.youtube.com/vi/JWzeEHlNu7k/0.jpg)](https://www.youtube.com/watch?v=JWzeEHlNu7k)
https://www.youtube.com/watch?v=JWzeEHlNu7k

Consider this...
We want to create a class for `Cat` (with properties like `claw_sharpness`, and methods like `knead()`).
We also want to create a class for `Lion`, which has all the functionality of `Cat`, but additional things like a `roar()` method.

## Subclasses and superclasses

A _subclass_ (or _child_ class) is a more specific version of a _superclass_ (_parent_ class).
The subclass _inherits_ all the methods and attributes from the _superclass_ and then adds more that are specific to it.

The syntax is, when declaring the subclass, we put the superclass's name in parentheses: `class Lion(Cat):​`
(The superclass's syntax is unchanged.)

For example, we might have a superclass `Student` with subclasses `UndergraduateStudent` and `GraduateStudent`. The `Student` class will have methods like `attend_lab()` and `register_classes()`. The `UndergraduateStudent` class will inherit all of those, and it will add methods like `switch_major()`, which are specific to undergraduate students.
```python
class Student():
    def __init__(self, student_id: str, major: str):
        self.id = student_id
        self.major = major
        self.courses: Set[str] = set()
    
    def attend_lab(self, course_id: str) -> None:
        if course_id in self.courses:
            print(f'Attending {course_id}\' lab')
    
    def register_courses(self, courses: Set[str]) -> None:
        self.courses |= courses

class UndergraduateStudent(Student):
    def change_major(self, new_major: str) -> None:
        self.major = new_major
```

### Subclasses override methods from their superclasses

A subclass inherits all of the methods and instance variables from its superclass.
- It can add more (like `UndergraduateStudent` adding `change_major()` or `Lion` adding `roar()`)
- It can override the ones that it inherits from the superclass
- Actually, it inherits all of the methods and instance variables except those that are "private" with two underscores. (Public ones and those named with a single underscore are inherited.)

Here, we see that all cats knead and eat tuna or chicken, but lions can also roar and eat zebras:
```python
class Cat:
    def __init__(self, name: str):
        self.name = name
        self.food: List[str] = ['tuna', 'chicken']
    
    def knead(self) -> None:
        print('Kneading')
    
    def eat(self, food: str) -> None:
        if food in self.food:
            print(f'Eating {food}')

class Lion(Cat):
    def roar(self) -> None:
        print('Roaring')
    
    def eat(self, food: str) -> None:
        if food in self.food + ['zebra']:
            print(f'Eating {food}')
    
class HouseCat(Cat):
    def purr(self) -> None:
        print('Purring')
```

Poll: What happens?
```python
class Button:
    def __init__(self, fancy: bool):
        self.fancy = fancy

class Shirt:
    def __init__(self, size: int):
        self.buttons: List[Button] = []
    
    def add_button(self, button: Button) -> None:
        self.buttons.append(button)
    
    def fold(self) -> None:
        print('Folding')
    
class FormalShirt(Shirt):
    def add_button(self, button: Button) -> None:
        if button.fancy:
            self.buttons.append(button)

s = FormalShirt(500)
s.fold()
```
1. It raises an error
2. Cannot do that - won't run
3. It calls `Shirt`'s `fold()` method
4. It does nothing

## Using `super()`

### Calling a superclass's method

### Calling a superclass's constructor

Poll:

## Everything is a subclass of `object`

Every class that we write is by default a subclass of `object`.
These two class definitions are equivalent:
```python
class MyClass: pass

class MyClass(object): pass
```

This is why, as we saw in Lecture 4, every class has a built-in `__str__()` method: they inherit it from `object`.

There are many methods that each class inherits from `object`. One is `__eq__(self, other) -> bool`, which defines whether two objects are equal to each other.
With our current definition of `Student`:
```python
s1 = Student('s1', 'CS')
s2 = Student('s1', 'CS')
print(s1 == s2)  # False
```
And after adding the `__eq__()` method:
```python
class Student():
    def __init__(self, student_id: str, major: str):
        self.id = student_id
        self._major = major
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Student):
            raise TypeError
        return self.id == other.id

s1 = Student('s1', 'CS')
s2 = Student('s1', 'CS')
print(s1 == s2)  # True
```

We will see more of these functions inherited from `object` later on.

## UML diagrams

## The Liskov Subsitution Principle

A member of the subclass can be used wherever a member of the superclass is required.
