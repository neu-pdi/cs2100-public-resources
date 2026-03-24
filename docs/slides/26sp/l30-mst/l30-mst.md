---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Minimum Spanning Trees
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

![Slide2](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_2.jpg)

---


![Slide3](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_3.jpg)

---


![Slide4](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_4.jpg)

---


![Slide5](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_5.jpg)

---


![Slide6](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_6.jpg)

<!-- ---

# New data structure: Priority Queue

Priority queue = a list which stores things in order

Natural order (using `__eq__()` and `__lt__()`, etc), not the order in which they were added

<div class="grid grid-cols-2 gap-4">
<div>

<img src="queue.png" alt="Kids standing in a queue" width="300" height="300">

<p><small><small><small><small><small><small>Source: https://www.dreamstime.com/illustration/standing-line.html</small></small></small></small></small></small></p>

</div>
<div>

```python
import heapq

priority_queue: list[int] = []

print(priority_queue)  # []

heapq.heappush(priority_queue, 3)
heapq.heappush(priority_queue, 1)
heapq.heappush(priority_queue, 4)
heapq.heappush(priority_queue, 2)

print(priority_queue)  # [1, 2, 4, 3]
```

</div>
</div>

---

## Priority Queue syntax


```python
smallest = heapq.heappop(priority_queue)  # Remove and return the smallest item
print(smallest)  # 1

print(priority_queue)  # [2, 3, 4]

if priority_queue:  # if it's not empty
    smallest = priority_queue[0]  # Peek at the smallest item without removing it
    print(smallest) # 2

print(priority_queue)  # [2, 3, 4]
```

---

## Poll: What is output?

```python
priority_queue: list[int] = []

heapq.heappush(priority_queue, 5)
heapq.heappush(priority_queue, 3)
heapq.heappush(priority_queue, 6)

print(heapq.heappop(priority_queue))
```

1. 3
2. 5
3. 6 -->

---


![Slide9](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_9.jpg)

---


![Slide10](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_10.jpg)

---


![Slide11](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_11.jpg)

---


![Slide12](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_12.jpg)

---


<!-- ![Slide13](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_13.jpg) -->

# Spanning Tree

## A spanning tree of a graph G is any tree that contains all the vertices in G

---


![Slide14](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_14.jpg)

---


![Slide15](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_15.jpg)

---


![Slide16](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_16.jpg)

---


<!-- ![Slide17](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_17.jpg) -->

# Minimum Spanning Tree

## An MST of a graph G is a tree that connects all the vertices of G with the minimum possible edge weight sum

---


<!-- ![Slide18](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_18.jpg) -->

# Kruskal's Algorithm

## Until all the vertices are connected:

- Choose the edge with the minimum weight
- Add it to the spanning tree unless it causes a cycle

<br />
<br />
<br />

This algorithm is greedy and optimal for finding MSTs.

---


![Slide19](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_19.jpg)

---


![Slide20](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_20.jpg)

---


![Slide21](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_21.jpg)

---


![Slide22](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_22.jpg)

---


![Slide23](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_23.jpg)

---


![Slide24](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_24.jpg)

---


![Slide25](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_25.jpg)

---


![Slide26](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_26.jpg)

---


<!-- ![Slide27](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_27.jpg) -->

## Poll: How can we get the edge with the smallest weight at each step?

1. Store the edges in a sorted list, and remove the first item one by one
2. Store the edges in a regular (non-sorted) list, and search for and remove the smallest item one by one
3. Store the edges in a set, and remove items one by one
4. Store the edges in a hash table, and remove the first item one by one

---


<!-- ![Slide28](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_28.jpg) -->

## Poll: How can we tell if an edge (between `node1` and `node2`) would cause a cycle?

1. Union-find: if the `find` operation returns the same root for both `node1` and `node2`, then that edge would cause a cycle. Otherwise, it wouldn't.
2. Union-find: if the find operation for `node1` returns `node2`, or vice versa, then that edge would cause a cycle. Otherwise, it wouldn't.
3. Recursive backtracking: starting at `node1`, search for all nodes that can be reached. If `node2` is in that set, then that edge would cause a cycle. Otherwise, it wouldn't.

---


<!-- ![Slide29](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_29.jpg) -->

# Kruskal's Algorithm (formal)

1. Create a forest F (a set of trees), where each vertex in the graph is a separate tree.
<br />

2. Create a sorted list S containing all the edges in the graph.
<br />

3. While S is non-empty and F is not a spanning tree,
   1. Remove the edge with the minimum weight from S.
   2. If the removed edge connects two different trees, then add it to the forest F, combining two trees into a single tree.

<br />

https://en.wikipedia.org/wiki/Kruskal%27s_algorithm

---


<!-- ![Slide30](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_30.jpg) -->

## Kruskal's Algorithm (formal, but applied to public transit)

#### 1. Create a forest F (a set of trees), where each vertex in the graph is a separate tree.
Create a union-find node for each station, where the data is the station and the parent is itself (root)

#### 2. Create a sorted list S containing all the edges in the graph.
Create a graph edge between possible each pair of stations, and put all these edges in a sorted list

#### 3. While S is non-empty and F is not a spanning tree
There are some stations `s1` and `s2` such that the train cannot get from `s1` to `s2`
The Union-Find still has multiple trees in it

---


<!-- ![Slide31](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_31.jpg) -->

# Another Example MST
# (different weights)

---


![Slide32](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_32.jpg)

---


![Slide33](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_33.jpg)

---


![Slide34](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_34.jpg)

---


![Slide35](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_35.jpg)

---


![Slide36](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_36.jpg)

---


![Slide37](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_37.jpg)

---


![Slide38](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_38.jpg)

---


![Slide39](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_39.jpg)

---


![Slide40](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_40.jpg)

---


![Slide41](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_41.jpg)

---


<!-- ![Slide42](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_42.jpg) -->

## Poll: Which of the following are true?

1. To iterate through the edges, smallest to largest, we can store them in a sorted list
2. To determine whether adding an edge would cause a cycle, we can use union-find to see if they are already in the same tree
3. We complete Kruskal's Algorithm when each node has at least one edge connected to it in the tree
4. The weighted graph edges chosen for the MST are different from the directed parent edges used for union-find

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?