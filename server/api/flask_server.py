from flask import jsonify, Flask, request
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
        with open("data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


@app.route("/send_now", methods=["POST"])
def send_now():
    data = request.get_json()
    emails = data.get('emails')
    tags = data.get('tags')
    wit
    # Now you can work with the 'emails' and 'tags' lists
    print(emails)
    print(tags)
    
    return {'status': 'success'}, 200


def run_app():
    app.run(
        debug=True,
        use_reloader=True,
    )


if __name__ == "__main__":
    run_app()
