from flask import Flask, request, jsonify

from src.search.search_engine import SearchEngine

app = Flask(__name__)

search_instance = SearchEngine("../data/players-data/players-dataset.csv")

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    if query:
        matched_rows = search_instance.search(query)
        return jsonify(matched_rows)
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
