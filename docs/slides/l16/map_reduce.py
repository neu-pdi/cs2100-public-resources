from collections import defaultdict
from typing import List, Tuple, Dict

def mapper(document: str) -> List[Tuple[str, int]]:
    """
    Map phase: Split document into words and emit (word, 1) pairs.
    
    Args:
        document: A string of text
        
    Returns:
        List of (word, count) tuples where count is always 1
    """
    words = document.lower().split()
    return [(word.strip('.,!?;:"()[]'), 1) for word in words if word.strip('.,!?;:"()[]')]

def shuffle(mapped_data: List[List[Tuple[str, int]]]) -> Dict[str, List[int]]:
    """
    Shuffle phase: Group all values by key across all mappers.
    
    Args:
        mapped_data: List of mapper outputs (each output is a List of Tuples)
        
    Returns:
        Dictionary mapping each word to list of its counts
    """
    shuffled = defaultdict(list)
    for mapper_output in mapped_data:
        for key, value in mapper_output:
            shuffled[key].append(value)
    return dict(shuffled)

def reducer(key: str, values: List[int]) -> Tuple[str, int]:
    """
    Reduce phase: Sum all counts for a given word.
    
    Args:
        key: The word
        values: List of counts (all 1s in this case)
        
    Returns:
        Tuple of (word, total_count)
    """
    return (key, sum(values))

def mapreduce(documents: List[str]) -> Dict[str, int]:
    """
    Complete MapReduce workflow for word count.
    
    Args:
        documents: List of text documents
        
    Returns:
        Dictionary mapping words to their total counts
    """
    # Map phase: Convert docs to tuples with count 1
    mapped = [mapper(doc) for doc in documents]
    
    # Shuffle phase: Group by key (make a dict where each word maps to a list of 1s)
    shuffled = shuffle(mapped)
    
    # Reduce phase: Apply reducer to each key-value group
    reduced = [reducer(key, values) for key, values in shuffled.items()]
    
    return dict(reduced)



if __name__ == "__main__":
    documents = [
        "The cat sat on the mat",
        "The dog sat on the log",
        "Cats and dogs are great pets"
    ]
    
    result = mapreduce(documents)
    
    # Display results sorted by frequency
    print("Word Count Results:")
    print("-" * 30)
    for word, count in sorted(result.items(), key=lambda x: x[1], reverse=True):
        print(f"{word:15} {count:3}")