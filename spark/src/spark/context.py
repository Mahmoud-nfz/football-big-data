from pyspark import SparkConf, SparkContext

def get_context(app_name):
    conf = SparkConf().setAppName(app_name)
    return SparkContext.getOrCreate(conf=conf)
