from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "the server is up and running"}, 200


@app.route("/data", methods=["GET"])
def send_data():
    try:
        with open("api/data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


def run_app():
    app.run(
        debug=True,
        use_reloader=True,
    )


if __name__ == "__main__":
    run_app()
