from typing import List

def save_output(output: List, row_handler: callable, title: str = "Title"):
    print(title)
    # Output the top 10 goal scorers to console
    for row in output:
        print(row_handler(row))
