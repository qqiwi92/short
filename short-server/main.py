from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/hello", methods=["GET"])
def hello_world():
    return jsonify(
        [
            {
                "date": "31.05.2024",
                "link": "https://habr.com/ru/news/818657/",
                "title": "«Тинькофф» разработал собственное ПО для банкоматов на Linux",
            },
            {
                "date": "28.05.2024",
                "link": "https://habr.com/ru/news/817587/",
                "title": "СМИ: причиной продолжающегося сбоя в работе сервисов СДЭК может быть вирус-шифровальщик и хакерская атака",
            },
            {
                "date": "31.05.2024",
                "link": "https://habr.com/ru/companies/yandex/news/818611/",
                "title": "Яндекс объявил победителей Программы грантов Yandex Open Source",
            },
        ]
    )


if __name__ == "__main__":
    app.run(debug=True)
