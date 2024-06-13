import json
from rating.relevance_rate import relevance_rate
from rating.rate_date import impact_rate
from rating.impact_rate import impact_rate
from rating.source_authority import authority_rate
import time


def rate(i):
    with open("api/user_data.json", "r", encoding="utf-8") as file:
        tags = json.load(file)["tags"]
    rated_value = 0
    try:
        rated_value += int(relevance_rate(i, tags))
        time.sleep(2)
    except:
        rated_value += 0
    try:
        rated_value -= int(impact_rate(i))
        time.sleep(2)
    except:
        rated_value = 0
    try:
        rated_value += int(impact_rate(i))
        time.sleep(2)
    except:
        rated_value = 0
    try:
        rated_value += int(authority_rate(i))
        time.sleep(2)
    except:
        rated_value = 0
    return rated_value
