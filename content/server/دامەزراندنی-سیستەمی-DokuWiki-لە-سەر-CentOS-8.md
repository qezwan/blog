---
layout: post
title: دامەزراندنی سیستەمی DokuWiki لە سەر CentOS 8
tags: [ڕاژە]
date : "2020-02-17 09:35:45"
---

##### پێشەکی :

دۆکۆ ویکی (DokuWiki) سیستەمێکی هەموو کارەیە و سەرچاوەکراوەی بەڕێوەبردنی ناوەڕۆکە بۆ دروستکردنی ویکی بێ ئەو کە بنکە دراوەیێکی هەبێت.لە لایەن بەکارهێنەر بۆ ئەوە کە خوێندنی فرە ئاسانکردووە و زۆر سادەیە بۆ کارپێکردن ، پێشوازی لێکراوە.چاودێری و پەسەندکردنی جۆری بەکارهێنەران بۆ دەستکاری بەتایبەت بۆ دانانی ئاستیان،هەروەها زۆربوونی پێوەکراوەکانی بۆ مەبەست تایبەت؛ هۆکارێک بۆ بڵاو بوونی ئیشەکانیەتی.لەم فێرکارییە ئێمە دامەزراندنی کۆکیویکی لە سەر ڕاژەی سێنت ئۆ ئێس فێر دەبین.

![](/server/images/21.jpg)

##### پێداویستییەکان

دڵنیا بن کە ڕاژەکارەکەتان لەم دوو داوا پشتیوانی دەکا:

- نەرمەکالای ڕاژەکار پاڵپشتی لە PHP (Apache, NGINX, IIS, Lighttpd, LiteSpeed) دەکا.
- وشانی PHP یان ٥.٦ بێت یان سەرتر پێشنیار نوێترین وشانیەتی.

##### پێش پێداویستی

- سیستەمی کارگێڕی سێنت ئۆ ئێسی ٨(CentOS 8)
- بەکارهێنەرێک بە دەستپێگەیشتن بە فەرمانی

##### سەرەتا

دەبێ وشانی سێنت ئۆ ئێس بزانین

```shell
cat /etc/centos-release
# CentOS Linux release 8.0.1905 (Core)
```

ئێستا کاتی شوێنمان سازدەکەین:

```shell
timedatectl list-timezones
sudo timedatectl set-timezone 'Region/City'
```

بەڕۆژکردنی پاکەتەکانی سیستەم واتە نەرمەکالاکانی ڕاژە.ئەمە زۆر گرینگە لە سەرەتاوە بۆ ئەوە کە ئەمە دڵنیاتان دەکا کە ڕاژە دوایین وشانی بەڕۆژە و پارێزراوە لە بواری نەمەکالا.ئەمەش بەم فەرمانەیە:

```shell
sudo dnf update -y
```

دامەزراندنی چەندین پاکەت کە پێویستە بۆ بەڕێوەبردنی سیستەمی کارگێڕی سێنت ئۆ ئێس

```shell
sudo dnf install -y curl wget vim git unzip socat bash-completion epel-release
```

**قۆناغی یەکەم: دامەزراندنی PHP و پێوەکراوەکانی**
بەم فەرمانە PHP و زیادکراوەکانی پێویستی دادەمەزرێنین.

```shell
sudo dnf install -y php php-cli php-fpm php-gd php-xml php-zip
```

بۆ نیشاندانی تێهەڵکێشانی مادۆڵەکان(ماژووڵ) لەم فەرمانە سوود دەگرین :

```shell
php -m

ctype
curl
exif
fileinfo
. . .
. . .
```

ئێستا بە فەرمانەکەی خوارەوە وشانی PHP پشکنین دەکەین

```shell
php --version

# PHP 7.2.11-1-(cli) (built: Oct 26 2019 14:14:18) ( NTS )
# Copyright (c) 1997-2018 The PHP Group
# Zend Engine v3.3.11, Copyright (c) 1998-2018 Zend Technologies
# with Zend OPcache v7.3.11-1~deb10u1, Copyright (c) 1999-2018, by Zend Technologies
```

ئێستاخزمەتگوزاری PHP-FPM چالاک دەکەین

```shell
sudo systemctl start php-fpm.service
sudo systemctl enable php-fpm.service
```

##### قۆناغی دووهەم:دامەزراندنی خزمەتگوزای acme.sh و سازدانی مۆڵەتدانی Let’s Encrypt

