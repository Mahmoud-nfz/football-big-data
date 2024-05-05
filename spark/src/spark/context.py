from pyspark import SparkConf, SparkContext

def create_context(app_name: str) -> SparkContext:
    # Setting up the Spark configuration and context
    conf = SparkConf().setMaster("local").setAppName(app_name)
    sc = SparkContext(conf=conf)
    
    return sc