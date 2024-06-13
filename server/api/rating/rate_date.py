from datetime import datetime
def impact_rate(data):
    date=data["date"]
    now = datetime.now()
    formatted_date = now.strftime("%d.%m.%y")
    value = int(formatted_date[0:2])-int(date[0:2])
    
    return value
