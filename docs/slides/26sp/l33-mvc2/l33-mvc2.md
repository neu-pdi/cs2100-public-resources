---
marp: true
style: @import url('https://unpkg.com/tailwindcss@^2/dist/utilities.min.css');

---

# The Model View Controller Paradigm and 
# Mocks (how we tested HW that required external resources)
## Welcome back to CS 2100!
## Prof. Rasika Bhalerao

---

## Recall: separation of concerns between Model, View, and Controller

<img width="700" height="500" alt="MVC" src="https://github.com/user-attachments/assets/106a8429-855f-4b40-976b-8aa2ab137492" />

<style scoped>
section {
    font-size: 18px;
}
</style>

Image source: https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/

---

## Synchronous versus Asynchronous Controllers

- Synchronous: sequential
  - Often one large loop in controller's `go()` method
  - "get input, pass input to model, get state and pass to view, ..."
  - Must finish one task before moving on to the next
- Asynchronous: event-driven, reacts to user input
  - Works well when input comes from GUI buttons
  - Instead of a large loop, each reaction to a button/user action is its own method
  - Order of action completion doesn't matter

---

## Poll: Which type of controller for: a security alarm that rings when the door is opened​

1. Synchronous
2. Asynchronous

---

## Poll: Which type of controller for: a group chat messaging platform (iMessage or Discord)

1. Synchronous
2. Asynchronous

---

## Poll: Which type of controller for: a "flat tire" sensor for a car

1. Synchronous
2. Asynchronous

---

## Poll: Which type of controller for: a traffic light

1. Synchronous
2. Asynchronous

---

## Poll: Which type of controller for: a vending machine (while someone is buying something)

1. Synchronous
2. Asynchronous

---

## Poll: Which type of controller for: this "password reset" GUI
<img width="770" height="474" alt="reset password GUI" src="https://github.com/user-attachments/assets/efd21adb-f9bf-4265-a3a5-634101fa6fb9" />

<style scoped>
section {
    font-size: 18px;
}
</style>

Source: https://documentation.sysaid.com/docs/step-3-reset-password

1. Synchronous
2. Asynchronous

---

## GUI View using tkinkter

There are GUIs in some homework assignments, but they are already provided. Students do not need to write or modify GUI code in CS 2100.

Let's look at a GUI in Python using the popular GUI library `tkinter`. It allows the user to two numbers and click a "Sum" button to see their sum.

Notice: The View's interface, `CalculatorViewInterface`, is implemented by a class `CalculatorView`, which is the GUI. But it could instead be implemented using `input()` and `print()` statements for a purely text-based command-line version of the View.

---

## Testing the controller

Add this bug to the controler. Ideally, tests would catch it.

```python
# If both inputs are valid, calculate sum using model
if num1 is not None and num2 is not None:
  self.model.calculate_sum(num1 + 1, num2 - 1) # Intentional error for demonstration
```

---

We need to test the Controller in isolation (because the Model can "cancel out" bugs)
 - This means testing the passing of values

# Mock Model

A _Mock Model_ is a class that implements the Model's interface... but doesn't actually do the tasks. It just reports what the controller passed to it.

---

# Mock Model

So we add this interface, which defines what a Model should do:

```python
class CalculatorModelInterface(ABC):
    """Interface defining the contract for calculator models."""
    
    @abstractmethod
    def calculate_sum(self, num1: int, num2: int) -> int:
        """Calculate the sum of two integers."""
        ...
    
    @abstractmethod
    def get_result(self) -> Optional[int]:
        """Get the current result."""
        ...
    
    @abstractmethod
    def clear_result(self) -> None:
        """Clear the current result."""
        ...
    
    @abstractmethod
    def add_observer(self, observer: Callable[[Optional[int]], None]) -> None:
        """Add an observer to be notified when the result changes."""
        ...
```

---

# Mock Model

This Mock Model implements that interface, but just stores logs without doing work:

```python
class MockModel(CalculatorModelInterface):
    """A mock model for testing purposes."""

    def __init__(self) -> None:
        self.log: list[str] = []
        self._observers: list[Callable[[Optional[int]], None]] = []
    
    def calculate_sum(self, num1: int, num2: int) -> int:
        self.log.append(f"calculate_sum({num1}, {num2})")
        return -12345
    
    def get_result(self) -> Optional[int]:
        self.log.append("get_result()")
        return -12345
    
    def clear_result(self) -> None:
        self.log.append("clear_result()")
    
    def add_observer(self, observer: Callable[[Optional[int]], None]) -> None:
        self.log.append(f"add_observer({observer})")
        self._observers.append(observer)

    def get_log(self) -> list[str]:
        return self.log
```

---

Make sure to update `CalculatorController`'s constructor argument type to take the interface type `CalculatorModelInterface`.

## Use the Mock Model to test the Controller:

```python
class TestController(unittest.TestCase):
    """Unit tests for the CalculatorController."""
    
    def setUp(self) -> None:
        self.mock_model = MockModel()
        self.view = CalculatorView()
        self.controller = CalculatorController(self.mock_model, self.view)
    
    def test_calculate_sum_with_valid_input(self) -> None:
        self.view.num1_var.set("10")
        self.view.num2_var.set("20")
        self.controller.calculate_sum()
        log = self.mock_model.get_log()
        self.assertIn("calculate_sum(10, 20)", log)
```

---

In HW7's `test_wikipedia_page.py`:

```python
MOCK_HTML = """<html><body>
<p>Some text about the topic on this page.</p>
<a href="/wiki/Link1">Link 1</a>
<a href="/wiki/Link2">Link 2</a>
</body></html>"""


def _make_mock_response(status_code: int = 200, text: str = MOCK_HTML) -> MagicMock:
    mock_response = MagicMock()
    mock_response.status_code = status_code
    mock_response.text = text
    return mock_response
```

---

In the test:

```python
class TestEqualityCaseInsensitive(unittest.TestCase):
    """Test that the equality operator considers two WikipediaPage instances equal if their keywords 
    are the same, ignoring case."""

    def setUp(self) -> None:
        self.patcher = patch("src.wikipedia_page.requests.get")
        self.mock_get = self.patcher.start()
        self.mock_get.return_value = _make_mock_response(200)

    def tearDown(self) -> None:
        self.patcher.stop()

    def test_equality_case_insensitive(self) -> None:
        """Test that the equality operator considers two WikipediaPage instances equal if their 
        keywords are the same, ignoring case."""
        page1 = WikipediaPage("Python")
        page2 = WikipediaPage("python")
        self.assertEqual(page1, page2)
```

Somewhere in your `WikipediaPage` constructor:

```python
response = requests.get(url, headers=headers)
```

---

## Poll: Which of the following are true?

1. A Mock class implements the same interface as the original class which it is mocking.
2. A Mock class implements the same interface as the class which it is testing.
3. A Mock keeps a log of everything passed to it.
4. A Mock is used to test that methods from a different class (the Controller) are passing the correct arguments to the class being mocked.

---

# Poll:

# 1. What is your main takeaway from today?

# 2. What would you like to revisit next time?