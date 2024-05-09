from flask import Flask, request, jsonify

from app.search.search_engine import SearchEngine

app = Flask(__name__)

players_search_instance = SearchEngine("../data/players-data/players-dataset.csv", "full_name")
clubs_search_instance = SearchEngine("../data/players-data/clubs_dataset.csv", "club_name")

@app.route('/search', methods=['GET'])
def search():
    resource = request.args.get('resource', '')
    query = request.args.get('query', '')
    if query:
        if resource == 'clubs':
            matched_rows = clubs_search_instance.search(query)
        else:
            matched_rows = players_search_instance.search(query)
        if matched_rows:
            return jsonify(matched_rows)
        else:
            return jsonify({"message": "No matches found"}), 404
    else:
        return jsonify({"message": "No query provided"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

