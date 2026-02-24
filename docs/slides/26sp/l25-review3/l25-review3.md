---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Quiz 3 Review
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

## Topics revisited from preious quizzes

<div class="grid grid-cols-2 gap-4">
<div>

- Classes (from Quiz 2)
  - Constructors, methods, attributes
  - `__str__()` and `__eq__()`

- Unit Testing (from Quiz 1)
  - `self.assertEqual()`, `self.assertTrue()`, and `self.assertRaises()`
  - Identifying test cases

- Using Objects (from Quiz 2)
  - State and aliasing
  - `None` and `Optional`

</div>
<div>

- Lists, sets, and dictionaries
  - List comprehension
  - Iterating through lists, sets, and dictionaries
  - Rules about contents of lists, sets, and dictionaries
  - Sorting and filtering
  - Binary operators (`|`, `-`, etc.)

</div>
</div>

---

<div class="grid grid-cols-2 gap-4">
<div>

## New review topics

- Inheritance and bstract methods
  - `@abstractmethod`
  - Rules for instantiation

  - What subclasses inherit
  - Overwriting inherited methods
  - `super().`

- Properties
  -  `@property` and `*.setter`
  - Attributes with `_` and `__`

</div>
<div>

- Coupling / cohesion / encapsulation

  - Identifying / mitigating coupling between classes
  - Identifying / mitigating lack of cohesion
  - Enhancing encapsulation a class

</div>
</div>

---

# Abstract methods

##### We cannot instantiate a class that has an `@abstractmethod` (even inherited).

<div class="grid grid-cols-2 gap-4">
<div>

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

</div>
<div>

- Doing so will raise a `TypeError`.

- To instantiate a class that inherits a `@abstractmethod`, overwrite it with a **concrete** (non-abstract) method.

---

<div class="grid grid-cols-2 gap-4">
<div>

## Poll: What happens?

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self) -> None:
        pass

class Dog(Animal):
    pass

dog = Dog()
```

</div>
<div>

1. A `Dog` object is created successfully
2. A `TypeError` is raised because `Dog` doesn't implement `make_sound()`
3. `Dog.make_sound()` returns `None`
4. A warning is printed but `dog` is created

</div>
</div>

---

## Poll: Which is TRUE?

1. A class can only have one abstract method
2. You can instantiate an `ABC` if it has no abstract methods
3. Abstract methods cannot have parameters
4. `ABC` classes cannot have concrete (non-abstract) methods

---

## Poll: What is output?

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self) -> str:
        return "Starting..."

class Car(Vehicle):
    def start(self) -> str:
        return super().start() + " car engine"

c = Car()
print(c.start())
```

<div class="grid grid-cols-2 gap-4">
<div>

A) A TypeError is raised
B) "Starting..."

</div>
<div>

C) "Starting... car engine"
D) "car engine"

</div>
</div>

---

## Poll: How many abstract methods must a concrete (non-abstract) subclass overwrite?

1. At least one
2. Exactly one
3. All of them
4. None, they are optional

---

# Inheritance

1. A _subclass_ is a more specific version of a _superclass_.

2. The subclass _inherits_ all methods and attributes from the superclass.
-> Except those named with two underscores

3. The subclass can overwrite any inherited methods / attributes.

4. The subclass can add more methods / attributes.

---

## Calling a superclass's method (or constructor)

<div class="grid grid-cols-2 gap-4">
<div>

```python
class Cat:
    def __init__(self, name: str):
        self.name = name
        self.food = ['tuna', 'chicken']
    
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
```

</div>
<div>

- `eat()` method inherited from `Cat` works by default in `Lion`
- `self.food` is defined in `Cat`'s constructor, so we overwrite it with a new constructor in `Lion`...
  - one that executes `Cat`'s constructor first, and then adds `'zebra'` to `self.food` (which is inherited)

</div>
</div>

---

## Poll: What is output?

<div class="grid grid-cols-2 gap-4">
<div>

```python
class Vehicle:
    def __init__(self, brand: str):
        self.brand = brand

class Car(Vehicle):
    def __init__(
      self, brand: str, model: str):
        self.model = model

c = Car("Toyota", "Camry")
print(c.brand)
```

</div>
<div>

1. `Toyota`
2. `None`
3. An `AttributeError` is raised
4. `Camry`

</div>
</div>

---

### Poll: Which method call would return `"Rex makes a sound"`?

