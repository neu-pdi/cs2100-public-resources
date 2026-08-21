---
sidebar_position: 19
lecture_number: 19
title: Interfaces and Abstract Classes
---

# Interfaces and Abstract Classes

Poll: Which of these would make a good superclass / subclass pair?
1. Rectangle / Square
2. Sophomore / Freshman
3. Mammal / Elephant
4. Building / Window

## Abstract methods

An _abstract method_ is a method with no implementation.
```python
class Shape():
    def get_area(self) -> float:
        pass
    
    def get_perimeter(self) -> float:
        pass
```
The `Shape` class above has two abstract methods `get_area()` and `get_perimeter()`. Since we don't know enough about the type of shape, we don't have enough information to implement these two methods. Instead, we implement these methods in all of `Shape`'s subclasses:
```python
class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def get_area(self) -> float:
        return self.width * self.height
    
    def get_perimeter(self) -> float:
        return 2 * (self.width + self.height)
```
This is nice because we were able to define what a generic `Shape` does, but leave the implementation details to its subclasses, who have the necessary information.
```python
rect: Shape = Rectangle(5, 3)
print(rect.get_area())  # 15
```

The only thing is, the above design allows us to instantiate a general `Shape` and ask for its area or perimeter -- how embarassing! We don't have the answers for those things!
```python
shape = Shape()
print(shape.get_area())  # None
```
And the same thing will happen if we forget to implement one of the abstract methods in one of `Shape`'s subclasses.

The `ABC` module in Python helps us with that: it prevents us from instantiating a class that has an abstract method (either inherited from a superclass or directly written in the class).

We can use the `ABC` module to block anyone from instantiating `Shape` because it has an abstract method:
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def get_area(self) -> float:
        pass
    
    @abstractmethod
    def get_perimeter(self) -> float:
        pass

shape = Shape()  # TypeError
```
Every method decorated with `@abstractmethod` must be implemented by a subclass to get instantiated. If a subclass doesn't implement all abstract methods, the `ABC` module will raise a `TypeError` when you try to instantiate it.
The `Rectangle` class is unchanged and works the same as before, because it had already implemented all necessary methods.

![Cat making biscuits on dog](https://giffiles.alphacoders.com/207/207370.gif)
https://giffiles.alphacoders.com/207/207370.gif

Poll: Which ones are legal?
<img width="366" height="234" alt="UML diagram" src="https://github.com/user-attachments/assets/9c1f9068-a11b-45df-b764-b729e8517843" />
1. pet1: Pet = Pet()
2. cat1: Cat = Cat()
3. dog1: Dog = Dog()
4. pet2: Pet = Cat()
5. cat2: Cat = Dog()
6. dog2: Dog = Pet()

Poll: Does this work?
```python
for pet in [Cat(), Dog(), Cat()]:
    pet.express_affection()
```
1. Yes
2. No
3. I don't know
4. I looked ahead in the online lecture notes and found the answer

```python
class Pet(ABC):
    @abstractmethod
    def express_affection(self) -> None:
        pass

class Cat(Pet):
    def express_affection(self) -> None:
        self.make_biscuits()
    
    def make_biscuits(self) -> None:
        print('Making biscuits')

class Dog(Pet):
    def express_affection(self) -> None:
        self.slobber()
    
    def slobber(self) -> None:
        print('Slobbering')

for pet in [Cat(), Dog(), Cat()]:
    pet.express_affection()
```
```
Making biscuits
Slobbering
Making biscuits
```

## Interfaces

An interface describes the behavior of a class without implementing it. You may have heard of a _user interface_: it also describes the behavior of the application without telling you how that behavior is implemented.

An interface is a contract: if a class wants to "implement" the interface, that class must implement each specified method.
- Different classes can implement the same methods in different ways
- Implementing classes can also have additional methods not specified in the interface

In Python, interfaces are written as abstract classes (`ABC` module) where all of the methods in it are abstract.

Poll: (Designing an interface) What should all classes which implement the interface `Cat` be able to do?
1. Sleep
2. Roar
3. Meow
4. Bark
5. Knead

Poll: Which types can be instantiated and put into the list `cacophony`?
```python
cacophony: list[Roarable] = list()

