import requests
import os
import json
from dotenv import load_dotenv


load_dotenv()

def relevance_rate(data,tags):
    
    val=f'новость: {data["text"]}, тэги: {tags}'
    
    prompt = { 
        "modelUri": os.environ.get("YANDEX_GPT_MODEL_URL"),
        "completionOptions": {
            "stream": False,
            "temperature": 0,
            "maxTokens": "2000",
        },
        "messages": [
            {
                "text": " КОММЕНТАРИИ И ОБОСНОВАНИЕ ПИСАТЬ НЕ НАДО ВЕРНИ ТОЛЬКО ЧИСЛО УМОЛЯЮ ТЕБЯ верни данные в формате 'количество балов(одно число int)' ничего другого возвращать не надо, если новость не релеванта верни просто 0 КОММЕНТАРИИ К ТЕКСТУ ПИСАТЬ НЕ НАДО на основе запроса: дан список релевантных для НЛМК(Новолипецкий металлургический комбинат) определи по 10 бальной шкале насколько релеванта эта новость КОММЕНТАРИИ И ОБОСНОВАНГИЕ ПИСАТЬ НЕ НАДО ВЕРНИ ТОЛЬКО ЧИСЛО УМОЛЯЮ ТЕБЯ верни данные в формате 'количество балов(одно число int)' ничего другого возвращать не надо",
                "role": "system",
            },
            {
                "text": val,
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
    json_string = response.text
    json_data = json.loads(json_string)
    
    text = json_data['result']['alternatives'][0]['message']['text']
    
    return text