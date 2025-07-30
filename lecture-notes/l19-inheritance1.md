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
        self.size = size
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

There is some redundancy in this code:
```python
class Shirt:
    def __init__(self, size: int):
        self.size = size
        self.buttons: List[Button] = []
    
    def add_button(self, button: Button) -> None:
        self.buttons.append(button)
    
class FormalShirt(Shirt):
    def add_button(self, button: Button) -> None:
        if button.fancy:
            self.buttons.append(button)
```
The line `self.buttons.append(button)` appears twice. It's a very small amount of redundancy here, but if `add_button()` was a complicated function in `Shirt`, we would not want to rewrite it in `FormalShirt`. We also wouldn't want the same code in multiple places because updating that method would require updating it in both places -- which is prone to typos and bugs.

### Calling a superclass's method

We can instead directly call `Shirt`'s `add_button()` from within `FormalShirt` using `super()`:
```python
class Shirt:
    def __init__(self, size: int):
        self.size = size
        self.buttons: List[Button] = []
    
    def add_button(self, button: Button) -> None:
        self.buttons.append(button)
    
class FormalShirt(Shirt):
    def add_button(self, button: Button) -> None:
        if button.fancy:
            super().add_button(button)
```
This code does the same thing as before, but it has less redundancy. If we update the way that buttons are added, we only need to update it in the `Shirt` class, and the changes will propogate down to `FormalShirt`.

We could do the same thing for our `Cat` and `Lion`'s `eat()` methods:
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
        if food in ['zebra']:
            super().eat(food)
```

But there is an even more convenient way to handle this one...

### Calling a superclass's constructor

We can modify the `self.food` attribute so that the `eat()` method inherited from `Cat` works by default in `Lion`.
The `self.food` attribute is defined in `Cat`'s constructor, so we need to overwrite it with a new constructor in `Lion`... one that executes `Cat`'s constructor first, and then adds `'zebra'` to `self.food`:
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
    def __init__(self, name: str):
        super().__init__(name)
        self.food += ['zebra']

    def roar(self) -> None:
        print('Roaring')

lion = Lion('Mini')
lion.eat('zebra')  # Eating zebra
```

Poll: What does this output?
```python
class Cat:
    def __init__(self, name: str):
        self.name = name
    
    def knead(self) -> None:
        print('Kneading')

class Lion(Cat):
    def knead(self) -> None:
        print('I am a lion')
        super().knead()

lion: Cat = Lion('Mini')
lion.knead()
```
1. ​`Kneading`
2. `I am a lion`
3. `Kneading` // `I am a lion`
4. `I am a lion` // `Kneading`

<img width="1080" height="475" alt="OOP meme" src="https://github.com/user-attachments/assets/0baf8839-85d3-4acf-bbf1-e6a8dda3bf00" />
Source: https://www.reddit.com/r/ProgrammerHumor/comments/60lm55/oop_what_actually_happens

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

Poll: Why is this bad?
```python
class Cat:
    def __init__(self, name: str):
        self.name = name
        self.food: List[str] = ['tuna', 'chicken']
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Cat):
            raise ValueError
        return other.name in self.food
```
1. It's possible for `cat_a` to equal `cat_b` today, but for `cat_a` to not be equal to `cat_b` tomorrow (with no code changes)
2. It's possible for `cat_a` to not equal itself
3. It's possible for `cat_a` to equal `cat_b`, and `cat_b` to not equal `cat_a`
4. All cats will be equal, making the `__eq__()` function useless

We will see more of these functions inherited from `object` later on.

## UML diagrams

A UML (Unified Modeling Language) diagram visually shows us the classes and their relationships in a program.

<img width="220" height="222" alt="Cat UML" src="https://github.com/user-attachments/assets/01616e15-98ac-45f6-b86e-0394028173a7" />
Here is a box in a UML diagram showing us the class `Cat`. It says that the class has a `str` attribute called `name` and two methods called `knead()` and `eat(food: str)`.

Generally, the top part of the box contains the class's name, the middle part contains its attributes, and the lower part contains its methods. `+` indicates that a method or attribute is publicly available, as opposed to `-`, which indicates that it is private (two underscores `__`).
<img width="221" height="221" alt="Blank UML box" src="https://github.com/user-attachments/assets/e453e711-dabc-4ee0-928f-7832bf48a9f9" />

To depict a subclass / superclass relationship between classes, we draw an arrow from the subclass to the superclass:
<img width="473" height="500" alt="Cat Lion Housecat UML" src="https://github.com/user-attachments/assets/3babba9f-2f03-4deb-88bd-716baa47cb5f" />

## The Liskov Subsitution Principle

We've seen a few examples of design principles, such as the Single Responsibility Principle. Here's another one.

The Liskov Substitution Principle states that "If S is a subtype of T, then objects of T can be substituted with
objects of S without altering any of expected functionality."

In other words, a member of the subclass can be used wherever a member of the superclass is required.

For example, if you wanted coffee, and you received an espresso, you would be satisfied because the coffee hierarchy follows the Liskov Substitution Principle. Espresso is an appropriate subclass of coffee.

<img width="689" height="672" alt="Real ID requirements" src="https://github.com/user-attachments/assets/94ee1149-56cb-4dd6-b4d4-7b99ca790a2e" />
https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/what-is-real-id/

You may have heard about the Real ID requirements that went into effect in the United States on May 7, 2025. In order to pass through TSA at the airport (even for travel entirely within the United States), people need to carry a Real ID. (This policy was planned far in advance, and most IDs in the United States fit this requirement by the time it came into effect.)

Poll: Which are true?
1. The Real ID requirements follow the Single Responsibility Principle because one object covers multiple uses (TSA and driving)
2. The Real ID requirements break the Single Responsibility Principle because the same object is used for multiple unrelated activities (TSA and driving)
3. The Real ID requirements follow the Liskov Substitution Principle because anywhere that the old ID is used, the new (more specific one) can be used instead
4. The Real ID requirements break the Liskov Substitution Principle because there are things that the Real ID can do that the old ID (less specific one) cannot
