# -*- coding:utf-8 -*-

from flask import Flask, request
import requests
from bs4 import BeautifulSoup
from flask_cors import *
import json
import peewee
from create_db import App, Price
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import logging

app = Flask(__name__)
CORS(app, supports_credentials=True)
database = peewee.SqliteDatabase("wee.db")

log = logging.getLogger('apscheduler.executors.default')
log.setLevel(logging.INFO)  # DEBUG
fmt = logging.Formatter('%(levelname)s:%(name)s:%(message)s')
h = logging.StreamHandler()
h.setFormatter(fmt)
log.addHandler(h)


@app.route("/",methods=['POST','GET'])
def praseApp():
  url = request.args.get('url', '')
  info = fetchApp(url)
  (created, app) = addApp(info)
  if not created:
    info = {
      'status': -1,
      'message': "This APP is exist."
    }
  info['id'] = app.id
  return json.dumps(info)

def addApp(info):
  app, created = App.get_or_create(
    name = info.get('name'), 
    defaults={
      'status': 0,
      'icon': info.get('icon'),
      'author': info.get('author'),
      'url': info.get('url'),
      'min_price': info.get('price'),
      'max_price': info.get('price')
  })
  Price.create(app = app, price = info.get('price'), date = datetime.datetime.now())
  return (created, app)

def fetchApp(url):
  headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Accept':'text/html;q=0.9,*/*;q=0.8',
    'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
    'Accept-Encoding':'gzip',
    'Connection':'close',
    'Referer':'http://www.baidu.com/link?url=_andhfsjjjKRgEWkj7i9cFmYYGsisrnm2A-TN3XZDQXxvGsM9k9ZZSnikW2Yds4s&amp;wd=&amp;eqid=c3435a7d00006bd600000003582bfd1f'
  }
  r = requests.get(url,headers=headers)
  data = r.text
  soup = BeautifulSoup(data, "lxml")
  name = soup.select('h1[itemprop]')[0].string
  icon = soup.select('meta[itemprop]')[0]['content']
  author = soup.select('span[itemprop=name]')[0].string
  price = soup.select('div[itemprop=price]')[0].string
  if price.encode('utf8') == "免费":
    price = 0
  else:
    price = float(price[1:])
  info = {
    'status': 0,
    'name':name,
    'icon':icon,
    'author':author,
    'price':price,
    'url': url,
  }
  return info

@app.route('/list')
def listAll():
  lists = []
  for app in App.select():
    info = {}
    info['id'] = app.id
    info['name'] = app.name
    info['author'] = app.author
    info['icon'] = app.icon
    info['url'] = app.url
    info['price'] = Price.select().where(Price.app == app).order_by(Price.date.desc()).get().price
    lists.append(info)
  return json.dumps(lists)

@app.route('/price/<id>')
def getDetailPrice(id):
  lists = []
  app = App.select().where(App.id == id).get()
  for list in Price.select().where(Price.app == app):
    info = {}
    info['date'] = list.date.strftime('%b-%d-%y %H:%M:%S')
    info['price'] = list.price
    lists.append(info)
  return json.dumps(lists)

def fetchAllApps():
  apps = App.select()
  for app in apps:
    url = app.url
    _, app = addApp(fetchApp(url))
    combineOldPrice(app)
  print "crontab over"

def combineOldPrice(app):
  price = Price.select().where(Price.app == app).order_by(Price.date.desc())[0].price
  oldPrice = Price.select().where(Price.app == app).get().price
  maxPrice = app.max_price
  minPrice = app.min_price
  status = 0
  if price > maxPrice:
    maxPrice = price
  if price < minPrice:
    minPrice = price
  if oldPrice > price:
    status = 1
  if oldPrice < price:
    status = 2
  App.update(max_price = maxPrice, min_price = minPrice, status = status).where(App.id == app.id).execute()

@app.route('/test')
def test():
  print App.select().order_by(App.id.desc())[1].id
  return "hello"


def cron():
  scheduler = BackgroundScheduler()
  scheduler.add_job(fetchAllApps, 'interval', seconds=15)
  scheduler.start()
  print "[*] scheduler start, every 6 hours"

if __name__ == "__main__":
  cron()
  app.run()