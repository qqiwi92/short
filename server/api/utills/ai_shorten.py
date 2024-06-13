import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()


# делает запрос к yandex gpt api для сокращения текста
def shorten(text):
    text = text[:5000]

    prompt = {
        "modelUri": os.environ.get("YANDEX_GPT_MODEL_URL"),
        "completionOptions": {
            "stream": False,
            "temperature": 0.1,
            "maxTokens": "2000",
        },
        "messages": [
            {
                "text": "сократи данный текст до 1-2 предложний, чтобы пользователь понял весь смысл новости из этой выжимки ",
                "role": "system",
            },
            {
                "text": text,
                "role": "user",
            },
        ],
    }
    url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Api-Key {os.environ.get('YANDEX_GPT_API_KEY')}",
    }
    response = requests.post(url, headers=headers, json=prompt)
    print(response)
    result = response.text
    return json.loads(result)["result"]["alternatives"][0]["message"]["text"]