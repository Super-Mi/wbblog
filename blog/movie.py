#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
import random
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'}


def get_musics():
    url = 'http://music.163.com/discover/toplist?id=3778678'
    html = requests.get(url,headers=headers).text
    soup = BeautifulSoup(html,'lxml')
    find_list = soup.find('ul',class_="f-hide").find_all('a')

    mp3 = get_data(find_list)


def get_data(find_list):
    music_list = []
    for a in find_list:
        id = a['href'].split('=')[-1]
        print(id)
        music_url = 'https://api.imjad.cn/cloudmusic/?type=song&id=' + a['href'].split('=')[-1]
        data_music = requests.get(music_url,headers=headers).json()['data'][0]
        data_music_url =data_music['url']
        # data_music_id =data_music['id']
        music_list.append(id)
    print(music_list)

def get_music():
    id_list = ['574566207', '1332718235', '441491828', '1331322046', '553755659', '516728102', '518781004', '1293886117', '1303019637', '449818741', '1306400549', '460578140', '1330348068', '1320097340', '1311319058', '534542079', '354352', '571338279', '486814412', '504835560', '536099160', '1313558186', '31081299', '863046037', '108390', '569214126', '553815178', '557581476', '1331322055', '571338083', '528326686', '513360721', '108138', '1294899063', '29897546', '28285910', '1313354324', '29759733', '1333199831', '1325484613', '1334230368', '29004400', '1304882023', '29357087', '436487129', '536622304', '569213220', '440208476', '417859631', '554242032', '29722582', '1316563427', '421423806', '461347998', '541511427', '479598964', '287035', '28018075', '191528', '26092806', '210042', '514761281', '25643291', '208902', '31445772', '451703096', '526464145', '474739467', '413812448', '25657348', '418602088', '541687281', '546279760', '406475394', '38592976', '496370620', '1321385655', '566442496', '38576323', '569200213', '523251118', '1325898067', '483671599', '36990266', '426291544', '1333026147', '543798652', '452986458', '445665094', '864100958', '254574', '531295576', '542690276', '26353044', '1308818967', '473817398', '1313107065', '1310728498', '436514312', '139774', '27759600', '25706282', '401249910', '1299550532', '557584888', '526464293', '28815250', '557581284', '445546453', '1325702742', '30987293', '515269424', '480580003', '421148673', '1332424898', '30953009', '31356499', '410654865', '496869422', '509512457', '522510615', '2919622', '30352891', '296837', '529668356', '187738', '408814900', '208958', '505449407', '435288399', '29932432', '1296583188', '424264505', '812400', '1334259177', '440353010', '1320649834', '26060065', '1293951677', '25788001', '108179', '65533', '573843002', '504624714', '463352828', '516076896', '32019002', '562594267', '482988834', '133998', '494865824', '29814898', '440208643', '421423808', '37653063', '26830207', '33206214', '513791211', '25718007', '519943217', '462769331', '472361096', '4341314', '30431376', '543607345', '22852057', '30431367', '518686034', '480426313', '31445554', '863489830', '31654455', '489506275', '461544312', '515453363', '1325897163', '94639', '450853439', '167876', '233974', '1294924781', '1333199956', '27867140', '553310243', '308353', '506196018', '1333384296', '1334405955', '506092035', '423228325', '549059804', '1325905146', '1333359763', '492145159', '85571', '557667045', '32507038', '455653437', '316686', '505820138']
    id = random.choice(id_list)
    music_url = 'https://api.imjad.cn/cloudmusic/?type=song&id=' + id
    data_music = requests.get(music_url, headers=headers).json()['data'][0]
    data_music_url = data_music['url']
    return data_music_url


def get_douyin(url):
    Windows_headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1'
    }

    Android_headers = {

        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
    }
    try:
        r = requests.get(url,allow_redirects=True)
    except Exception:
        url = re.findall('(http.*?) 复制此链接',url)[0]
        r = requests.get(url, allow_redirects=True)
    rct = requests.get(r.url, headers=Windows_headers)
    playurl = re.findall('playAddr: "(.*?)"', rct.text)[0]
    playurl = playurl.replace('playwm', 'play')
    data_url = requests.get(playurl, headers=Android_headers, allow_redirects=False).headers['Location']
    return data_url
