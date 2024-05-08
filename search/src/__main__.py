from flask import Flask, request, jsonify

from src.search.search_engine import SearchEngine

app = Flask(__name__)

search_instance = SearchEngine("../data/players-data/players-dataset.csv")

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    if query:
        matched_rows = search_instance.search(query)
        if matched_rows:
            return jsonify(matched_rows)
        else:
            return jsonify({"message": "No matches found"}), 404
    else:
        return jsonify({"message": "No query provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
