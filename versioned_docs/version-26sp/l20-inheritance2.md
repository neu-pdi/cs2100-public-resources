---
sidebar_position: 20
lecture_number: 20
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
- Correct: composition. The `SocialMedia` class should have a `set[User]` as an attribute
- Incorrect: inheritance. It would be wrong to make the `SocialMedia` class extend the `set[User]` class
Both of the above options are possible to do using Python, but the inheritance version is silly:
```python
class SocialMedia(set[str]):
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

def get_total_gas(fleet: list[Vehicle]) -> float:
    return sum(veh.get_fuel() for veh in fleet)

fleet: list[Vehicle] = [Car(), Car(), Truck(), Motorcycle(), Motorcycle(), Motorcycle(), Motorcycle()]

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

## Hashing

Poll: What does this print?
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

print(course_oakland == course_boston)
```
1. True
2. False

Poll: How about now?
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course
        

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

print(course_oakland == course_boston)
```
1. True
2. False



If we try to add a `Course` to a `set`, it raises a `TypeError`.
```python
class Course:
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course
        

course_oakland = Course('CS', 2100)

courses: set[Course] = {course_oakland}  # TypeError: unhashable type: 'Course'
```
And the same thing happens if you try to add it as a key in a `dict`.

That's because in order to put someting in a `set` or `dict`, it needs to follow the Hashable protocol.

The Hashable protocol requires that objects implement the method `__hash__(self) -> int`.

There is an interface in the `abc` module called `Hashable` which allows us to enforce that an object follows the Hashable protocol (and indicates to the reader that you intend to put that object in a `set` or `dict`).

### Why hashing?

When faced with the error `TypeError: unhashable type: 'Course'`, one could be tempted to instead just use a `list`, since `list`s don't require their elements to follow the Hashable protocol. But the problem is that `list`s are slower than `set`s in some situations. For example, when we check whether a `list` contains an item, in the worst case, it has to check every item before returning the answer:
```python
T = TypeVar('T')

def list_contains(item: T, list: list[T]) -> bool:
    """Returns True if the item is in the list, and False otherwise"""
    for element in list:
        if element == item:
            return True
    return False
```
There is syntax that makes the above code smaller, but it still needs to check every element. For very long lists, that will be a problem.

On the other hand, sets can check if they contain an item in _constant time_, which means that the amount of time does not depend on the length of the list.

Definitions:
- hash (verb): To map a value to an integer index
- hash table (noun): A list that stores elements via hashing
- hash set (noun): A set of elements stored using the same hash function
- hash function (noun): An algorithm that maps values to indexes

One possible hash function for integers: `i % length`

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   |   |   |   |   |   |   |   |   |   |

```python
set.add(11)  # 11 % 10 == 1
set.add(49)  #  49 % 10 == 9
set.add(24)  #  24 % 10 == 4
set.add(7)  #  7 % 10 == 7
```

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24|   |   | 7 |   | 49|

See any issues?

[dog hash collision gif](https://statics.memondo.com/p/99/gifs/2014/07/GIF_197384_a892292d75d74cc6b6e9143fd1091f80_ni_hablar_yo_quiero_lo_que_el_tiene.webm)
Source: https://m.vayagif.com/busqueda/0/el%20perro%20no%20nace%20agresivo/p/893

[cat collision gif](https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/collision.mp4)
[no collision](https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/no_collision.mp4)
Source: [Tyler Yeats](https://aeromancer.dev/)

<video width="320" height="240" controls>
  <source src="https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/collision.mp4" type="video/mp4"/>
</video>
<video width="320" height="240" controls>
  <source src="https://github.com/neu-pdi/cs2100-public-resources/raw/refs/heads/main/docs/pages/no_collision.mp4" type="video/mp4"/>
</video>


- collision: When hash function maps 2 values to same index

```python
set.add(11)
set.add(49)
set.add(24)
set.add(7)

set.add(54)  # collides with 24
```
| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24|   |   | 7 |   | 49|

- collision resolution (noun): An algorithm for fixing collisions

- probing (verb): Resolving a collision by moving to another index
```python
set.add(11)
set.add(49)
set.add(24)
set.add(7)

set.add(54)  # spot is taken -- probe (move to the next available spot)
```
| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| ----- | - | - | - | - | - | - | - | - | - | - |
| value |   | 11|   |   | 24| 54|   | 7 |   | 49|

- chaining (verb): Resolving collisions by storing a list at each index
  - add / search / remove must traverse lists, but the lists are short
  - impossible to "run out" of indexes

<img width="428" height="176" alt="Chaining" src="https://github.com/user-attachments/assets/e0df7716-7ac8-4227-bbfd-cdf00ea0e83d" />

Poll: Which of these can be done in constant time?
1. Checking if an element is in a set
2. Adding an element to a set
3. Removing an element from a set

4. Checking if a key is present in a map
5. Getting the value associated with a key in a map
6. Changing the value associated with a key in a map
7. Checking if a value appears in a map

### What makes a good hash code?

The `__hash__()` method should return an `int` which is relatively unique to that object, so that it can be used as an index in the hash table.

Rules for `__hash__()`:
- `__hash__()` must always return the same value for a given object
- If two objects are equal, then `__hash__()` must return the same value for them

Poll: Is this a legal hash function?
```python
    def __hash__(self) -> int:
        return 42
```
1. Yes
2. No

In addition to the rules for hash functions, there are some desired characteristics:
- We would like different objects to have different values
- The hash function should be quick to compute (ideally constant time)

Poll: Strings, numbers, and tuples are hashable by default in Python. Lists, sets, and dictionaries are not hashable by default in Python. Why might that be?
1. Because we rarely need to add lists, sets, or dictionaries to a set, or anything that requires hashing
2. Because lists, sets, and dictionaries are mutable, which could result in a changing hash code
3. Because lists, sets, and dictionaries are rarely equal to each other, so they don't need a hash code
4. Because lists, sets, and dictionaries can hold `None` in them, which shouldn't get a hash code

Let's add a good hash function to the `Course` class:
```python
from collections.abc import Hashable

class Course(Hashable):
    def __init__(self, department: str, course: int):
        self.department = department
        self.course = course
    
    def __str__(self) -> str:
        return f'{self.department}{self.course}'
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Course):
            raise NotImplementedError
        else:
            return self.department == other.department and self.course == other.course

    def __hash__(self) -> int:
        return hash(str(self))
        

course_oakland = Course('CS', 2100)
course_boston = Course('CS', 2100)

courses: set[Course] = {course_oakland}
courses.add(course_boston)

print(courses)
```
```
{CS2100}
```