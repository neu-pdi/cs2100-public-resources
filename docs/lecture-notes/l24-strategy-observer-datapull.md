---
sidebar_position: 24
lecture_number: 24
title: "Design patterns: Strategy, Observer, and \"Data Pull\""
---

# Design patterns: Strategy, Observer, and Data Pull

## Design Patterns

This semester, we have already covered a few _design patterns_: structures or templates that software engineers have agreed solve common software problems.

- In [Lecture 11 (Lists)](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l11-lists#the-accumulator-pattern), we covered the Accumulator Pattern: the pattern that we use to add up, or _accumulate_, a sequence of items.
- We had a few [lectures on design patterns for handling data](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l15-design-data1), including mapping, filtering, and merging dataframes.

Design patterns:
- are independent of programming language
- are flexible (the overarching pattern allows modifications)
- provide us a common vocabulary to communicate "blueprints" for standard patterns

## Data Pull pattern

(Modeled after this lecture: https://neu-se.github.io/CS4530-Spring-2024/Slides/Module%2005%20Interaction-Level%20Design%20Patterns.pdf)

### Information transfer: push versus pull

Consider this situation where a Producer produces some data, and a Consumer uses that data:
```python
class Producer:
    def get_data(self) -> int:
        return 500

class Consumer:
    def do_some_work(self) -> None:
        self.do_something(self.needed_data)

    def do_something(self, data: int) -> None:
        # Placeholder for actual work
        pass
```
How can we get the data from the producer to the consumer?

### "Data pull" pattern: consumer asks producer

```python
class Producer:
    def get_data(self) -> int:
        return 500

class Consumer:
    def __init__(self, producer: Producer):
        self.producer = producer

    def do_some_work(self) -> None:
        needed_data = self.producer.get_data()
        self.do_something(needed_data)

    def do_something(self, data: int) -> None:
        # Placeholder for actual work
        pass
```
- The consumer knows about the producer
- The producer has a method that the consumer can call
- The consumer asks the producer for the data

### Example: Pulling clock

The interface for a clock following the "Data pull" pattern:
```python
class IPullingClock(ABC):
    @abstractmethod
    def reset(self) -> None:
        """Sets the time to 0."""
        pass

    @abstractmethod
    def tick(self) -> None:
        """Increments the time."""
        pass

    @abstractmethod
    def get_time(self) -> int:
        """Returns the current time."""
        pass
```

Here, `SimpleClock` implements the `IPullingClock` interface and acts as the "producer", and `ClockClient` is the "consumer":
```python
# Producer
class SimpleClock(IPullingClock):
    def __init__(self) -> None:
        self.time = 0

    def reset(self) -> None:
        self.time = 0

    def tick(self) -> None:
        self.time += 1

    def get_time(self) -> int:
        return self.time

# Consumer
class ClockClient:
    def __init__(self, the_clock: IPullingClock):
        self.the_clock = the_clock

    def get_time_from_clock(self) -> int:
        return self.the_clock.get_time()
```

## Observer pattern

Potential problem with the clock example above:
- What if the clock ticks once per second, but there are dozens of clients, each asking for the time every 10 msec?
- Our clock might be overwhelmed!
- Can we do better for the situation where the clock updates rarely, but the clients need the values often?

### Observer pattern: producer tells consumer ("push")

```python
class Consumer:
    def __init__(self) -> None:
        self.needed_data = 0

    def receive_notification(self, data_value: int) -> None:
        self.needed_data = data_value

    def do_some_work(self) -> None:
        self.do_something(self.needed_data)

    def do_something(self, data: int) -> None:
        # Placeholder for actual work
        print(f"Doing something with data: {data}")


class Producer:
    def __init__(self, consumer: Consumer) -> None:
        self.consumer = consumer
        self.the_data = 0

    def update_data(self, input_value: int) -> None:
        self.the_data = self.do_something_with_input(input_value)
        # notify the consumer about the change:
        self.consumer.receive_notification(self.the_data)

    def do_something_with_input(self, input_value: int) -> int:
        # Placeholder for actual processing logic
        return input_value * 2  # Example processing
```
- Producer notifies the consumer whenever the data is updated
- Probably more than one consumer

Other names for the Observer pattern:
- Listener pattern
- Publish-subscribe pattern


The object being observed (the "subject") keeps a list of the objects who need to be notified when something changes.
- subject = producer = publisher
- observer = consumer = subscriber = listener
- If a new object wants to be notified when the subject changes, it registers ("subscribes") with the subject.

### Example: Pushing clock

The interface for a clock following the Observer pattern:
```python
class IPushingClock(ABC):
    @abstractmethod
    def reset(self) -> None:
        """Resets the time to 0."""
        pass

    @abstractmethod
    def tick(self) -> None:
        """Increments the time and sends a notification with the
        current time to all consumers."""
        pass

    @abstractmethod
    def add_listener(self, listener: 'IPushingClockClient') -> int:
        """Adds another consumer and initializes it with the current time."""
        pass

class IPushingClockClient(ABC):
    @abstractmethod
    def receive_notification(self, t: int) -> None:
        """Notifies the client with the current time."""
        pass
```

Here, `PushingClock` implements the `IPushingClock` interface and acts as the "producer", and `PushingClockClient` is the "consumer":
```python
# Producer
class PushingClock(IPushingClock):
    def __init__(self) -> None:
        self.observers: list[IPushingClockClient] = []
        self.time = 0

    def add_listener(self, listener: 'IPushingClockClient') -> int:
        self.observers.append(listener)
        return self.time

    def notify_all(self) -> None:
        for obs in self.observers:
            obs.receive_notification(self.time)

    def reset(self) -> None:
        self.time = 0
        self.notify_all()

    def tick(self) -> None:
        self.time += 1
        self.notify_all()

# Consumer
class PushingClockClient(IPushingClockClient):
    def __init__(self, the_clock: IPushingClock) -> None:
        self.time = the_clock.add_listener(self)

    def receive_notification(self, t: int) -> None:
        self.time = t
```

The observer gets to decide what to do with the notification.
Here is another class which implements the `IPushingClock` interface and acts as the "producer" (with `PushingClockClient` as the "consumer"):
```python
class DifferentClockClient(IPushingClockClient):
    """A client that receives notifications from a clock and
    stores TWICE the current time."""
    def __init__(self, the_clock: IPushingClock) -> None:
        self.twice_time = the_clock.add_listener(self) * 2
        self.notifications: list[int] = []
    
    def receive_notification(self, t: int) -> None:
        self.notifications.append(t)
        self.twice_time = t * 2
```

### Push versus pull: tradeoffs

| Pull | Push |
| - | - |
| Consumer knows about the Producer | Producer knows about the Consumer(s) |
| Producer must have a method that the Consumer can call | Consumer must have a method that Producer can use to notify it |
| Consumer asks the Producer for the data | Producer notifies the Consumer whenever the data is updated |
| Better when updates are more frequent than requests | Better when updates are rarer than requests |

### Details and variants

- How does the consumer get an initial value?
  - Here we’ve had the producer supply it when the consumer registers
- Should there be an unsubscribe method?
- What data should be passed with the notification?
- How does the producer store its registered consumers?
  - If many consumers, this could be an issue
- "There’s a package for that"

Poll: Which of these scenarios might be well-served with the Observer pattern?
1. a spreadsheet application: when a cell value changes, other dependent cells all update automatically
2. database search results: instead of loading all query results at once, it pulls data in "chunks" as needed. The user's scrolling triggers a request for the next "chunk"
3. when a news service publishes articles, it sends notifications to the subscribers (email, mobile news apps, social media, archives)
4. API rate limiting: let clients request data at their processing speed. The API server's data processing pipeline processes new jobs only when it's ready, preventing queue overflow.
Note: Those where are not the Observer pattern are the Data Pull pattern.

## Strategy pattern

### Finding the shortest path using Uniform Cost Search

We saw a Depth-First Search when we discussed [search algorithms on trees (and recursive backtracking)](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l28-trees#search-algorithms).

In a depth-first search, we expand the deepest un-expanded node (revisit [DFS images/slides](https://neu-pdi.github.io/cs2100-public-resources/lecture-notes/l28-trees/#search-algorithms))

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

### Defining distance

Now that we have multiple graph algorithms to tell us the "shortest distance" between things (root and each node, or the minimum spanning tree using Kruskal's Algorithm), we need to define distance.

One part of the analysis for Homework 9 is about defining the distance between train stations. There is the basic measure of Euclidean distance, which we use in the code, but there are many more definitions of distance.

For example, we could say, "the station is 15 minutes from here," and that would be a meaningful distance. In that case, we would be defining the distance as the number of minutes it takes to travel between the two nodes.

We also explore defining the distance between two stations as the financial cost of building the track between them (which is bigger if we have to dig a tunnel underwater or through a mountain), or defining it as as `1/n`, where `n` is the number of passengers who regularly travel between the two stations.

### Strategy pattern

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
from typing import List, TypeVar, Protocol, Optional

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
    def sort(self, data: List[CT]) -> List[CT]:
        """Return a sorted version of the original list."""
        pass

class InsertionSortStrategy(SortingStrategy):
    """Insertion sort strategy - efficient for small lists."""
    
    def sort(self, data: List[CT]) -> List[CT]:
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
    
    def sort(self, data: List[CT]) -> List[CT]:
        """Sort using merge sort algorithm."""
        if len(data) <= 1:
            return data.copy()
        
        return self._sort(data.copy())
    
    def _sort(self, arr: List[CT]) -> List[CT]:
        """Recursive merge sort implementation."""
        if len(arr) <= 1:
            return arr
        
        mid = len(arr) // 2

        left = self.sort(arr[:mid])
        right = self.sort(arr[mid:])
        
        return self._merge(left, right)
    
    def _merge(self, left: List[CT], right: List[CT]) -> List[CT]:
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
    
    def sort(self, data: List[CT]) -> List[CT]:
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



