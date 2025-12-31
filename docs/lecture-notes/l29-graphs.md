---
sidebar_position: 29
lecture_number: 29
title: Graph Search Algorithms
---

# Graph Search Algorithms

## Graphs

We worked with trees last time. And we mentioned that if it has a cycle, then it's not a tree. It's a graph.

Graphs are useful. Let's write a graph for a social network:

```python
class Person:
    def __init__(self, person_id: str):
        self.id = person_id
        self.friends: set[Person] = set()
    
    def __str__(self) -> str:
        return self.id
    
    def __repr__(self) -> str:
        return self.__str__()

class SocialGraph:
    def __init__(self, location: str) -> None:
        self.people: set[Person] = set()
        self.location = location
    
    def __str__(self) -> str:
        return f'People in {self.location}: {self.people}'


students = SocialGraph('Oakland')

me = Person('Rasika')
students.people.add(me)

mini = Person('Mini')
students.people.add(mini)

me.friends.add(mini)
mini.friends.add(me)

print(students)  # People in Oakland: {Mini, Rasika}

famous_person = Person('Famous')
students.people.add(famous_person)

me.friends.add(famous_person)
mini.friends.add(famous_person)

print(me.friends)  # {Mini, Famous}
print(mini.friends)  # {Rasika, Famous}
print(famous_person.friends)  # set()
```

Terminology:
- Directed: the edges point _from_ one node, _to_ another
- Undirected: the edges do not have a specific direction; all edges go both ways

Poll: Is our social media graph above directed or undirected?
1. Directed
2. Undirected
