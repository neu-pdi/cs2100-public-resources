---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Quiz 4 Review
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

<style scoped>
section {
    font-size: 25px;
}
</style>

<div class="grid grid-cols-2 gap-4">
<div>

# Revisited topics

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

- Stakeholder-value matrices
  - Selecting stakeholders
  - Selecting values

- Correlation
  - Definition of correlation
  - Pearson's correlation coefficient

</div>
</div>

---

<style scoped>
section {
    font-size: 25px;
}
</style>

<div class="grid grid-cols-2 gap-4">
<div>

# New Quiz 4 Topics

## Iterator and Comparable

- Iterable and Iterator protocols and interfaces

- Comparable protocol
- Checking for inconsistencies
- Rules for using `<`, `>`, etc.

## Decorator, Strategy, Observer, and Data Pull Design Patterns

- Why and how to make a function decorator
- When to use the Strategy pattern (and how)
- When to use Observer versus Data Pull (and how)

</div>
</div>

---

# Iterable / Iterator

|  | Iterable | Iterator |
| - | - | - |
| Protocol's required methods | `__iter__(self) -> Iterator[T]`: returns an iterator | `__next__(self) -> T`: returns the next element or raises `StopIteration` <br /> `__iter__(self) -> Iterator[T]` : returns itself |
| `abc` interface's required methods | `__iter__(self) -> Iterator[T]` (same as protocol) | `__next__(self) -> T` (same as protocol) <br /> not `__iter__(self) -> Iterator[T]` because it's aleady there |

---

## Exercise: let's write a class `Sarcasm`, which is like a `str`, but when we iterate over it, it capitalizes a random half of the letters

<style scoped>
section {
    font-size: 22px;
}
</style>

```python
import random
from collections.abc import Iterable, Iterator

class Sarcasm(Iterable[str]):
    def __init__(self, text: str):
        self.text = text
    
    def __iter__(self) -> Iterator[str]:
        return SarcasmIterator(self.text)

class SarcasmIterator(Iterator[str]):
    def __init__(self, text: str):
        self.remaining_text = text
    
    def __next__(self) -> str:
        if len(self.remaining_text) == 0:
            raise StopIteration
        next_char = self.remaining_text[0]
        next_char = next_char.lower() if random.randint(0, 1) == 0 else next_char.upper()
        self.remaining_text = self.remaining_text[1:]
        return next_char

print(''.join(letter for letter in Sarcasm('hi rasika')))
```

---

# Comparable

- `__eq__(self, other: object) -> bool`: equals `==`
- `__ne__(self, other: object) -> bool`: not equals `!=`
- `__lt__(self, other: object) -> bool`: less than `<`
- `__le__(self, other: object) -> bool`: less than or equal to `<=`
- `__gt__(self, other: object) -> bool`: greater than `>`
- `__ge__(self, other: object) -> bool`: greater than or equal to `>=`

#### Don't need all six (which is why there's no interface)
#### Common: Implement `__eq__()` and one ordering method like `__lt__()`

`a < b` calls `a.__lt__(b)` or `not a.__ge__(b)` or `not (a.__gt__(b) or a == b)`

---

## Poll: How can we check for inconsistencies between comparison methods?

1. If they use the same attributes for comparison, then they must be consistent.
2. If `__eq__()` says A is equal to B, and `__gt__()` says A is greater than B, then they are inconsistent.
3. If `__le__()` says A is less than or equal to B, and `__ge__()` says A is greater than or equal to B, then they are inconsistent.
4. If all six comparison methods are implemented, then they must be inconsistent.

---

<style scoped>
section {
    font-size: 23px;
}
</style>

# Decorator, Strategy, Observer, and Data Pull Design Patterns

| Design pattern | When to use it | How to use it |
| - | - | - |
| (Function) Decorator | When we want to modify a function's behavior | Write a function that takes and returns a function, use its `@function_name` as the decorator |
| Strategy | When we want to choose an algorithm at runtime | Have each algorithm option implement an interface, and use that interface in the main program |
| Observer | When many objects request the same data over and over | Make the data producer keep a list of consumers to be updated every time the data changes |
| Data Pull | When data gets updated often, but requests for that data happen less often | Make each consumer call the same method in the data producer |

---

# Practice Quiz 4

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?