ئاسایشی ماڵپەڕەکەتان بە دەرگای HTTPS کۆتایی پاراستن نییە تەنها بۆ ئاسایشی ترافیکی ماڵپەر شتێکی باشە.بەڵآم بۆ بەدەست هێنانی بەڵگەنامەی TLS لە Let’s Encrypt لە ڕاژەخوازیacme.sh سوود دەگرین.
Acme.sh نەرمەکالایێکی سادەی یونیکس شێڵە بۆ بەدەستهێنای مۆڵەتدانی TLS لە Let’s Encrypt بە پێداویستییەکانی سفرەوە.

داگرتن و دامەزراندنی acme.sh بەم فەرمانەیە :

```shell
sudo su - root
git clone https://github.com/Neilpang/acme.sh.git
cd acme.sh 
./acme.sh --install --accountemail your_email@example.com
source ~/.bashrc
cd ~
```

ئێستا وشانی acme.sh ئەخەینە ژێر پشکنین بەم جۆرە:

```shell
acme.sh --version
# v2.8.2
```

وەرگرتنی بەڵگەنامەکانی RSA و ECC/ECDSA بۆ دۆمەین و ڕاژەکارەکەتان:

```shell
# RSA 2048
acme.sh --issue --standalone -d example.com --keylength 2048
# ECDSA
acme.sh --issue --standalone -d example.com --keylength ec-256
```

گەر لە مۆڵەتدانی ساختە بۆ تاقیکردنەوە سوود دەگرن ئێوەدەتوانن –staging زیاد بکەن لە فەرمانەکانی سەرەوە.
پێش جێبەجێکردنی فەرمانی سەرەوە مۆڵەت و کلیلی پاراستن لەم شوێنەیە:

```html
RSA: /home/username/example.com.
ECC/ECDSA: /home/username/example.com_ecc directory
```

بۆ پێرستی بەڵگەنامەکانی خۆتان دەتوانن فەرمانەکەی خوارەو بنووسن :

```shell
acme.sh --list
```

بۆ پاشکەوتکردنی مۆڵەتدانەکان دەتوانن دایرێکتۆریێک دروستبکەن ئێمە سوودمان لە دایرێکتۆری /etc/letsencrypt گرتووە. جۆری دروستکردن بەم فەرمانەیە:

```shell
mkdir -p /etc/letsecnrypt/example.com
sudo mkdir -p /etc/letsencrypt/example.com_ecc
```

دامەزراندن/ڕوونووس لە دایرێکتۆری /etc/letsencrypt

```shell
# RSA
acme.sh --install-cert -d example.com --cert-file /etc/letsencrypt/example.com/cert.pem --key-file /etc/letsencrypt/example.com/private.key --fullchain-file /etc/letsencrypt/example.com/fullchain.pem --reloadcmd "sudo systemctl reload nginx.service"
# ECC/ECDSA
acme.sh --install-cert -d example.com --ecc --cert-file /etc/letsencrypt/example.com_ecc/cert.pem --key-file /etc/letsencrypt/example.com_ecc/private.key --fullchain-file /etc/letsencrypt/example.com_ecc/fullchain.pem --reloadcmd "sudo systemctl reload nginx.service"
```

هەموو ٦٠ ڕۆژێک خۆکارانە مۆڵەتدانەکان بەڕۆژ دەکرێنەوە ئیتر ئێمە دەستی نایکەین.بە فەرمانەکەی خوارەوە لە ئاستی دامەزراندن دینە دەرەوە..

```shell
exit
```

##### قۆناغی سێهەم : دامەزراندن و سازدانی Nginx

دۆکۆویکی لە سەر هەر ڕاژەکارێک کە پاڵپشتی لە PHP بکا جێ بەجێ دەکرێت.لەم فێرکارییە ئێمە سوودمان لە Nginx وەرگرتووە.
گەر لە Apache یان هەر ڕاژەکارێکی وێبی دیکە سوود دەگرن و پێتان خۆشە ئەوان بێ دەتوانن بە جیاتی Nginx ئیشی پێ بکەن.
داگرتن و دامەزراندنی Nginx لە کانگای CentOS :

```shell
sudo dnf install -y nginx
```

پشکنینی وشانی Nginx :

```shell
sudo nginx -v
# nginx version: nginx/1.14.2
```

سازدانیNginx :

```shell
sudo vim /etc/nginx/conf.d/dokuwiki.conf
```

ڕوونووس گرتن و لکاندنی ئەم هێڵانەی خوارەوە ئینجا پاشکەوتکردنی :

