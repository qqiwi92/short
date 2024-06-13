from bs4 import BeautifulSoup
import requests
import sys

sys.path.append("..")
from utills.translate import translate
from datetime import datetime


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
        main_text = soup.find(class_="entry-content")
        if main_text:
            text_elements = main_text.find_all(
                ["p", "ul", "li", "table", "tr", "td", "th"]
            )
            full_text = " ".join(
                element.get_text(strip=True) for element in text_elements
            )
            return full_text
    return None


def parse_news_titles(html_content):
    if html_content:
        soup = BeautifulSoup(html_content, "html.parser")

        titles = soup.find_all("h2", class_="entry-title")
        news_titles = [title.get_text(strip=True) for title in titles]

        links = [title.find("a")["href"] for title in titles]

        dates = soup.find_all(class_="entry-date published")
        publication_dates = [date.get_text(strip=True) for date in dates]

        news_data_list = [
            {
                "title": title,
                "link": link,
                "date": date,
            }
            for title, link, date in zip(news_titles, links, publication_dates)
        ]

        return news_data_list
    else:
        return []


def convert_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%b %d, %Y")
        return date_obj.strftime("%d.%m.%y")
    except ValueError as e:
        print(f"Ошибка преобразования даты: {e}")
        return date_str


def get():
    url = "https://technode.com/tag/ai/"
    html_content = get_html(url)
    news_data = parse_news_titles(html_content)

    articles = []
    for news in news_data:
        article_text = parse_main_text(news["link"])
        if article_text:
            articles.append(
                {
                    "title": translate(news["title"]),
                    "link": news["link"],
                    "date": convert_date(news["date"]),
                    "text": translate(article_text),
                }
            )

    return articles
