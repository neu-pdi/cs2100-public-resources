---
sidebar_position: 35
lecture_number: 35
title: Review for Quiz 4
---

# Review for Quiz 4

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

## Decorator, Strategy, Observer, and Data Pull Design Patterns
