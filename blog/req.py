#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import os


def w_header(url):
    f = open('configs.txt', 'a', encoding='utf-8')
    f.write('import requests\n\n')
    f.write('url = "{}"'.format(url))
    f.write('\n')
    f.write('headers = {')
    f.write('\n')
    f.close()


def get_header(txt):
    f = open('configs.txt', 'a', encoding='utf-8')
    find = txt.replace(' --compressed', '').split('-H')
    url = re.findall('curl "(.*?)"', find[0])[0]
    w_header(url)
    for a in find[1:]:
        h = a.replace(': ', '":r"').replace('^\^', '') + ','
        f.write('    ')
        f.write(h)
        f.write('\n')
    f.write('}')
    f.write('\n')
    request = '''response = requests.get('{}', headers=headers).text'''.format(url)
    f.write(request)
    f.write('\n')
    f.write('print(response)')
    f.close()
    t = open('configs.txt', encoding='utf-8')
    data = t.read()
    t.close()
    os.remove('configs.txt')
    return data


def get_number():
    try:
        number = int(open('number.txt', 'r').read())
        number = number + 1
        n = open('number.txt', 'w')
        n.write(str(number))
        n.close()
        return number
    except:
        n = open('number.txt', 'w')
        n.write('1')
        n.close()


if __name__ == "__main__":
    get_header()
