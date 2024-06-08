from dateparser import parse


def parse_date(s):
    return parse(s).strftime("%d.%m.%y")


def parse_date_list(data):
    return list(map(lambda x: parse_date(x), data))
