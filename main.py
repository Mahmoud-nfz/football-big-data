from pyspark.sql import SparkSession

def main():
    # Create Spark session
    spark = SparkSession.builder \
        .appName("Kaggle Data Processing") \
        .getOrCreate()

    # Read the CSV file into a DataFrame
    df = spark.read.csv('/opt/spark/work-dir/mount/data/ginf.csv', header=True, inferSchema=True)

    # Show the DataFrame contents
    df.show()

    # Create a temporary view to run SQL queries
    df.createOrReplaceTempView("data_table")

    # Run a SQL query
    result = spark.sql("SELECT COUNT(*) FROM data_table WHERE Season > 2015")
    result.show()

    # Stop the Spark session
    spark.stop()

if __name__ == "__main__":
    main()
