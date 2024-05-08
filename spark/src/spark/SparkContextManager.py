from pyspark import SparkConf, SparkContext

class SparkContextManager:
    _instance = None

    def __init__(self, _app_name: str):
        """Initialize the SparkContextManager class with a specific application name."""
        app_name = "Football Big Data"
        if SparkContextManager._instance is None:
            # Setting up the Spark configuration and context
            conf = SparkConf().setAppName(app_name)
            SparkContextManager._instance = SparkContext(conf=conf)
        else:
            # If a context already exists, log a warning
            print(f"Warning: Spark context already exists. Reusing the context created for {app_name}")

    def get_context(self):
        """Return the existing instance of SparkContext."""
        if SparkContextManager._instance is None:
            raise ValueError("SparkContextManager is not initialized. Please initialize it first.")
        return SparkContextManager._instance
