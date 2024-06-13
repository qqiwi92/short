import json
from server.api.rating.relevance_rate import relevance_rate
from server.api.rating.rate_date import impact_rate
from server.api.rating.impact_rate import impact_rate
from server.api.rating.source_authority import authority_rate
import time



def rate():
    with open('user_data.json', 'r', encoding='utf-8') as file:
        tags = json.load(file)["tags"]
    try:
        sortArr=[]
        rated_value=0
        with open('data.json', 'r', encoding='utf-8') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = []
        counter = 0
        for i in data:
            i["id"]=counter	
            counter+=1
            try:
                rated_value+=int(relevance_rate(i,tags))
                time.sleep(2)
            except:
                rated_value+=0
            rated_value-=int(impact_rate(i))
            time.sleep(2)
            try:
                rated_value+=int(impact_rate(i))
                time.sleep(2)
            except:
                rated_value=0
            try:
                rated_value+=int(authority_rate(i))
                time.sleep(2)
            except:
                rated_value=0
            sortArr.append({
                            "id":i["id"],
                            "rate":rated_value,
                            "title":i["title"],
                            "date":i["date"],
                            "link":i["link"],
                            "text":i["text"]
                            })
            rated_value=0
    
        sorted_dicts = sorted(sortArr, key=lambda x: x['rate'])

        rated = json.loads(json.dumps(sorted_dicts))
    
        with open('data.json', 'w', encoding='utf-8') as file:
            json.dump(rated, file, indent=4, ensure_ascii=False)
        return rated

    except FileNotFoundError as e:
        print(f"Файл не найден: {e}")
    except json.JSONDecodeError as e:
        print(f"Ошибка декодирования JSON: {e}")
    except Exception as e:
        print(f"Произошла ошибка: {e}")
