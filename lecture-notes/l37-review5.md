---
sidebar_position: 37
lecture_number: 37
title: Final Exam Review and Interview Prep
---

# Final Exam Review and Interview Prep

## Properties (attributes with getters and setters)

It is recommended to review these topics:
- `@property` and `*.setter` decorators
- Accessing attributes named using `_` or `__`

## Lists: sorting, mapping, filtering

It is recommended to review these topics:
- Syntax for list comprehension
- Syntax for sorting lists
- Syntax for filtering a list (with list comprehension)

## Abstract methods

It is recommended to review these topics:
- What `@abstractmethod` does
- Rules for when you can instantiate a class

## Inheritance

It is recommended to review these topics:
- What is inherited by subclasses (methods and attributes that aren't named with two underscores)
- Overwriting inherited methods
- Calling a superclass's method or constructor

## Interpreting UML diagrams

It is recommended to review these topics:
- The three parts of the UML diagram for a single class (name, attributes, methods)
- How to depict an abstract class
- How to depict an abstract method
- How to depict methods / attributes that are intended to be publicly accessed versus not publicly accessed
- How to use arrows depict the relationships between classes

## Identifying privacy issues

It is recommended to review these topics:
- Answering the five main questions:
  - What type of information is shared?
  - Who is the subject of the information?
  - Who is the sender of the information?
  - Who are the potential recipients of the information?
  - What principles govern the collection and transmission of this information?
- Determining the right balance of tradeoffs for these five questions

## Coupling / cohesion / encapsulation

It is recommended to review these topics:
- Identifying and mitigating coupling between two or more classes
- Identifying and mitigating lack of cohesion in a class
- How to further enhance encapsulation in an existing class

## Iterator

It is recommended to review this table:

|  | Iterable | Iterator |
| - | - | - |
| Protocol's required methods | `__iter__(self) -> Iterator[T]`: returns an iterator | `__next__(self) -> T`: returns the next element or raises `StopIteration` <br /> `__iter__(self) -> Iterator[T]` : returns itself |
| `abc` interface's required methods | `__iter__(self) -> Iterator[T]` (same as protocol) | `__next__(self) -> T` (same as protocol) <br /> not `__iter__(self) -> Iterator[T]` because it's aleady there |


## Comparable

It is recommended to review these topics:
- Implementing the Comparable protocol
- Checking for inconsistencies between implemented Comparable methods
- Rules for using `<`, `>`, etc.

## Recursion

It is recommended to review these topics:
- Tracing recursive functions
- Determining the relative efficiency of recursive functions
- Identifying bugs in recursive functions

## Minimum Spanning Trees

It is recommended to review these topics:
- Definition of a MST
- Kruskal's Algorithm


## Practice Final Exam

Practice final exam: https://github.com/neu-pdi/cs2100-public-resources/blob/main/src/pages/quizzes/Practice%20Final%20Exam.pdf

Solution: https://github.com/neu-pdi/cs2100-public-resources/blob/main/src/pages/quizzes/Practice%20Final%20Exam%20Solution.pdf
