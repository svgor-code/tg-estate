import requests

def get_session():
    session = requests.Session()
    session.headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Accept-Language': 'ru,en-US;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Cookie': "sx=H4sIAAAAAAAC%2F1zQTZLaMBBA4btozaIl9Y80t5FabTAQGzsGY6Z899QsSIVc4KtX79sBUvQqoSBkD0BBU7UENSJISAnc17d7uC83100et0lvODb0fArNaKPnNixhvrG5gzP35Zkkec4p7AcHWRUwEGpVKzH4miRhM99Vwxr4LXM79f3luI7j6S7TLxXCy0p6zClsw3L9lCn9yEZNTNVXrylDBsteQvBMHbTC8pbX6%2FVcluMNacN%2Bg5Be96JjNw7Qn%2FPM%2F8qS5Kc5gLCl2oIEqASK6rmpEmlJavz3Rp7LMOHYyoCrzTifu7tVfbFQnOLC%2F93I%2B8ExM2sT7jJnYuRsUi3mJgSq0vJbxt%2F%2BAuHVEfDzNbz65Vx8f1rCZX14sO2jmVn2gysQi0Ug8yJdzCwBslGoAC017upbJj%2FmDqbnA%2F2iCH49rrFOkmYcZ2n42cy4738CAAD%2F%2F28KL80dAgAA; Path=/; Domain=avito.ru; Expires=Wed, 20 Jul 2022 16:57:52 GMT; Max-Age=604800; HttpOnly; Secure; SameSite=Lax"
    }

    return session

url = 'http://api.scraperapi.com?api_key=b8a0d6d4b7886ffa3f7d1a998090228e&url=https://www.avito.ru/ulyanovsk/kvartiry/sdam/na_dlitelnyy_srok-ASgBAgICAkSSA8gQ8AeQUg?cd=1&s=104&user=1'
session = get_session()
res = session.get(url)

print(res.text)
