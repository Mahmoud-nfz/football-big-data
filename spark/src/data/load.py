from pyspark import SparkContext
import csv

def load_data(sc: SparkContext, data: str):
    if data not in ["events.csv", "ginf.csv"]:
        raise ValueError("Invalid data file")
    
    data_rdd = sc.textFile("/opt/spark/work-dir/data/football-events/"+data)
    
    # Parse CSV rows using the csv module
    parsed_data = data_rdd.mapPartitions(lambda x: csv.reader(x))
    
    # Filter out the header
    header = parsed_data.first()
    data = parsed_data.filter(lambda row: row != header)
    
    return data
