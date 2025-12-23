from abc import ABC, abstractmethod
from typing import List, TypeVar, Protocol, Optional

T = TypeVar("T")


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

    def __init__(
        self, fallback_strategy: Optional[SortingStrategy] = None, threshold: int = 30
    ):
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