```python
class Animal:
    def __init__(self, name: str):
        self.name = name
    
    def speak(self) -> str:
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)
        self.breed = breed
    
    def speak(self) -> str:
        return f"{self.name} barks"

d = Dog("Rex", "Labrador")
```

<div class="grid grid-cols-2 gap-4">
<div>

A) `d.speak()`
B) `super().speak()`

</div>
<div>

C) `Animal.speak(d)`
D) `d.Animal.speak()`

</div>
</div>

---

# Attribute visibility

It is impossible to block an attribute from being accessed externally.

- `self.size` (attribute with no underscores): anyone can access
- `self._contents` (single underscore): nicely ask others to avoid using it
  - Externally accessible (`dataframe._contents`)
- `self.__password` (two underscores): even stronger suggestion to keep away
  - External name is mangled (`my_diary._Diary__password`)

---

## Poll: Which are true?

```python
class BankAccount:
    def __init__(self, account_id: int, pin: str):
        self.balance = 0
        self._account_id = account_id
        self.__pin = pin
```

1. All three attributes are truly private and cannot be accessed from outside the class
2. `balance` and `_account_id` are publicly accessible
3. `_account_id` and `__pin` are not accessible from outside the class
4. Accessing `_account_id` from outside `BankAccount` is avoided by convention
5. Externally, `__pin` is name-mangled to `_BankAccount__pin`

---

# Properties: `@property` and `*.setter`

<div class="grid grid-cols-2 gap-4">
<div>

- Create a property by putting the `@property` decorator above a method with the name for the property
  - Returns the value of the property (likely using `_` or `__` attributes)
- Give the property a "setter" using another method with the same name, with the decorator `@age.setter`
  - Takes the property's new value as an arg
  - Updates any internal attributes

</div>
<div>

```python
class Person:
    def __init__(self, age: int):
        self._age = age
    
    @property
    def age(self) -> int:
        return self._age
    
    @age.setter
    def age(self, new_age: int) -> None:
        if new_age >= 0:
            self._age = new_age


mini: Person = Person(10)
mini.age = 11
print(mini.age) # 11
```

</div>
</div>

---

## Poll: Which code snippet will work?


<div class="grid grid-cols-2 gap-4">
<div>

```python
class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def fahrenheit(self) -> float:
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(
            self, value: float) -> None:
        self._celsius = (value - 32) * 5/9
```

1. 
```python
temp = Temperature(0)
print(temp.fahrenheit(0))
temp.fahrenheit(32)
```

</div>
<div>

2. 
```python
temp = Temperature(0)
print(temp.fahrenheit)
temp.fahrenheit = 32
```

3. 
```python
temp = Temperature(0)
print(temp.get_fahrenheit())
temp.set_fahrenheit(32)
```

4. 
```python
temp = Temperature(0)
print(temp._fahrenheit)
temp._fahrenheit = 32
```

</div>
</div>

---

# Cohesion / coupling / encapsulation

<div class="grid grid-cols-3 gap-4">
<div>

**Cohesion:** how closely related the parts of a unit are (good)
- Single Responsibility Principle: each unit should have exactly one responsibility
- Function: has a single, well-defined job
- Class: methods are very closely related

</div>
<div>

**Coupling:** how dependent separate units are (bad)
- Often, that means that one class is too dependent on another, and any changes to the other class will result in "ripple effects" on it.

</div>
<div>

**Encapsulation:** how hidden complex details are (good)
- shields clients from unnecessary implementation details
- gives us more flexibility to change implementations without telling the client

</div>
</div>

---

## Poll: Which ones lead to good cohesion?

1. Put all methods in one big class instead of several small classes
2. Make sure each variable represents exactly one piece of information
3. Use helper methods to split complex tasks into multiple simple tasks
4. Write code that runs efficiently

---

## Poll: How can we avoid coupling?

1. Make it so that changing a class's attributes doesn't require us to to update any code in another class
2. Don't use any built-in Python types
3. Make it so a class doesn't instantiate or control instances of another class
4. Write thorough tests

---

## Poll: Which ones improve encapsulation?

1. Using underscores in variable names to indicate they shouldn't be directly accessed
2. Using appropriate variable names (other than the underscores)
3. Using properties so we can control how attributes are modified
4. Writing thorough documentation

---

## Let's go through Practice Quiz 3!

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?