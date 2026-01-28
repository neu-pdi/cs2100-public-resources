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

---

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
3. 6

---


![Slide9](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_9.jpg)

---


![Slide10](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_10.jpg)

---


![Slide11](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_11.jpg)

---


![Slide12](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_12.jpg)

---


![Slide13](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_13.jpg)

---


![Slide14](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_14.jpg)

---


![Slide15](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_15.jpg)

---


![Slide16](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_16.jpg)

---


![Slide17](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_17.jpg)

---


![Slide18](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_18.jpg)

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


![Slide27](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_27.jpg)

---


![Slide28](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_28.jpg)

---


![Slide29](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_29.jpg)

---


![Slide30](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_30.jpg)

---


![Slide31](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_31.jpg)

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


![Slide42](MST/1762559186797-32fc6d2f-5225-4756-afa6-12d4b7d35c9c_42.jpg)

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?