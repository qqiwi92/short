from mailing.send_emails_to_list import send_emails_to_list
import schedule
import time
import parsers.parse_computer_world
import parsers.parse_habr
import parsers.parse_technode
import json
import os
from rate import rate

def collect_files():
    if not (os.path.exists("data.json")):
        with open("data.json", "w", encoding="utf-8") as file:
            json.dump([], file, indent=4)
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    data.extend(parsers.parse_computer_world.get())
    data.extend(parsers.parse_technode.get())
    data.extend(parsers.parse_habr.get())
    with open("data.json", "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


def sort_files_and_send():
    with open("user_data.json", "r", encoding="utf-8") as file:
        user_data = json.load(file)
        rated = rate()
        send_emails_to_list(
            rated[:20], rated[:3], user_data["emails"]
        )


def run_schedule():
    schedule.every(2).seconds.do(collect_files)
    schedule.every().monday.at("10:00").do(sort_files_and_send) # to test change .days -> .seconds
    while True:
        schedule.run_pending()
        time.sleep(10)


if __name__ == "__main__":
    # run_schedule()
    print(__name__)
