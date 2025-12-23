---
sidebar_position: 21
lecture_number: 21
title: Designing Programs with Inheritance
---

# Designing Programs with Inheritance

Poll: What would be a good relationship between `Chair` and `Throne`?
1. `Throne` should be an interface implemented by `Chair`
2. `Chair` should be an interface implemented by `Throne`
3. `Throne` should be a concrete subclass of the abstract class `Chair`
4. `Chair` should be a concrete subclass of the abstract class `Throne`
5. None of the above

## Inheritance versus composition

As we discussed in our "duck typing" discussion yesterday, inheritance implies an _is a_ relationship between two classes: one of the classes is a subclass of the other. (One of the classes may be abstract, but neither should be an interface.) A square _is a_ rectangle.

Composition, on the other hand, implies a _has a_ relationship: one of the classes holds an instance of the other class as an instance variable. A square _has_ four edges.

Good object-oriented design requires knowing when to use inheritance versus composition.

### When to use composition

`SocialMedia`, a class that holds information about a social media platform, including a set of users:
- Correct: composition. The `SocialMedia` class should have a `Set[User]` as an attribute
- Incorrect: inheritance. It would be wrong to make the `SocialMedia` class extend the `Set[User]` class
Both of the above options are possible to do using Python, but the inheritance version is silly:
```python
from typing import Set

class SocialMedia(Set[str]):
    pass

fb = SocialMedia()
fb.add('Mini')
fb.add('Binnie')

print(fb)  # SocialMedia({'Mini', 'Binnie'})
```

A `House` with a kitchen and bedroom:
- Correct: composition. The `House` class should have instance variables for a `Kitchen` and a `Bedroom`
- Incorrect: inheritance. It would be wrong to make the `House` class extend the `Kitchen` class and add the features of a `Bedroom` (like a `Bed` instance variable)
Again, both of the above options are possible to do using Python, but the inheritance version would require admitting that one's house is a specific type of kitchen.

### When to use inheritance

`Cat`, `Lion`, and `HouseCat`:
- Correct: inheritance. The `Lion` and `HouseCat` classes should extend the `Cat` class
- Incorrect: composition. It would be wrong to make the `Lion` and `HouseCat` classes each have an instance variable for a `Cat` to which they outsource all of the kneading

Poll: Which of these pairs of classes should use inheritance rather than composition?
1. `VideoGame` and `Physics`
2. `UIComponent` and `TextBox`
3. `Student` and `TA`
4. `OnlineStore` and `Inventory`
5. `TextEditor` and `SpellChecker`

## Polymorphism

We saw this example in the previous lecture:
```python
from abc import ABC, abstractmethod

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
This example works because of _polymorphism_: the `pet` variable's ability to be both a `Cat` and a `Dog`, and for it to be treated correctly as an instance of both a `Cat` and a `Dog`

Let's practice this with another example. Let's create classes for `Car`, `Motorcycle`, and `Truck`. Let's write a function that takes a fleet of vehicles as a list and returns the total fuel needed for the trip.
```python
class Vehicle(ABC):
    def __init__(self, mpg: int):
        self.fuel_used: float = 0.0
        self.mpg = mpg
    
    def move(self, distance: int) -> None:
        self.fuel_used += (distance / self.mpg)

    def get_fuel(self) -> float:
        return self.fuel_used

class Car(Vehicle):
    def __init__(self) -> None:
        super().__init__(26)

class Motorcycle(Vehicle):
    def __init__(self) -> None:
        super().__init__(55)

class Truck(Vehicle):
    def __init__(self) -> None:
        super().__init__(7)

def get_total_gas(fleet: List[Vehicle]) -> float:
    return sum(veh.get_fuel() for veh in fleet)

fleet: List[Vehicle] = [Car(), Car(), Truck(), Motorcycle(), Motorcycle(), Motorcycle(), Motorcycle()]

for veh in fleet: veh.move(10)

print(get_total_gas(fleet))
```

## Encapsulation

We discussed encapsulation when we discussed visibility. Even though properties in Python are never really private, we still use encapsulation to shield clients from unnecessary implementation details. It also gives us more flexibility to change implementations without telling the client.

Poll: Which class design best demonstrates encapsulation?
1. Expose all internal attributes to the public for flexibility
2. Create a minimal public interface with all complex logic kept private
3. Rather than having a class be a direct subclass of its interface, make it a subclass of a subclass, to add layers of privacy
4. Document internal methods thoroughly for users

Poll: Here is a poorly designed Python class:
```python
class Rectangle:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.area = width * height
```
How can we improve its encapsulation?
1. Validate in `__init__()` that `width` and `height` are not negative
2. Make all three attributes private with corresponding getter and setter methods using the `@property` decorator`
3. Make `width` and `height` private with corresponding getter/setter `@property` methods, and make `area` a property only (calculated in a getter method)
4. Add docstrings to explain the attributes

How should errors be handled in an encapsulated class design?
1. Raise all errors to the caller
2. Wrap all errors in `try` / `except` and return error codes instead
3. Wrap low-level internal errors in `try` / `except` and raise them as domain-specific errors
4. Log errors internally but never raise them

## Coupling and cohesion

We have discussed the Single Responsibility Principle a few times so far. It is closely related to the concept of "cohesion," which measures how closely related the parts of a unit are. For example, if the unit is a function, then we aim for it to have a single, well-defined job. If the unit is a class, then we want its responsibilities to be very closely related.

Coupling, on the other hand, is something we like to avoid. Coupling measures how dependent different units are on each other. Often, that means that one class is too dependent on another, and any changes to the other class will result in "ripple effects" on this one.

Other things can be inappropriately coupled, too. Here is an example of an email sender with too much coupling of its _tasks_:
```python
class BadEmailSender:
    def send_email(self, user: str, email_type_flag: int) -> None:
        if email_type_flag == 1:
            # send a welcome email
        elif email_type_flag == 2:
            # send a password reset email
```
Aside from the code that will undoubtedly be repeated between branches, this class is poorly designed because it has many tasks, and they are all very dependent on each other.
Here's a better design that makes use of polymorphism to separate out the tasks:
```python
class Template(ABC):
    @abstractmethod
    def generate_content(self, user: str) -> str:
        pass

class EmailSender:
    def send_email(self, email_template: Template, user: str) -> str:
        return email_template.generate_content(user)

class WelcomeEmail(Template):
    def generate_content(self, user: str) -> str:
        return f"Welcome {user}!"

class PasswordResetEmail(Template):
    def generate_content(self, user: str) -> str:
        return f"Reset password for {user}"
```
