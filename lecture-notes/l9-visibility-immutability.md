---
sidebar_position: 9
lecture_number: 9
title: Visibility and Immutability
---

# Visibility and Immutability

The textbook "Python 3 Object Oriented Programming: Harness the Power of Python 3 Objects" by Dusty Phillips is recommended for this course, and though we are not following it exactly, it has good explanations for today's lecture. The relevant sections are "Who can access my data?" on pages 50 - 52 and "Using properties to add behavior to class data" on pages 129 - 137.

## Python's built-in visibility restrictions

For security, and to hide implementation details, most programming languages have a way to mark attributes and methods as "private" -- they can only be accessed from within their class.

As Dusty Philips put it, "Python doesn't do that. Python doesn't really believe in enforcing laws that might someday get in your way. Instead, it provides unenforced guidelines and best practices. Technically, all methods and attributes on a class are publicly available."

We cannot prevent external code from viewing or changing an object's attributes (or using its methods).

```python
class Diary:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password
        self.contents: List[str] = []
    
    def write_in_diary(self, password: str, content: str) -> None:
        if password == self.password:
            self.contents += [content]
        else:
            print('Wrong password')

my_diary: Diary = Diary('Rasika', 'password123')

# Elsewhere...
my_diary.password = 'Evil password heheh'

# Meanwhile, me at home...
my_diary.write_in_diary('password123', 'I need to vent') # Wrong password
```

We can, however, put an underscore in the name to nicely ask others to avoid using it.

```python
class Diary:
    def __init__(self, username: str, password: str):
        self.username = username
        self._password = password
        self.contents: List[str] = []
    
    def write_in_diary(self, password: str, content: str) -> None:
        if password == self._password:
            self.contents += [content]
        else:
            print('Wrong password')

my_diary: Diary = Diary('Rasika', 'password123')

# Elsewhere...
my_diary._password = "Intentionally accessing what I shouldn't"

# Meanwhile, me at home...
my_diary.write_in_diary('password123', 'I need to vent') # Still wrong password, but we asked them nicely not to do this
```

Dusty Philips: "Most Python programmers will interpret this as, 'This is an internal variable, think three times before accessing it directly'. But there is nothing stopping them from accessing it if they think it is in their best interest to do so. Yet, if they think so, why should we stop them? We may not have any idea what future uses our classes may be put to."

In other words, the understood convention is that though we _can_ access an attribute named with an underscore, the commonly understood _convention_ is that we don't touch it. It also gets flagged by our linter, which is following the standard PEP8 guidelines for Python.

Two underscores is an even stronger suggestion to keep away. A double underscore (`__`) _mangles_ the name of the attribute so that it requires extra effort to access. The extra effort is that, if we want to access it from outside the class, we have to add `_<classname>` to the attribute.

Here it is with two underscores, and without using the mangling from the outside. Notice that it won't raise an error -- it will just silently fail to access the password attribute.

```python
class Diary:
    def __init__(self, username: str, password: str):
        self.username = username
        self.__password = password
        self.contents: List[str] = []
    
    def write_in_diary(self, password: str, content: str) -> None:
        if password == self.__password:
            self.contents += [content]
            print('it worked')
        else:
            print('Wrong password')

my_diary: Diary = Diary('Rasika', 'password123')

# Elsewhere...
my_diary.__password = "Intentionally accessing what I shouldn't" # Fails to change __pasword (without showing an error)

# Meanwhile, me at home...
my_diary.write_in_diary('password123', 'I need to vent') # Works because the password changing didn't work
```

If we change the outer part to use the name mangling (add `_Diary` to the attribute when accessing it from outside the Diary class), then MyPy and Pylint will both raise errors, but the Python code runs and works anyways.

```python
class Diary:
    def __init__(self, username: str, password: str):
        self.username = username
        self.__password = password
        self.contents: List[str] = []
    
    def write_in_diary(self, password: str, content: str) -> None:
        if password == self.__password:
            self.contents += [content]
            print('it worked')
        else:
            print('Wrong password')

my_diary: Diary = Diary('Rasika', 'password123')

# Elsewhere...
my_diary._Diary__password = "Intentionally accessing what I shouldn't" # Works despite MyPy and Pylint complaints

# Meanwhile, me at home...
my_diary.write_in_diary('password123', 'I need to vent') # Wrong password
```

Notice that that is the object variable (`my_diary`), followed by a dot and one underscore (`._`), then the class name (`Diary`), then two underscores (`__`), and finally the original attribute name (`password`).

Dusty Philips: "name mangling does not guarantee privacy, it only strongly recommends it. Most Python programmers will not touch a double-underscore variable on another object unless they have an extremely compelling reason to do so. However, most Python programmers will not touch a single-underscore variable without a compelling reason either."

## Encapsulation via Properties

What if we want to allow external code to modify or access our attributes, but only in a controlled way? For example, a `Person` class might have an attribute `age: int`, which can be changed to reflect someone's age, but we want to prevent negative numbers. And when we access the `Person`'s `name`, it automatically returns the concatenation of the person's `_first_name` and `_last_name`, which (for some reason) is the required format for our application.

To create an attribute that is re-calculated every time someone externally accesses it (such as concatenating the `_first_name` and `_last_name` each time someone accesses the `name` attribute), we use the `@property` decorator. The name of the method marked with the `@property` decorator becomes the name of this attribute.

```python
class Person:
    def __init__(self, first_name: str, last_name: str):
        self._first_name = first_name
        self._last_name = last_name
    
    @property
    def name(self) -> str:
        return f'{self._first_name} {self._last_name}'


mini: Person = Person('Mini', 'Bhalerao')
print(mini.name) # Mini Bhalerao
```

In the above example, we created what looks like an attribute called `name` from the outside of the `Person` class, but which is actually the concatenation of two inner attributes. (`_first_name` and `_last_name` can still be accessed from the outside, though it is discouraged, like with any other single-underscore attribute.)

To create an attribute which can only be modified in a controlled way (no negative `age`s), we first need to create the corresponding attribute using the `@property` decorator. Then, we can add a "setter" using another method with the same name, marked with the decorator `@age.setter`. The part between the `@` and the period is the name of the attribute. (It's okay that the additional method has the same name, because it also has an additional parameter, so the "method signature" is different.)

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

## Immutability
Determine when to design a class to be immutable, and implement the immutability

<img width="555" height="772" alt="XKCD: Workflow" src="https://github.com/user-attachments/assets/f5ce62de-2dca-4fcc-bf25-d4d4c75b26b2" />
(Source: https://xkcd.com/1172)

Hyrum's Law: "All observable behaviors of your system will be depended on by somebody." ([https://www.hyrumslaw.com](https://www.hyrumslaw.com))
