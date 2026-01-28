---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# Design patterns: Strategy, Observer, and "Data Pull"
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

# Design Patterns

Already covered a few _design patterns_: structures or templates that software engineers have agreed solve common software problems

- Lists: Accumulator Pattern (add up, or _accumulate_, a sequence of items)
- Design patterns for handling data: mapping, filtering, and merging dataframes

## Design patterns:
- are independent of programming language
- are flexible (the overarching pattern allows modifications)
- provide us a common vocabulary to communicate "blueprints" for standard patterns

---

# "Data Pull" pattern

Modeled after this lecture: https://neu-se.github.io/CS4530-Spring-2024/Slides/Module%2005%20Interaction-Level%20Design%20Patterns.pdf

---

## Information transfer: push versus pull

Producer produces some data, Consumer uses that data:

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

---

## "Data pull" pattern: consumer asks producer

<div class="grid grid-cols-2 gap-4">
<div>

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

</div>
<div>


- Consumer knows about producer
- Producer has a method that consumer can call
- Consumer asks producer for the data

</div>
</div>

---

<div class="grid grid-cols-2 gap-4">
<div>

# Example: Clock using "Data pull" pattermn

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

</div>
<div>

`SimpleClock` (producer) implements `IPullingClock` interface, `ClockClient` is consumer:

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

</div>
</div>

---

# Observer pattern

### Potential problem with the "data pull" clock example:

What if the clock ticks once per second, but there are dozens of clients, each asking for the time every 10 msec?

Our clock might be overwhelmed!

Can we do better for the situation where the clock updates rarely, but the clients need the values often?

---

## Observer pattern: producer tells consumer ("push")

<div class="grid grid-cols-2 gap-4">
<div>

```python
class Consumer:
    def __init__(self) -> None:
        self.needed_data = 0

    def receive_notification(
        self, data_value: int
    ) -> None:
        self.needed_data = data_value

    def do_some_work(self) -> None:
        self.do_something(self.needed_data)

    def do_something(self, data: int) -> None:
        # Placeholder for actual work
        print(
            f"Doing something with data: {data}")
```

</div>
<div>


```python
class Producer:
    def __init__(
        self, consumer: Consumer
    ) -> None:
        self.consumer = consumer
        self.the_data = 0

    def update_data(
        self, input_value: int
    ) -> None:
        self.the_data = \
            self.do_something_with_input(
                input_value)
        # notify the consumer about the change:
        self.consumer.receive_notification(
            self.the_data)

    def do_something_with_input(
        self, input_value: int
    ) -> int:
        # Placeholder for actual processing logic
        return input_value * 2  # Example processing
```

</div>
</div>

---

## Observer pattern: producer tells consumer ("push")

- Producer notifies the consumer whenever the data is updated
- Probably more than one consumer

AKA Listener pattern, Publish-subscribe pattern


### The object being observed (the "subject") keeps a list of the objects who need to be notified when something changes.

- subject = producer = publisher
- observer = consumer = subscriber = listener
- If a new object wants to be notified when the subject changes, it registers ("subscribes") with the subject.

---

## Example: Pushing clock (Observer pattern)

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

---

## Example: Pushing clock (Observer pattern)

<div class="grid grid-cols-2 gap-4">
<div>

```python
# Producer
class PushingClock(IPushingClock):
    def __init__(self) -> None:
        self.observers: list[IPushingClockClient] = []
        self.time = 0

    def add_listener(
        self, listener: 'IPushingClockClient'
    ) -> int:
        self.observers.append(listener)
        return self.time

    def notify_all(self) -> None:
        for obs in self.observers:
            obs.receive_notification(
                self.time)

    def reset(self) -> None:
        self.time = 0
        self.notify_all()

    def tick(self) -> None:
        self.time += 1
        self.notify_all()
```

</div>
<div>

```python
# Consumer
class PushingClockClient(IPushingClockClient):
    def __init__(self, the_clock: IPushingClock
    ) -> None:
        self.time = the_clock.add_listener(self)

    def receive_notification(self, t: int) -> None:
        self.time = t
```

Observer decides what to do with the notification. Another option:

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

</div>
</div>

---

## Push versus pull: tradeoffs

| Pull | Push |
| - | - |
| Consumer knows about the Producer | Producer knows about the Consumer(s) |
| Producer must have a method that the Consumer can call | Consumer must have a method that Producer can use to notify it |
| Consumer asks the Producer for the data | Producer notifies the Consumer whenever the data is updated |
| Better when updates are more frequent than requests | Better when updates are rarer than requests |

---

## Details and variants

- How does the consumer get an initial value?
  - Here we’ve had the producer supply it when the consumer registers
- Should there be an unsubscribe method?
- What data should be passed with the notification?
- How does the producer store its registered consumers?
  - If many consumers, this could be an issue
- "There’s a package for that"

---

## Poll: Which of these scenarios might be well-served with the Observer pattern?

1. a spreadsheet application: when a cell value changes, other dependent cells all update automatically
2. database search results: instead of loading all query results at once, it pulls data in "chunks" as needed. The user's scrolling triggers a request for the next "chunk"
3. when a news service publishes articles, it sends notifications to the subscribers (email, mobile news apps, social media, archives)
4. API rate limiting: let clients request data at their processing speed. The API server's data processing pipeline processes new jobs only when it's ready, preventing queue overflow.

Note: All options are either Observer or Data Pull pattern.

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?