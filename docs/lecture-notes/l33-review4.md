---
sidebar_position: 33
lecture_number: 33
title: Review for Quiz 4
---

# Review for Quiz 4

## Stakeholder-value matrices (revisited from Quiz 2)

It is recommended to review these topics:
- Selecting stakeholders
- Selecting values

## Correlation (revisited from Quiz 2)

It is recommended to review these topics:
- Definition of correlation
- Pearson's correlation coefficient

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


## Practice Quiz 4

Practice quiz: https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/quizzes/Practice%20Quiz%204.pdf

Solution: https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/quizzes/Practice%20Quiz%204%20Solution.pdf