class Cat(ABC):
    pass

class Roarable(ABC):
    @abstractmethod
    def roar(self) -> None:
        pass

class Lion(Cat, Roarable):
    def roar(self) -> None:
        print('ROAR')

class AsiaticLion(Lion):
    pass

class HouseCat(Cat):
    pass

class Dragon(Roarable):
    def roar(self) -> None:
        print('GRRRR')
```
1. Lion
2. AsiaticLion
3. HouseCat
4. Dragon
5. Roarable

## Interfaces with duck typing in Python

The `ABC` (Abstract Base Classes) module was originally designed to help with abstraction: inheritance hierarchies (subclass / superclass relationships) where we just happen to need abstract methods which are implemented in subclasses.

Using the `ABC` module to design interfaces is commonplace in modern Python, but some argue that that is not what it was originally designed for. Interfaces are "contracts" that specify what a class should be able to do. Abstract classes are classes that happen to need abstract methods because they are too non-specific, but those methods can be implemented in their more specific subclasses. Interfaces serve different purposes than abstract superclasses, and the `ABC` module was designed for the latter, not the former.

One can argue that interfaces are not necessary in a language like Python, which uses "duck typing." You may have heard of the Duck Test: "If it walks like a duck and it quacks like a duck, then it must be a duck." In Python, where the types are not enforced by default, we can pass a variable of any type to a function expecting any type. If the variable happens to have the necessary methods and attributes to work in that context (to quack), great! It's a duck.
<img width="1146" height="1851" alt="Duck typing meme" src="https://github.com/user-attachments/assets/7c67f5fd-154e-49b8-8878-a3c76f016baf" />
https://stackoverflow.com/questions/4205130/what-is-duck-typing

Interfaces can make less sense in a language that uses duck typing because they force types to follow contracts for what they should be able to do, and then pass variables of those types into locations where type flexibility is prioritized.

There is tension in the community about this. We find interfaces to be a valuable concept for this course because:
- It helps us to detect errors early, not while running the program
- We prioritize readability, and making contracts explicit through interfaces helps with "self-documentation"
- It helps us to keep track of types' capabilities, especially in large codebases
- When designing APIs for others to use, it helps ensure that implementers implement all required methods
- It prepares students for future courses where types and interfaces are fundamental concepts

## Python contracts

An interface using `ABC` is an explicit contract: classes must follow the rules in order to be used in a specific way.

Python also has built-in contracts which are followed by convention but not enforced.

There are pros and cons of using both.
Explicit contracts through `ABC` interfaces are enforced, which is beneficial for the reasons listed above (early error detection, readability, easier to follow, requires other implementors to follow our rules, teaches fundamental concepts).
Implicit contracts, on the other hand, can include things that interfaces cannot include. These contracts can say things about _what the methods should do_, rather than simply listing the methods that need to be implemented. Implicit contracts can require specific method behaviors because they are not enforced by Python.

### collections.abc.Sized for `len()`

We are able to get the sizes of many different objects using the same `len()` function. That's because, in Python, there is a built-in contract called the "length protocol" or "size protocol." It says that we should write a method called `def __len__(self) -> int` which returns a non-negative `int`, and this is what is returned by the `len()` function.

```python
class Cat:
    def __len__(self) -> int:
        return 900
    
print(len(Cat()))  # 900
```

There is an interface in `ABC` which enforces this protocol:
```python
from collections.abc import Sized

class Cat(Sized):
    def __len__(self) -> int:
        return 900
    
print(len(Cat()))  # 900
```
Neglecting to implement the `__len__()` function (or having it return a negative number) will result in an error before even being run.

### collections.abc.Container for `in`

Similarly, we can use the `in` operator because of the implicit Python contract called the "membership test protocol" or "containment protocol": when you use `in`, Python calls `__contains__()`.

The protocol works on its own, but we often enforce it using `collections.abc.Container`:
```python
from collections.abc import Container

class Document(Container[str]):
    def __init__(self, text: str):
        self.words = text.split()

    def __contains__(self, word: object) -> bool:
        if not isinstance(word, str):
            raise TypeError
        return word in self.words

print('hi' in Document('hi this is mini'))  # True
print('cat' in Document('hi this is mini'))  # False
```
