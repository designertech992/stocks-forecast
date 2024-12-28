from flask import Flask, jsonify
import json

app = Flask(__name__)

# Route to serve the design tips
@app.route('/design_tips', methods=['GET'])
def get_design_tips():
    try:
        # Load the JSON file
        with open('design_tips.json', 'r') as f:
            data = json.load(f)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Default route to test the API
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Design Tips API!", 200

if __name__ == '__main__':
    app.run(debug=True)
