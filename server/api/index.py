# from flask import Flask, request, jsonify
# import json
# from flask_cors import CORS
# import threading
# app = Flask(__name__)
# CORS(app)


# @app.route("/api/health", methods=["GET"])
# def healthchecker():
#     return {"status": "success", "message": "Integrate Flask Framework with Next.js"}


# @app.route("/api/data", methods=["GET"])
# def send_data():
#     try:
#         with open("api/data.json", "r", encoding="utf-8") as file:
#             data = json.load(file)
#         return jsonify(data), 200
#     except FileNotFoundError:
#         return jsonify({"error": "File not found"}), 404


# def run_app():
#     app.run()
# if __name__ == "__main__":
#     server_thread = threading.Thread(target=run_app)
#     server_thread.start()


from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(str('Hello World!!').encode())
        return