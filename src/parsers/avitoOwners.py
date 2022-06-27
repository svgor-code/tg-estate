import requests, json, sys

cookie = 'v=1656346070; path=/; expires=Mon, 27-Jun-22 16:38:13 GMT; HttpOnly; Max-Age=1800; secure; domain=.avito.ru; SameSite=Lax; buyer_location_id=659880; Path=/; Domain=avito.ru; Expires=Tue, 27 Jun 2023 16:08:13 GMT; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax; sx=H4sIAAAAAAAC%2FwTAOw7CMAwG4Lv8MwOJH3FzmxRjEMpApaoeqt693wlrz3UJcSavYq9wtyJRhpqv4c3QTxzoOPby1f%2BwudGgWVMma24%2FzfzszQkPvNGLijJVXui67gAAAP%2F%2FRt4mzlsAAAA%3D; Path=/; Domain=avito.ru; Expires=Mon, 04 Jul 2022 16:08:13 GMT; Max-Age=604800; HttpOnly; Secure; SameSite=Lax; buyer_from_page=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax;' \

def except_error(res): # Эту функцию можно дополнить, например обработку капчи
    print(res.status_code, res.text)

s = requests.Session()                          # Будем всё делать в рамках одной сессии

headers = { 'authority': 'www.avito.ru',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'ru-RU,ru;q=0.9',}

if cookie:                                      # Добавим куки, если есть внешние куки
    headers['cookie'] = cookie
s.headers.update(headers)                       # Сохраняем заголовки в сессию
res = s.get('https://www.avito.ru/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?f=ASgBAQICAUSSA8YQA0DmBxSMUpC~DRSWrjWO3g4UAg&s=104')                    # Делаем запрос на мобильную версию.

# response = response.json()

try:
  res = res.json()
  print(res)
except json.decoder.JSONDecodeError:
  except_error(res)

