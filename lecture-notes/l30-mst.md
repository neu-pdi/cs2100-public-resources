---
sidebar_position: 30
lecture_number: 30
title: Minimum Spanning Trees
---

# Minimum Spanning Trees

Slides: https://github.com/neu-pdi/cs2100-public-resources/blob/main/src/pages/Minimum%20Spanning%20Trees.pdf

## Review union-find
(See slides)

## Priority Queues

New data structure: Priority Queue
```python
import heapq

priority_queue: list[int] = []

print(priority_queue)  # []

heapq.heappush(priority_queue, 3)
heapq.heappush(priority_queue, 1)
heapq.heappush(priority_queue, 4)
heapq.heappush(priority_queue, 2)

print(priority_queue)  # [1, 2, 4, 3]

smallest = heapq.heappop(priority_queue)  # Remove and return the smallest item
print(smallest)  # 1

print(priority_queue)  # [2, 3, 4]

if priority_queue:  # if it's not empty
    smallest = priority_queue[0]  # Peek at the smallest item without removing it
    print(smallest) # 2

print(priority_queue)  # [2, 3, 4]
```

Poll: What is output?
```python
priority_queue: list[int] = []

heapq.heappush(priority_queue, 5)
heapq.heappush(priority_queue, 3)
heapq.heappush(priority_queue, 6)

print(heapq.heappop(priority_queue))
```
1. 3
2. 5
3. 6

## Minimum Spanning Trees

Poll: A tree is a type of graph. What are the differences between a tree and a graph?
1. Each node in a tree must have exactly one parent (unless it is the root)
2. Each node in a tree must have at least one child
3. Trees are required to have at least one cycle
4. Trees are not allowed to have cycles
5. Edges in a tree must be weighted
6. Edges in a tree cannot be weighted

(See slides)

## Kruskal's Algorithm

(See slides)

Poll: How can we get the edge with the smallest weight at each step?
1. Store the edges in a Priority Queue, and remove the front item one by one
2. Store the edges in a regular list, and search for and remove the smallest item one by one
3. Store the edges in a Binary Search Tree (SortedSet) and remove the leftmost node one by one
4. Store the edges in a Hash Table and remove the leftmost node one by on

Poll: How can we tell if an edge (between node1 and node2) would cause a cycle?
1. Union-find: If the find operation returns the same root for both node1 and node2, then that edge would cause a cycle
2. Union-find: If the find operation for node1 returns node2, or vice versa, then that edge would cause a cycle
3. Recursive backtracking: starting at node1, search for all nodes that can be reached. If node2 is in that set, then that edge would cause a cycle

(See slides)

Poll: Which of the following are true?
1. To iterate through the edges, smallest to largest, we can store them in a Priority Queue
2. To determine whether adding an edge would cause a cycle, we can use union-find to see if they are already in the same tree
3. We complete Kruskal's Algorithm when each node has at least one edge connected to it in the tree
4. The weighted graph edges chosen for the MST are different from the directed parent edges used for union-fin