```shell
server {

    listen [::]:443 ssl;
    listen 443 ssl;
    listen [::]:80;
    listen 80;
    # RSA
    ssl_certificate /etc/letsencrypt/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/example.com/private.key;
    # ECC
    ssl_certificate /etc/letsencrypt/example.com_ecc/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/example.com_ecc/private.key;

    server_name wiki.example.com;
    root /var/www/dokuwiki;
    index index.html index.htm index.php doku.php;
    
    client_max_body_size 15M;
    client_body_buffer_size 128K;
    
    location / {
        try_files $uri $uri/ @dokuwiki;
    }
    
    location ^~ /conf/ { return 403; }
    location ^~ /data/ { return 403; }
    location ~ /\.ht { deny all; }
    
    location @dokuwiki {
        rewrite ^/_media/(.*) /lib/exe/fetch.php?media=$1 last;
        rewrite ^/_detail/(.*) /lib/exe/detail.php?media=$1 last;
        rewrite ^/_export/([^/]+)/(.*) /doku.php?do=export_$1&id=$2 last;
        rewrite ^/(.*) /doku.php?id=$1 last;
    }
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

پشکنینی پەیکەرکردن یان سازدانیNginx بەم فەرمانە :

```shell
sudo nginx -t
```

بارکردنەوە:

```shell
sudo systemctl reload nginx.service
```

##### قۆناغی چوارەم :دامەزراندنی DokuWiki

دروستکردنی پۆیێک(دایرێکتۆری) بەناویdokuwiki لە شوێنی ڕووتی ڕاژە ،بەم فەرمانە:

```shell
sudo mkdir -p /var/www/dokuwiki
```

جوولە بۆ نێو لقی دروستکراوە بەم فەرمانە:

```shell
cd /var/www/dokuwiki
```

داگرتنت دوایین وشانی قایمی DokuWiki لە پەڕەی داگرتنی ماڵپەڕی فەرمی بەم فەرمانە:

```shell
sudo wget https://download.dokuwiki.org/src/dokuwiki/dokuwiki-stable.tgz
```

دامەزراندن و کردنەوەی بوخچەی DokuWiki :

```shell
sudo tar xvf dokuwiki-stable.tgz
sudo rm dokuwiki-stable.tgz
sudo mv dokuwiki-2018-04-22b/* . && mv dokuwiki-2018-04-22b/.* .
sudo rmdir dokuwiki-2018-04-22b/
```

گۆڕانی خاوەنیایەتی لە /var/www/dokuwiki بۆ پۆی(دایرێکتۆری) www-data :

```shell
sudo chown -R nginx:nginx /var/www/dokuwiki
```

کردنەوەی پەڕگەی سازدان بە نەرمەکالای دەستکاریکەری vim بەم جۆرە :

```shell
sudo vim /etc/php-fpm.d/www.conf
```

لە نوێکردنەوەیphp7.3-fpm.service بەم شێوازە :

```shell
sudo systemctl restart php7.3-fpm.service
```

لە نێو وێبگەڕەکەتان پەڕگەی install.php بکەنەوە بۆ دامەزراندن.ئەم سکریپتە پشکنین بۆ پێداویستییەکانی دامەزراندن بە یارمەتی فۆنکشێنەکانی PHP دەکا.هەروا هەژمارەیێکی سەرەتایییش دروستدەکا.

##### قۆناغی پێنجەم: دامەزراندنی و دەستپێگەیشتن بە ماڵپەری دۆکۆویکی :

وێبگەڕەکەت بکەرەوە ئینجا ناونیشانی خوارەوەی تێدا بنووسە:

```
http://example.com/install.php
```

ئینجا دەچیتە ئەم پەڕە:

![](/server/images/21-1.png)

تەواو زانیارییەکان پڕ بکەنەوە. ئینجا لە سەر دوگمەی Save کرتە بکەن.
کرتەیێک لە سەر ئەم ڕەستە بکەن “your new DokuWiki” ئێستا پەڕەکەتان دەبینن.
![](/server/images/21-2.jpg)

دەتوانن بۆ نووسین لە بەستەری “login ” بچنەژوورەوە.
ئەتوانن بەشی داشبۆرد ببینن
لە کۆتایی دەبێ پەڕگەی install.php بە فەرمانەکەی خوارەوە بسڕنەوە.

```shell
sudo rm /var/www/dokuwiki/install.php
```

پیرۆزە ئێستا ئێوە ویکیێکی خنجیلانەتان هەیە بۆ نەرمەکالاکەتان یان ماڵپەڕەکەتان یان زانیاری لە بەشە جۆرواجۆرەکانی زانست.

**بەستەرەکان :**

[https://www.dokuwiki.org](https://www.dokuwiki.org/)
https://github.com/splitbrain/dokuwiki