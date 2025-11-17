import random
from collections.abc import Iterable, Iterator

class Sarcasm(Iterable[str]):
    def __init__(self, text: str):
        self.text = text
    
    def __iter__(self) -> Iterator[str]:
        return SarcasmIterator(self.text)

class SarcasmIterator(Iterator[str]):
    def __init__(self, text: str):
        self.remaining_text = text
    
    def __next__(self) -> str:
        if len(self.remaining_text) == 0:
            raise StopIteration
        next_char = self.remaining_text[0]
        next_char = next_char.lower() if random.randint(0, 1) == 0 else next_char.upper()
        self.remaining_text = self.remaining_text[1:]
        return next_char

print(''.join(letter for letter in Sarcasm('hi rasika')))