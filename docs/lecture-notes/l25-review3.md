---
sidebar_position: 26
lecture_number: 26
title: Review for Quiz 3
---

# Review for Quiz 3

## Properties

It is recommended to review these topics:
- `@property` and `*.setter` decorators
- Accessing attributes named using `_` or `__`

## Inheritance and abstract methods

It is recommended to review these topics:
- What `@abstractmethod` does
- Rules for when you can instantiate a class

- What is inherited by subclasses (methods and attributes that aren't named with two underscores)
- Overwriting inherited methods
- Calling a superclass's method or constructor

## Iterator and Comparable

It is recommended to review this table:

|  | Iterable | Iterator |
| - | - | - |
| Protocol's required methods | `__iter__(self) -> Iterator[T]`: returns an iterator | `__next__(self) -> T`: returns the next element or raises `StopIteration` <br /> `__iter__(self) -> Iterator[T]` : returns itself |
| `abc` interface's required methods | `__iter__(self) -> Iterator[T]` (same as protocol) | `__next__(self) -> T` (same as protocol) <br /> not `__iter__(self) -> Iterator[T]` because it's aleady there |

- Implementing the Comparable protocol
- Checking for inconsistencies between implemented Comparable methods
- Rules for using `<`, `>`, etc.
