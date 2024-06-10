import schedule
import time
import parsers.parse_computer_world
import parsers.parse_habr
import parsers.parse_technode
import json
import os


def job():
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

def run_schedule():
    schedule.every(24).hours.do(job)
    while True:
        schedule.run_pending()
        time.sleep(3600)


run_schedule()
