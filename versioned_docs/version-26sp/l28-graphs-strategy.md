---
sidebar_position: 28
lecture_number: 28
title: Graph Search and Strategy Pattern
---

# Graph Search and Strategy Pattern

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

## Search Algorithms

We saw a Depth-First Search when we discussed search algorithms on trees (and recursive backtracking).

In a depth-first search, we expand the deepest un-expanded node.

If we are search for the "shortest" path from the root of the tree to each node, it makes more sense to expand the _shallowest_ un-expanded node: [BFS images](https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/pages/BFS.pdf)
A Breadth-First Search (BFS) tells us the shortest distance from the root to each node.

If the tree / graph has edges with different weights (or distances), then a variant of BFS called Uniform Cost Search will give us the shortest distance from the root to each node: [Uniform Cost Search images](https://github.com/neu-pdi/cs2100-public-resources/blob/main/docs/pages/UniformCost.pdf)

You will not be asked to implement BFS or Uniform Cost Search, but here is the pseudo-code for Uniform Cost Search:
```
UNIFORM-COST-SEARCH(problem):
    node ← the root, with PATH-COST = 0
    frontier ← a priority queue ordered by PATH-COST, with node as its only element
    explored ← an empty set of nodes
    
    loop until the frontier is empty:
        
        node ← POP(frontier)  // chooses the lowest-cost node in frontier
        if node is the only solution we want, then return it and quit the method
        
        add node to explored
        for each child of node:
            if child is not in explored and child is not in frontier:
                INSERT(child, frontier)
            
            else if child is in frontier, but with a higher PATH-COST:
                replace that node in the frontier with this child
```

## Strategy Pattern

### Defining distance

Now that we have graph algorithms to tell us the "shortest distance" between things, we need to define distance.

One part of the analysis for Homework 9 is about defining the distance between train stations. There is the basic measure of Euclidean distance, which we use in the code, but there are many more definitions of distance.

For example, we could say, "the station is 15 minutes from here," and that would be a meaningful distance. In that case, we would be defining the distance as the number of minutes it takes to travel between the two nodes.

We also explore defining the distance between two stations as the financial cost of building the track between them (which is bigger if we have to dig a tunnel underwater or through a mountain), or defining it as as `1/n`, where `n` is the number of passengers who regularly travel between the two stations.

### Strategy Pattern

So, we have many definitions of distance, but only one definition of Uniform Cost Search.

Suppose we want to write an algorithm to find the shortest path between two physical locations, but using a definition of distance that is chosen by the user at run time. For example, the user might choose that they want the path that takes the least time, or the one that makes the fewest greenhouse gas emissions. To efficiently write a program that performs Uniform Cost Search to solve this problem, we need to allow the definition of distance to be chosen at runtime. The Strategy Pattern solves this problem.

The Strategy Pattern (also known as the Duration Pattern) allows us to choose an algorithm at runtime.

Example: Strategies for playing Tic Tac Toe
- Place a third piece in a row to win
- Block the opponent if they're about to win
- Place in an open corner
- Place in any open square
The strategy for choosing a place changes based on the game state.

Example: maps directions
- Shortest path
- Shortest time
- Least emissions
- Least tolls
- Maximize sightseeing
The user chooses the path-finding algorithm at runtime.

<img width="780" height="476" alt="Strategy UML" src="https://github.com/user-attachments/assets/4625cc87-ec7f-45aa-b5c7-4c404c7b510e" />

Poll: Why do we use composition to hold the Strategy (instead of inheritance through subclasses)?
1. Because subclasses of the Strategy class would not work properly
2. Using inheritance would require methods to copy over the history when we switch strategies (it would need a method for every possible pair of strategies)
3. When we invent a new Strategy, if we were using inheritance, we would need to write methods to copy over the history to/from that new Strategy
4. Um actually, we do use inheritance to extend the Strategy, not composition to hold it​

Example: There are many algorithms to sort a list. One of the most efficient, especially for long lists, is called [Merge Sort](https://en.wikipedia.org/wiki/Merge_sort#/media/File:Merge-sort-example-300px.gif).
The only time when Merge Sort is not the most efficient is when the length of the list is short (fewer than, say, 30 elements). For short lists, [Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort#/media/File:Insertion_sort.gif) is more efficient.

Insertion Sort: Insert each element into the right position in the list s.t. it's sorted
- O(n^2)

Merge Sort:
1. Split the list in half
2. Sort each half (recursion)
3. Merge the two halves together
- O(n log n)​

​Merge Sort is usually faster, but Insertion Sort is faster for short lists ( < 30).

Here, the `AdaptiveSorter` chooses the correct sorting strategy based on the length of the list.
Let's step through it with the debugger:
```python
from abc import ABC, abstractmethod
from typing import TypeVar, Protocol, Optional

T = TypeVar('T')

class Comparable(Protocol):
    """Ensures that generic objects can be compared with < operator."""
    @abstractmethod
    def __lt__(self: T, other: T) -> bool:
        """Return True if self is less than other."""
        pass
    @abstractmethod
    def __le__(self: T, other: T) -> bool:
        """Return True if self is less than or equal to other."""
        pass
    @abstractmethod
    def __gt__(self: T, other: T) -> bool:
        """Return True if self is greater than other."""
        pass
    @abstractmethod
    def __ge__(self: T, other: T) -> bool:
        """Return True if self is greater than or equal to other."""
        pass

# Use the Comparable protocol with a generic TypeVar
CT = TypeVar("CT", bound=Comparable)

class SortingStrategy(ABC):
    """Interface for sorting strategies."""
    
    @abstractmethod
    def sort(self, data: list[CT]) -> list[CT]:
        """Return a sorted version of the original list."""
        pass

class InsertionSortStrategy(SortingStrategy):
    """Insertion sort strategy - efficient for small lists."""
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort using insertion sort algorithm."""
        if len(data) <= 1:
            return data.copy()
        
        result = data.copy()
        for i in range(1, len(result)):
            key = result[i]
            j = i - 1
            # Move elements greater than key one position ahead
            while j >= 0 and key < result[j]:
                result[j + 1] = result[j]
                j -= 1
            result[j + 1] = key
        
        return result

class MergeSortStrategy(SortingStrategy):
    """Merge sort strategy - efficient for large lists."""
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort using merge sort algorithm."""
        if len(data) <= 1:
            return data.copy()
        
        return self._sort(data.copy())
    
    def _sort(self, arr: list[CT]) -> list[CT]:
        """Recursive merge sort implementation."""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2

        left = self.sort(arr[:mid])
        right = self.sort(arr[mid:])
        
        return self._merge(left, right)
    
    def _merge(self, left: list[CT], right: list[CT]) -> list[CT]:
        """Merge two sorted lists."""
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        
        # Add remaining elements
        result.extend(left[i:])
        result.extend(right[j:])
        
        return result

class AdaptiveSorter(MergeSortStrategy):
    """Sorter that chooses strategy based on list size."""
    
    def __init__(self, fallback_strategy: Optional[SortingStrategy] = None, threshold: int = 30):
        self.threshold = threshold
        if fallback_strategy is not None:
            self.fallback = fallback_strategy
        else:
            self.fallback = InsertionSortStrategy()
    
    def sort(self, data: list[CT]) -> list[CT]:
        """Sort the data using the appropriate strategy."""
        if len(data) < self.threshold:
            return self.fallback.sort(data)
        else:
            return super().sort(data)
        

# Example usage
if __name__ == "__main__":
    # Small list (insertion sort)
    small_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"Small list: {small_list}")
    
    sorter = AdaptiveSorter()
    sorted_small = sorter.sort(small_list)
    print(f"Sorted small list: {sorted_small}")
    
    # Large list (merge sort)
    large_list = list(range(50, 0, -1))  # [50, 49, 48, ..., 1]
    print(f"\nLarge list: {large_list[:10]}... (50 elements)")
    
    sorted_large = sorter.sort(large_list)
    print(f"Sorted large list: {sorted_large[:10]}... (first 10 elements)")
```
