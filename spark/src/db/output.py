from typing import List

def save_output(output: List, row_handler: callable, file_path: str, title: str = "Title"):
    # Output the top 10 goal scorers to console
    for row in output:
        print(row_handler(row))

    # Write the output to a file
    with open("/opt/spark/work-dir/data/"+file_path, "w") as file:
        file.write(title + ":\n")
        
        for row in output:
            file.write(row_handler(row) + "\n")