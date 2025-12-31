---
sidebar_position: 34
lecture_number: 34
title: MVC Controllers and Views
---

# MVC Controllers and Views

<img width="2277" height="1802" alt="MVC" src="https://github.com/user-attachments/assets/106a8429-855f-4b40-976b-8aa2ab137492" />

Image source: https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/

Last time, we talked about separating concerns, and making a well-designed Model that doesn't rely on the Controller to call its methods in a certain order.

## Synchronous versus Asynchronous Controllers

Two types of controllers:
- Synchronous: sequential
  - Often one large loop in controller's `go()` method
  - "get input, pass input to model, get state and pass to view, ..."
  - Must finish one task before moving on to the next
- Asynchronous: event-driven, reacts to user input
  - Works well when input comes from GUI buttons
  - Instead of a large loop, each reaction to a button/user action is its own method
  - Order of action completion doesn't matter

Poll: Which type of controller for: a security alarm that rings when the door is opened​
1. Synchronous
2. Asynchronous

Poll: Which type of controller for: a group chat messaging platform (iMessage or Discord)
1. Synchronous
2. Asynchronous

Poll: Which type of controller for: a "flat tire" sensor for a car
1. Synchronous
2. Asynchronous

Poll: Which type of controller for: a traffic light
1. Synchronous
2. Asynchronous

Poll: Which type of controller for: a vending machine (while someone is buying something)
1. Synchronous
2. Asynchronous

Poll: Which type of controller for: this "password reset" GUI
<img width="770" height="474" alt="reset password GUI" src="https://github.com/user-attachments/assets/efd21adb-f9bf-4265-a3a5-634101fa6fb9" />
Source: https://documentation.sysaid.com/docs/step-3-reset-password
1. Synchronous
2. Asynchronous

## GUI View using tkinkter

There are GUIs in some homework assignments, but they are already provided. Students do not need to write or modify GUI code in CS 2100.

Here is a GUI in Python using the popular GUI library `tkinter`. It allows the user to two numbers and click a "Sum" button to see their sum.

```python
import tkinter as tk
from tkinter import ttk, messagebox
from typing import Optional


class SumCalculator:
    """A simple GUI calculator that sums two integers."""
    
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Integer Sum Calculator")
        self.root.geometry("300x200")
        self.root.resizable(False, False)
        
        # Variables to store the input values
        self.num1_var: tk.StringVar = tk.StringVar()
        self.num2_var: tk.StringVar = tk.StringVar()
        self.result_var: tk.StringVar = tk.StringVar(value="Result: ")
        
        self.create_widgets()
    
    def create_widgets(self) -> None:
        """Create and arrange the GUI widgets."""
        # Main frame
        main_frame = ttk.Frame(self.root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # First number input
        ttk.Label(main_frame, text="First Number:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.num1_entry = ttk.Entry(main_frame, textvariable=self.num1_var, width=15)
        self.num1_entry.grid(row=0, column=1, pady=5, padx=(10, 0))
        
        # Second number input
        ttk.Label(main_frame, text="Second Number:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.num2_entry = ttk.Entry(main_frame, textvariable=self.num2_var, width=15)
        self.num2_entry.grid(row=1, column=1, pady=5, padx=(10, 0))
        
        # Sum button
        sum_button = ttk.Button(main_frame, text="Sum", command=self.calculate_sum)
        sum_button.grid(row=2, column=0, columnspan=2, pady=20)
        
        # Result label
        result_label = ttk.Label(main_frame, textvariable=self.result_var, font=("Arial", 12, "bold"))
        result_label.grid(row=3, column=0, columnspan=2, pady=10)
        
        # Configure grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Bind Enter key to calculate sum
        self.root.bind('<Return>', lambda event: self.calculate_sum())
        
        # Focus on first entry
        self.num1_entry.focus()
    
    def get_integer_input(self, value: str, field_name: str) -> Optional[int]:
        """
        Convert string input to integer with error handling.
        
        Args:
            value: The string value to convert
            field_name: Name of the field for error messaging
            
        Returns:
            Integer value if valid, None if invalid
        """
        try:
            return int(value.strip())
        except ValueError:
            if value.strip() == "":
                messagebox.showerror("Input Error", f"{field_name} cannot be empty.")
            else:
                messagebox.showerror("Input Error", f"{field_name} must be a valid integer.")
            return None
    
    def calculate_sum(self) -> None:
        """Calculate and display the sum of the two input numbers."""
        # Get values from entry widgets
        num1_str = self.num1_var.get()
        num2_str = self.num2_var.get()
        
        # Validate and convert inputs
        num1 = self.get_integer_input(num1_str, "First Number")
        num2 = self.get_integer_input(num2_str, "Second Number")
        
        # If both inputs are valid, calculate and display sum
        if num1 is not None and num2 is not None:
            result = num1 + num2
            self.result_var.set(f"Result: {result}")
        else:
            self.result_var.set("Result: ")


def main() -> None:
    """Main function to run the calculator application."""
    root = tk.Tk()
    app = SumCalculator(root)
    root.mainloop()


if __name__ == "__main__":
    main()
```

