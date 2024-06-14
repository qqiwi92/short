from mailing.send_emails_to_list import send_emails_to_list
import schedule
import time
import parsers.parse_computer_world
import parsers.parse_habr
import parsers.parse_technode
import json
import os
from rate import rate
import utills.translate as translate

import os
import json
from parsers import parse_computer_world, parse_technode, parse_habr
import utills.ai_shorten as ai_shorten


def collect_files():
    if not os.path.exists("data.json"):
        with open("api/data.json", "w", encoding="utf-8") as file:
            json.dump([], file, indent=4)

    with open("api/data.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    news_data = parsers.parse_computer_world.get()
    news_data += parsers.parse_technode.get()
    news_data += parsers.parse_habr.get()

    for news in news_data:
        if any(existing_news["title"] == news["title"] for existing_news in data):
            continue
        shortened_text = ai_shorten.shorten(translate.translate(news["text"]))
        news["text"] = shortened_text
        news["rating"] = rate(news)

    data.extend(news_data)
    with open("api/data.json", "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


def send_now():
    with open("api/user_data.json", "r", encoding="utf-8") as file:
        user_data = json.load(file)
        with open("api/data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            send_emails_to_list(data[:20], data[:3], user_data["emails"])


def run_schedule():
    schedule.every().seconds.do(collect_files)
    schedule.every().monday.at("10:00").do(send_now)  # to test change .days -> .seconds
    while True:
        schedule.run_pending()


if __name__ == "__main__":
    run_schedule()
