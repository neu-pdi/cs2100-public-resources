"""Solution for Practice Quiz 1


Git:

You're working on a Python calculator project. You've just finished implementing 
a `divide()` function in `calculator.py`, and your tests pass locally. You have 
other local commits that also need to be pushed. What commands are necessary to 
push your changes to the GitHub repo?

1. git add calculator.py
2. git commit -m "Implemented divide function"
3. git push

"""

from typing import Optional
import unittest

def find_median(numbers: list[Optional[float]]) -> float:
    """
    Finds the median value in a list of numbers.
    
    Args:
        numbers: A list of numbers (can be None or empty)
    
    Returns:
        The median value (float)
    
    Raises:
        ValueError: If numbers is empty, or if it contains None
    """
    if len(numbers) == 0:
        raise ValueError("Cannot find median of empty list")

    if None in numbers:
        raise ValueError("List contains None value")

    non_none_numbers: list[float] = [float(num) for num in numbers if num is not None]
    sorted_nums = sorted(non_none_numbers) # built-in sort function
    n = len(sorted_nums)

    if n % 2 == 1:
        # odd length
        return sorted_nums[n // 2]
    else:
        # even length
        mid1 = sorted_nums[n // 2 - 1]
        mid2 = sorted_nums[n // 2]
        return (mid1 + mid2) / 2.0

class TestFindMedian(unittest.TestCase):
    """Unit tests for find_median function"""
    def test_odd_length(self) -> None:
        """Test median with odd number of elements"""
        self.assertEqual(find_median([3, 1, 2]), 2)

    def test_even_length(self) -> None:
        """Test median with even number of elements"""
        self.assertEqual(find_median([4, 1, 3, 2]), 2.5)

    def test_empty_list(self) -> None:
        """Test median with empty list"""
        with self.assertRaises(ValueError):
            find_median([])

    def test_list_with_none(self) -> None:
        """Test median with list containing None"""
        with self.assertRaises(ValueError):
            find_median([1, None, 3])
