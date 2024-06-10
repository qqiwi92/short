from bs4 import BeautifulSoup
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
        main_text = soup.find(class_="entry-content")
        if main_text:
            text_elements = main_text.find_all(['p', 'ul', 'li', 'table', 'tr', 'td', 'th'])
            full_text = ' '.join(element.get_text(strip=True) for element in text_elements)
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


def job():
    url = "https://technode.com/tag/ai/"
    html_content = get_html(url)
    news_data = parse_news_titles(html_content)

    articles = []
    for news in news_data:
        article_text = parse_main_text(news["link"])
        if article_text:
            articles.append({"title": news["title"], "link": news["link"], "date": news["date"], "text": article_text})

    with open("data.json", 'w', encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)


def run_schedule():
    schedule.every(5).seconds.do(job)
    while True:
        schedule.run_pending()
        time.sleep(4)


def start():
    run_schedule()


start()
