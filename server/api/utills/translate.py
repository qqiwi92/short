import os
import requests
from dotenv import load_dotenv


load_dotenv()


def translate(text):
    try: 
        text = text[:5000]
        url = "https://translate.api.cloud.yandex.net/translate/v2/translate"
        headers = {
            "Authorization": f"Api-Key {os.environ.get('YANDEX_GPT_API_KEY')}",
        }
        response =  requests.post(
            url,
            json={
                "targetLanguageCode": "ru",
                "texts": [text],
            },
            headers=headers,
        ).json()
        print(response)
        return response["translations"][0]["text"]
    except:
        return "unlucky " + text[:100]

