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

## Polymorphism

Identify, implement, and use polymorphism where different classes implement the same method

## Encapsulation

Poll: identify when encapsulation could be improved (and how)

## Coupling and cohesion