The above GUI was useful to learn about how a GUI generally works, but it puts the Model, View, and Controller all into the same class.
Let's organize it using the MVC architecture:

```python
import tkinter as tk
from tkinter import ttk, messagebox
from typing import Optional, Callable, Protocol


class CalculatorModel:
    """Model class that handles the business logic for sum calculation."""
    
    def __init__(self) -> None:
        self._result: Optional[int] = None
        self._observers: list[Callable[[Optional[int]], None]] = []
    
    def add_observer(self, observer: Callable[[Optional[int]], None]) -> None:
        """Add an observer to be notified when the result changes."""
        self._observers.append(observer)
    
    def calculate_sum(self, num1: int, num2: int) -> int:
        """
        Calculate the sum of two integers.
        
        Args:
            num1: First integer
            num2: Second integer
            
        Returns:
            The sum of num1 and num2
        """
        self._result = num1 + num2
        self._notify_observers()
        return self._result
    
    def get_result(self) -> Optional[int]:
        """Get the current result."""
        return self._result
    
    def clear_result(self) -> None:
        """Clear the current result."""
        self._result = None
        self._notify_observers()
    
    def _notify_observers(self) -> None:
        """Notify all observers of result changes."""
        for observer in self._observers:
            observer(self._result)


# View Interface
class CalculatorViewInterface(Protocol):
    """Interface defining the contract for calculator views."""
    
    def get_first_number(self) -> str:
        """Get the first number input as string."""
        ...
    
    def get_second_number(self) -> str:
        """Get the second number input as string."""
        ...
    
    def display_result(self, result: Optional[int]) -> None:
        """Display the calculation result."""
        ...
    
    def show_error(self, message: str) -> None:
        """Show an error message to the user."""
        ...
    
    def clear_inputs(self) -> None:
        """Clear all input fields."""
        ...
    
    def set_controller(self, controller: 'CalculatorController') -> None:
        """Set the controller for this view."""
        ...


# View GUI class
class CalculatorView(tk.Tk):
    """Tkinter-based view for the calculator application."""
    
    def __init__(self) -> None:
        super().__init__()
        self.controller: Optional['CalculatorController'] = None
        self._setup_window()
        self._create_widgets()
        self._setup_bindings()
    
    def _setup_window(self) -> None:
        """Configure the main window properties."""
        self.title("Integer Sum Calculator")
        self.geometry("300x220")
        self.resizable(False, False)
    
    def _create_widgets(self) -> None:
        """Create and arrange the GUI widgets."""
        # Variables for input and result display
        self.num1_var: tk.StringVar = tk.StringVar()
        self.num2_var: tk.StringVar = tk.StringVar()
        self.result_var: tk.StringVar = tk.StringVar(value="Result: ")
        
        # Main frame
        main_frame = ttk.Frame(self, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # First number input
        ttk.Label(main_frame, text="First Number:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.num1_entry = ttk.Entry(main_frame, textvariable=self.num1_var, width=15)
        self.num1_entry.grid(row=0, column=1, pady=5, padx=(10, 0))
        
        # Second number input
        ttk.Label(main_frame, text="Second Number:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.num2_entry = ttk.Entry(main_frame, textvariable=self.num2_var, width=15)
        self.num2_entry.grid(row=1, column=1, pady=5, padx=(10, 0))
        
        # Buttons frame
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=2, column=0, columnspan=2, pady=15)
        
        # Sum button
        self.sum_button = ttk.Button(button_frame, text="Sum", command=self._on_sum_clicked)
        self.sum_button.pack(side=tk.LEFT, padx=(0, 10))
        
        # Clear button
        self.clear_button = ttk.Button(button_frame, text="Clear", command=self._on_clear_clicked)
        self.clear_button.pack(side=tk.LEFT)
        
        # Result label
        result_label = ttk.Label(main_frame, textvariable=self.result_var, font=("Arial", 12, "bold"))
        result_label.grid(row=3, column=0, columnspan=2, pady=10)
        
        # Configure grid weights
        self.columnconfigure(0, weight=1)
        self.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
    
    def _setup_bindings(self) -> None:
        """Setup keyboard bindings."""
        self.bind('<Return>', lambda event: self._on_sum_clicked())
        self.bind('<Escape>', lambda event: self._on_clear_clicked())
        
        # Focus on first entry
        self.num1_entry.focus()
    
    def _on_sum_clicked(self) -> None:
        """Handle sum button click event."""
        if self.controller:
            self.controller.calculate_sum()
    
    def _on_clear_clicked(self) -> None:
        """Handle clear button click event."""
        if self.controller:
            self.controller.clear_all()
    
    # View Interface Implementation
    def get_first_number(self) -> str:
        """Get the first number input as string."""
        return self.num1_var.get()
    
    def get_second_number(self) -> str:
        """Get the second number input as string."""
        return self.num2_var.get()
    
    def display_result(self, result: Optional[int]) -> None:
        """Display the calculation result."""
        if result is not None:
            self.result_var.set(f"Result: {result}")
        else:
            self.result_var.set("Result: ")
    
    def show_error(self, message: str) -> None:
        """Show an error message to the user."""
        messagebox.showerror("Input Error", message)
    
    def clear_inputs(self) -> None:
        """Clear all input fields."""
        self.num1_var.set("")
        self.num2_var.set("")
        self.num1_entry.focus()
    
    def set_controller(self, controller: 'CalculatorController') -> None:
        """Set the controller for this view."""
        self.controller = controller


class CalculatorController:
    """Controller that manages communication between model and view."""
    
    def __init__(self, model: CalculatorModel, view: CalculatorView) -> None:
        self.model = model
        self.view = view
        
        # Set up the relationship
        self.view.set_controller(self)
        self.model.add_observer(self.view.display_result)
    
    def validate_integer_input(self, value: str, field_name: str) -> Optional[int]:
        """
        Validate and convert string input to integer.
        
        Args:
            value: The string value to convert
            field_name: Name of the field for error messaging
            
        Returns:
            Integer value if valid, None if invalid
        """
        try:
            stripped_value = value.strip()
            if not stripped_value:
                self.view.show_error(f"{field_name} cannot be empty.")
                return None
            return int(stripped_value)
        except ValueError:
            self.view.show_error(f"{field_name} must be a valid integer.")
            return None
    
    def calculate_sum(self) -> None:
        """Handle sum calculation request from the view."""
        # Get input values from view
        num1_str = self.view.get_first_number()
        num2_str = self.view.get_second_number()
        
        # Validate inputs
        num1 = self.validate_integer_input(num1_str, "First Number")
        num2 = self.validate_integer_input(num2_str, "Second Number")
        
        # If both inputs are valid, calculate sum using model
        if num1 is not None and num2 is not None:
            self.model.calculate_sum(num1, num2)
    
    def clear_all(self) -> None:
        """Clear all inputs and results."""
        self.view.clear_inputs()
        self.model.clear_result()


def main() -> None:
    """Main function to run the calculator application."""
    # Create the view (main window)
    view = CalculatorView()
    
    # Create the model
    model = CalculatorModel()
    
    # Create the controller and wire everything together
    controller = CalculatorController(model, view)
    
    # Start the application
    view.mainloop()


if __name__ == "__main__":
    main()
```

