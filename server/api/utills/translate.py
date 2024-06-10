import os
import requests
from dotenv import load_dotenv


load_dotenv()


def translate(text):
    url = "https://translate.api.cloud.yandex.net/translate/v2/translate"
    headers = {
        "Authorization": f"Api-Key {os.environ.get('YANDEX_GPT_API_KEY')}",
    }
    return requests.post(
        url,
        json={
            "targetLanguageCode": "ru",
            "texts": [text],
        },
        headers=headers,
    ).json()["translations"][0]["text"]
print(translate('hii there'))