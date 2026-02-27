---
sidebar_position: 21
lecture_number: 21
title: Static and Class Methods
---

# Static and Class Methods

## Operating on a class rather than an instance

So far, every method we have written has been required to have `self` as its first argument. That `self` argument gives the method access to instance variables (which is why they all start with `self.`).

Instance variables are specific to an instance of the class, and we access them using `self`.

Class variables are shared among the entire class, and we access them using the name of the class.

Here is some example syntax using a class variable to count the number of instances that have been instantiated in this class:
```python
class Counter:
    count: int = 0

    def __init__(self) -> None:
        Counter.count += 1

ct1 = Counter()

print(ct1.count)  # 1

ct2 = Counter()

print(ct1.count)  # 2
print(ct2.count)  # same as ct1.count because count is a class variable

for i in range(10):
    Counter()

print(ct1.count)  # 12
```

Class methods are also shared among the entire class. Their first argument must be `cls` (instead of `self`), and they must be decorated with `@classmethod`.

We access class variables from within class methods using `cls`. (While we could access them using the name of the class like before, using `cls` ensures that the class method still works in its subclasses.)

Here is an example that uses a class method to keep track of an API's base URL. If the API's base URL changes, it should change everywhere that it is used.
```python
class APIClient:
    base_url = 'https://api.example.com'
    timeout = 30
    
    @classmethod
    def configure(cls, base_url: Optional[str] = None, timeout: Optional[int] = None) -> None:
        if base_url:
            cls.base_url = base_url
        if timeout:
            cls.timeout = timeout
    
    @classmethod
    def reset_config(cls) -> None:
        cls.base_url = 'https://api.example.com'
        cls.timeout = 30


print(APIClient.base_url)  # https://api.example.com
print(APIClient.timeout)  # 30

APIClient.configure('new_url.com', 60)

user1 = APIClient()
print(user1.base_url)  # new_url.com
print(user1.timeout)  # 60

APIClient.reset_config()

user2 = APIClient()
print(user2.base_url)  # https://api.example.com
print(user2.timeout)  # 30
```

Another common use of class methods is alternate constructors. Python allows us to only specify one constructor using `__init__()`, and this is the standard accepted way to add additional constructors.

Here is an example using class methods for additional constructors to specify a person's birth year in different ways:
```python
from __future__ import annotations
from datetime import datetime

class Person:
    def __init__(self, name: str, birth_year: int):
        self.name = name
        self.birth_year = birth_year
    
    @classmethod
    def from_birth_date(cls: type[Person], name: str, birth_date_str: str) -> Person:
        year = datetime.strptime(birth_date_str, "%Y-%m-%d").year
        return cls(name, year)
    
    @classmethod
    def baby(cls: type[Person], name: str) -> Person:
        return cls(name, datetime.now().year)

person1 = Person('Mini', 2015)
person2 = Person.from_birth_date('Binnie', "2020-03-15")
person3 = Person.baby('Ginnie')
```

Poll: Consider this code:
```python
from __future__ import annotations

class Vehicle:
    total_vehicles = 0
    
    def __init__(self, make: str, model: str):
        self.make = make
        self.model = model
        Vehicle.total_vehicles += 1
    
    @classmethod
    def from_string(cls: type[Vehicle], vehicle_str: str) -> Vehicle:
        make, model = vehicle_str.split('-')
        return cls(make, model)
    
    @classmethod
    def get_total(cls) -> int:
        return cls.total_vehicles


car1 = Vehicle.from_string("Toyota-Camry")
car2 = Vehicle.from_string("Honda-Accord")

print(Vehicle.get_total())
```
What will `Vehicle.get_total()` return after the two lines at the end are executed?
1. 0
2. 2
3. 2 (but only if we change `cls.total_vehicles` to `Vehicle.total_vehicles` in `get_total()`)
4. An error

## @classmethod versus @staticmethod

Sometimes we have a function that belongs in a class because it logically fits there, and encapsulation dictates that it belongs there, but it doesn't need access to the class through the `cls` argument. Rather than making it a class method, it should be a static method.

Static methods are decorated using `@staticmethod`.

Static methods are functions that don't need access to a class (or an instance of a class), but are still placed in that class because they "fit in" thematically. The code would work if the static method was a function completely external to the class, but we still put it in the class for readability and encapsulation.

|   | `@classmethod` | `@staticmethod` |
| - | - | - |
| Purpose | Operations that work on the whole class | Independent functions that logically go with the class |
| Access to instance variables | No | No |
| Access to class variables | Yes | No |
| First argument | `cls` | No requirements |

Poll: Consider this code:
```python
from __future__ import annotations

class Shape:
    default_color = 'blue'
    
    @classmethod
    def create_with_default_color(cls: type[Shape], size: int) -> Shape:
        return cls(size, cls.default_color)
    
    @staticmethod
    def calculate_area(length: int, width: int) -> int:
        return length * width
    
    def __init__(self, size: int, color: str):
        self.size = size
        self.color = color

class Rectangle(Shape):
    default_color = 'red'

rect = Rectangle.create_with_default_color(10)
area = Rectangle.calculate_area(5, 8)
```
What will be the values of `rect.color` and `area`, using the two variables declared at the end?
1. `rect.color = 'blue'`, `area = 40`
2. `rect.color = 'red'`, `area = 40`
3. `rect.color = 'red'`, `area = 13`
4. Both will raise an error because they're called on a subclass
