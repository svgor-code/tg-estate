from time import sleep
import requests, json
from random_user_agent.user_agent import UserAgent
from random_user_agent.params import SoftwareName, OperatingSystem
from random import randrange
import datetime 

software_names = [SoftwareName.CHROME.value]
operating_systems = [OperatingSystem.WINDOWS.value, OperatingSystem.LINUX.value]

user_agent_rotator = UserAgent(software_names=software_names, operating_systems=operating_systems, limit=100)

# Get Random User Agent String.
user_agent = user_agent_rotator.get_random_user_agent()

randomDate = datetime.datetime(2023, 6, 15, 1, 6) + datetime.timedelta(minutes=randrange(60))
randomTime = randomDate.strftime("%H:%M")

cookie = 'buyer_location_id=659880; Path=/; Domain=avito.ru; Expires=Thu, 29 Jun 2023 {} GMT; Max-Age=31536000; HttpOnly; Secure;'.format(randomTime)

def except_error(res): # Эту функцию можно дополнить, например обработку капчи
    print(res.status_code, res.text)

s = requests.Session()                          # Будем всё делать в рамках одной сессии

headers = { 'authority': 'www.avito.ru',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent': user_agent,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'ru-RU,ru;q=0.9',}

if cookie:                                      # Добавим куки, если есть внешние куки
    headers['cookie'] = cookie
s.headers.update(headers)                       # Сохраняем заголовки в сессию
res = s.get('https://www.avito.ru/ulyanovsk/kvartiry/sdam/na_dlitelnyy_srok-ASgBAgICAkSSA8gQ8AeQUg?cd=1&rn=25934&s=104')                    # Делаем запрос на мобильную версию.

sleep(5)
# response = response.json()

try:
  res = res.json()
  print(res)
  s.close()
except json.decoder.JSONDecodeError:
  except_error(res)

