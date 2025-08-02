---
sidebar_position: 29
lecture_number: 29
title: Graphs and Union-Find
---

# Graphs and Union-Find

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

## Union-Find

Union Find slides: https://github.com/neu-pdi/cs2100-public-resources/blob/main/src/pages/Union%20Find.pdf (Polls below)
<embed src="https://github.com/neu-pdi/cs2100-public-resources/blob/main/src/pages/Union%20Find.pdf" type="application/pdf" width="100%" height="600px" title="Union Find Slides" />

Poll: How might we implement find(node)?
1. As long as node has no children, re-point the node variable to its parent. When node has children, return it
2. As long as node is not its own parent, re-point the node variable to its parent. When node is its own parent, return it
3. If node is its own parent, return the node. Otherwise, return find(node.parent)
4. If node's parent is null, return the node. Otherwise, return find(node.parent)

Poll: How might we implement union(node1, node2)?
1. Find both nodes' roots. If the two roots are different, then make one of the roots the other root's parent
2. Find both nodes' roots. If the two roots are the same, then do nothing
3. If the two nodes have different parents, then make one of the nodes the other node's parent
4. If the two nodes have the same parent, then make one of the nodes the other node's parent

Poll: Why do we check if root1.rank == root2.rank before incrementing root2.rank?
1. That's wrong - we should always increment root2.rank
2. That's wrong - we should always increment both root1.rank and root2.rank
3. If they have the same rank, then they have the same height in the tree. If root2 becomes root1's parent, then root2 is going higher up in the tree
4. If they have the same rank, then they have the same number of children. If root2 becomes root1's parent, then root2 is getting another child

Poll: What does the Union-Find algorithm do?
1. ​​It groups nodes into sets such that none of the nodes in each set are connected to each other, and all of the edges are between two sets
2. It groups nodes into sets such that the nodes in each set are connected to each other, and there are no edges between two sets
3. It groups edges into sets such that none of the sets of edges have any nodes in common
4. It works on undirected graphs (all edges go both ways)
5. It works on directed graphs (all edges are one-way)
