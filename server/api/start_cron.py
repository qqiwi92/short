;;;;;from bs4 import BeautifulSoup
import schedule
import time
import json
import requests


def get_html(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Произошла ошибка при получении HTML: {e}")
        return None


def parse_main_text(url):
    html_content = get_html(url)
    if html_content:
        soup = BeautifulSoup(html_content, "html.parser")
        main_text = soup.find(
            class_="article-formatted-body article-formatted-body article-formatted-body_version-2"
        )
        if main_text:
            return main_text.get_text(strip=True)
    return None


def parse_news_titles(html_content):
    if html_content:
        soup = BeautifulSoup(html_content, "html.parser")

        titles = soup.find_all(class_="tm-title tm-title_h2")
        news_titles = [title.get_text(strip=True) for title in titles]

        time_published = soup.find_all(class_="tm-article-datetime-published")
        publication_times = [time.get_text(strip=True) for time in time_published]

        publication_links = soup.find_all(class_="tm-article-datetime-published_link")
        links = [link["href"] for link in publication_links]

        news_data_list = [
            {
                "date": date,
                "link": 'https://habr.com' + link,
                "title": title
            }
            for title, date, link in zip(news_titles, publication_times, links)
        ]

        return news_data_list
    else:
        return []



def job():
    url = "https://habr.com/ru/news/"
    html_content = get_html(url)
    data = parse_news_titles(html_content)
    with open("api/data.json", 'w', encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def run_schedule():
    schedule.every(5).seconds.do(job)
    while True:
        schedule.run_pending()
        time.sleep(4)


def start():
    run_schedule()


start()
