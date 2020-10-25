---
layout: post
title: دامەزراندنی ڕاژەی خۆماڵی Gitea بە جیاتی Git
tags: [ڕاژە]
date : "2020-01-21 09:35:45"
---

##### پێشەکی :

[Gitea](https://gitea.io/en-us/) ، ڕوونووسێکی پرۆژەی سەرچاوەکراوەی [Gogs](https://gogs.io/) کە لە لایەن چەند گەشەپێدەر بە مۆڵەتدانی MIT ،بەشێوەازی سەرچاوەکراوە بڵاو بووە. بەزمانی  Go نووسراوە،بۆ ڕاژەیێکی سوکەلەی سۆرس کۆد.مەبەست لەم پرۆژە دامەزراندنی ڕاژەیێکی سادەی کەسیی “Self-hosted” وەک گیت ــە. چەند پرۆگرامێر لەسەر بەرنامەیێک ئیش دەکەن پێویستیان بە شوێنێکە کە گەشە بە پرۆگرام بدەن دەتوانن ڕاژەیێک بۆ خۆیان دامەزرێنن و ئاگاداری ئیشی یەکتر بن.

![](/server/images/20-4.png)



##### تایبەتمەندی :

1. نەرمەکالای Gitea زۆر سووکە دەتوانی لەسەر رێزبێریپای، دایمەزرێنی.(Lightweight)
2. سەرچاوەکراوەیە بە مۆڵەتی MIT بڵاو کراوە کە گەشەپێدەران دەتوانی تایبەتمەندی فرەتر بکەن.(Open Source)
3. بە ئاسانی دەتوانن بە یارمەتی فایلە باینێرییەکانی خۆتان،Gitea دایمەزرێنن.(Easy to install)
4. لە هەر شوێنێک زمانی دامەزرێ ئەم نەرمەکالاش دادەمەزرێ.واتە لەسەر هەموو سیستەمێک.(Cross-platform)

##### پێداویستی :

1. کەمێ زانیاری بۆ ئیشی فەرمانەکانی هێڵ لەسەر ڕاژە (command line ).
2. دامەزراندنی nginx.
3. ڕاژەیێکی ئوبونتو.
4. دامەزراندنی داکێر لە سەر ڕاژە.

##### چی دەکەین :

بۆ دامەزراندنی گیتا (Gitea)،سەرەتا دەبێ داکێر لە سەر ڕاژە دامەزرێنین،هۆکار ئەوەیە کە گیتا پێویستی بە بنکەدراوەیە(databse ) بۆ پاسکەوتی زانیارییەکان،ئێمەس لە docker-compose سوود دەگرین.ئەمەش بۆ ئەوەیە کە ئێمە گەرەکمانە چەندین  container لە docker(داکێر یا دۆکێر) دروست بکەینی و بیبەستین بەیەکەوە. باش! دەبێ docker و docker-compose لەسەر ڕاژە دامەزرێنین.

##### دامەزراندنی nginx :

سەرەتا بەیارمەتی  ssh بە ڕاژە پەیوەندی دەگرین،ئینجا بە فەرمانەکەی خوارەوە nginx دادەمەزرێنین :

```shell
$ sudo apt update
$ sudo apt install nginx
```

ئێستا بە فەرمانی خوارەوە ئاستی دەستپێگەیشتنی دەدەین بە nginx :

```shell
$ sudo ufw allow 'Nginx Full'
```

##### docker :

بۆ دامەزراندنی gitea لەسەر ڕاژە ئیمە لە داکێر سوود دەگرین(شێوازی دیکەش هەیە بەڵام داکێر سادەترە).گەر وڵآتەکە ئای-پی قەپاتە، بەم شێوازە dnsەکانت بەفەرمانی خوارەوە بگۆڕە،سەرەتا

```shell
$   sudo nano etc/resolv.conf
```

کاتێک چوویتە فایلەکەی سەرەوە nameserver بسڕەوە :

```shell
nameserver 178.22.122.100
nameserver 185.51.200.2
```

ئێستا بەیارمەتی دوگمەکانی ctrl-x فایل پاشکەوت بکە.

##### دامەزرناندنی docker :

بۆ دامەزراندنی داکێر فرەرمانەکانی خوارەوە بە ڕیز ئەنجام بدەن:

```shell
$   sudo apt install apt-transport-https ca-certificates curl software-properties-common
$   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

ئێستا ئەم فەرمانە

```shell
$   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

لە کۆتایی ئەم چەند فەرمانەی خوارەوە :

```shell
$   sudo apt update
$   apt-cache policy docker-ce
$   sudo apt install docker-ce
```

##### دامەزراندنی نصب docker-compose :

بۆ دامەزراندنی docker-compose سەرەتا دەبێ دایبگرین ،فەرمانەکەی خوارەوە بنووسە :

```shell
$   sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

فەرمانەکەی خوارەوە جێبە جێبکە؛

```shell
$   sudo chmod +x /usr/local/bin/docker-compose
```

بۆ ئەوە بزانی docker-compose بە دروستی دامەزراوە فەرمانەکەی خوارەوە تێخزێنە:

```shell
$   docker-compose --version
```

دەبێ شتێک وەک ئەمە نیشان بدات :

```shell
$   docker-compose version 1.21.2, build a133471
```

##### دامەزراندنی Gitea بە یارمەتی docker-compose

بە فەرمانەکەی خوارەوە بوخچە یان دایرێکتۆریێک بە ناوی “gitea” دروست بکەن و بچنە نێوی :

```shell
$   mkdir gitea
$   cd gitea/
```

بە فەرمانەکەی خوارەو فایلێک بەناوی docker-compose.yml لە بوخچەی گیتا دروست بکەن :

```shell
$   touch docker-compose.yml
```

ئێستا ئەم فایلە کە لە سەرەوە دروستمان کرد بە یارمەتی دەستکاری کەری دەقی نانۆ بیکەنەوە ،بەم فەرمانە :

```shell
$   nano docker-compose.yml
```

ئێستا دەقەکەی خوارەوە بە دروستی بیخەنە نێو فایلەکەتان :

```shell
version: "3"

networks:
  valhalla:
    external: false

services:
  server:
    image: gitea/gitea:latest
    environment:
      - APP_NAME="git Hub"
      - USER_UID=2005
      - USER_GID=2005
      - DB_TYPE=postgres
      - DB_HOST=gitea_db:5432
      - DB_NAME=gitea_db
      - DB_USER=gitea
      - DB_PASSWD=AbcD23324234234
    restart: always
    networks:
      - valhalla
    volumes:
      - gitea_data:/data
    ports:
      - "3000:3000"
      - "222:32223"
    depends_on:
      - gitea_db

  gitea_db:
    image: postgres:9.6
    restart: always
    environment:
      - POSTGRES_DB=gitea_db
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=AbcD23324234234
    networks:
      - valhalla
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  gitea_data:
  postgres_data:
```

ئێستا بە یارمەتی دوگمەکانی ctrl-x فایلەکە پاشکەوت بکەن و بێنە دەرەوە،ئێستا فەرمانەکەی خوارەوە بنووسن تا گیتا بە یارمەتی ئەو فایلە[ docker-compose.yml] کە دروستمان کرد دامەزرێ:

```shell
$   sudo docker-compose up -d
```

پاش فەرمانەکەی سەرەوە چەند خولەکێک چاوەڕوان بن (شایەد ١٥ خولەک) تا چەند هێڵی بەم جۆرە دەبینن :

```shell
.........
Creating gitea_gitea_db_1 ... done
Creating gitea_server_1   ... done
```

دامەزراندنی گیتا gitea تەواو بوو لە وێبگەرەکەتان ئەم ناونیشانە لێبدەن :
`خاڵ : `بە جیاتی your_ip_addreess دەبێ ئای-پی ڕاژە بنووسن.

```shell
http://your_ip_addreess:3000
```

دەبێ ئەم پەڕە ببینن :

![](/server/images/20.png)

لەمێنیۆی سەرەوە لەسەر بەستەری sing in کرتە بکەن تا پەڕەیێکی وا ببینن:
`خاڵ :` ئەم پەڕە تەنها یەکبار دەکرێتەوە .ئاگادار بە بەهەڵە زانیاری نەنووسی چۆنکە دەبێ قۆناغەکانی سەرەوە دوبارە بکەیتەوە.

![](/server/images/20-1.png)



لەبەشی بنکەدرواە (database settings) پێویستمان بە گۆڕانکاری نییە ،بەڵآم لە خوارەوە دەبێ خشتەکان وەک وێنەی خوارەوە بگۆڕن .لەهەر کوێ کە ئای-پی ( ip )نووسرا بوو دەبێ ئای-پی ڕاژە بنووسن:

![](/server/images/20-2.png)

ئێستا لە خوارەوەی پەڕە دوگمەی install لێبدە خاڵۆ !

##### ڕێکخستنی nginx:

ئێستا دەبێ گیتا بخەینە سەر دەرگا(پۆرت)ـــی ٨٠ .بۆ ئەمەش دەبێ nginx سازبکەین.
ئەم فەرمانە لە ترمیناڵ بنووسە :

```
$   sudo nano /etc/nginx/sites-available/gitea
```

بەفەرمانەکەی سەرەوە فایلێکی config بۆ nginx بەناوی giteaـــمان دروست کرد، ئێستا بە یارمەتی دەستکاریکەری دەقی نانۆ دەبێ edit بکەین.بەم جۆرە
`خاڵ : `بە جیاتی server_name دەبێ ئای-پی ڕاژەی خۆت بنووسن.

```
server {
    listen 80;
    server_name 37.152.181.14;
  client_max_body_size 100M;
    location = /favicon.ico { access_log off; log_not_found off; }

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:3000;
    }
}
```

ئێستا بە یارمەتی دوگمەی ctrl-x ،فایلی پاشکەوت بکەن و بێنە دەرەوە.ئێستا فەرمانەکی خوارەو بنووسە:

```
$   sudo ln -s /etc/nginx/sites-available/gitea /etc/nginx/sites-enabled
```

ئێستا بە فەرمانەکەی خوارە دەبێ nginx ،ریستارت بکەین تا کرداری سەرەوە جێبەجێ ببێ.

```
$   sudo systemctl restart nginx
```

ئێستا دەبێ ئای-پی ڕاژە بێ دەرگا یان پۆرتی ٣٠٠٠ بنووسن دەبینن گیتا دەکرێتەوە.کاتێک چوونە بەشی پەڕەی سەرەتا لە بەستەری register دەبێ هەژمارەیێک بۆخۆتان دروستبکەن و ئینجا کانگایێک(repository ) بۆ خۆتان دابین بکەن.



سەرچاوە: [gitea](https://gitea.io/en-us/) 