from flask import jsonify, Flask, request
import json
from flask_cors import CORS
from rate import rate
from mailing.send_emails_to_list import send_emails_to_list

print("started")
import start_cron

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


@app.route("/user_data", methods=["GET"])
def send_user_data():
    try:
        with open("user_data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
        return jsonify(data), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


@app.route("/save_user_data", methods=["POST"])
def save_user_data():
    data = request.get_json()
    tags = data.get("tags")
    emails = data.get("emails")
    with open("user_data.json", "w", encoding="utf-8") as file:
        json.dump({"tags": tags, "emails": emails}, file, indent=4)
    return {"status": "success"}, 200

@app.route("/send_now", methods=["POST"])
def send_now():
    data = request.get_json()
    mode = data.get("mode")
    if mode == "rank_then_send":
        start_cron.sort_files_and_send()
    elif mode == "rank":
        rate()
    elif mode == "send_unranked":
        with open("data.json", "r", encoding="utf-8") as file:
            with open("user_data.json", "r", encoding="utf-8") as user_file:
                user_data = json.load(user_file)
                data = json.load(file)
                send_emails_to_list(data[:20], data[:3], user_data["emails"])
    elif mode == "send_old_ranked":
        with open("rated.json", "r", encoding="utf-8") as file:
            with open("user_data.json", "r", encoding="utf-8") as user_file:
                user_data = json.load(user_file)
                data = json.load(file)
                send_emails_to_list(data[:20], data[:3], user_data["emails"])
    return {"status": "success", "mode": mode}, 200


def run_app():
    app.run(
        debug=True,
        use_reloader=True,
    )


if __name__ == "__main__":
    run_app()