Notice how the View's interface, `CalculatorViewInterface`, could be implemented using `input()` and `print()` statements for a purely text-based command-line version of the View.

## Using a Mock Model to test a Controller

We have plenty of experience testing a Model.
We could also test the View if we chose the text-based version (using a special module that captures printed output).

Testing the Controller requires more work. Let's add this bug into the above code:
```python
# If both inputs are valid, calculate sum using model
if num1 is not None and num2 is not None:
  self.model.calculate_sum(num1 + 1, num2 - 1) # Intentional error for demonstration
```
The Controller's job includes passing the user input to the Model. This Controller is not doing its job correctly because it is passing the wrong user inputs.

Since the two errors (+1 and -1) cancel each other out, the only way to catch this bug is to specifically test the _passing_ functionality of the Controller, isolated from the Model's addition functionality.

To do this, we create a _Mock Model_ which implements the same interface as the regular Model, but doesn't actually do the Model's work. Instead, it listens and reports on what was passed to it by the Controller.

Let's modify the code so that the Model is implementing this interface:
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

And then let's add another class, `MockModel`, which also implements the `CalculatorModelInterface` interface.

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

Each of `MockModel`'s methods keep a log of what was asked of it, rather than doing what the Model is supposed to do.
There is also an additional method `get_log()` which returns the log.

Make sure to update `CalculatorController`'s constructor argument type to take the interface type `CalculatorModelInterface`.

We can then use the Mock Model to test the Controller:

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

The above test should point out the errors with adding and subtracting one.

Note: in Python, there is a built-in way to create a Mock using the `unittest` package (https://docs.python.org/3/library/unittest.mock.html). It creates the Mock class for you, so you don't have to write it. We did it manually here to explain what a Mock is, and so you can write it yourself in other languages.

Poll: Which of the following are true?
1. A Mock class implements the same interface as the original class which it is mocking.
2. A Mock class implements the same interface as the class which it is testing.
3. A Mock keeps a log of everything passed to it.
4. A Mock is used to test that methods from a different class (the Controller) are passing the correct arguments to the class being mocked.
