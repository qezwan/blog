---
layout: post
title: دامەزراندنی XAMPP لە سەر گنو/لینوکس
tags: [ڕاژە]
date : "2018-08-16 05:35:45"
---

ئێمە [لەم فێرکارییە](http://qezwan.ir/server/%D8%AF%D8%A7%D9%85%DB%95%D8%B2%D8%B1%D8%A7%D9%86%D8%AF%D9%86%DB%8C-apache-php-%DB%B7.%DB%B1-%D9%88-mysql-%D9%84%DB%95-centos-%DB%B7.%DB%B3/) فێر بووین کە دەتوانین MySQL ،Apache و PHP جیا جیا دامەزرێنین.بڵام بە جیاتی دامەزراندن بە شیوازی تاک و کانفیگکردنیان دەتوانین لە پاکەتێک بەیەکەوە هەر هەمووی دامەزرێنین.ئەم پاکەتە ناوی زەمپە.

`خاڵ : `وشەی X لە سەرەتای ئەم پاکەتە (XAMPP) ئاماژە بە کراس پڵەتفۆرم بوونی دەکا، واتە دەتوانرێت لە سەر هەر سێ سیستەمی کارپێکردنی ماک،ویندۆز و گنو/لینوکس دامەزرێ.
سەرەتا دەبێ لە ماڵپەڕی فەرمی Apache Friends بە پێی سیستەمی وەگرخەڕەکەمان(ماک،ویندۆس و گنو/لینوکس)و ئاندازیاریە ڕێکخەر لە جۆری 32بیت و 64 بیت پاکەتی گونجاو دابگرین.ئەڵبەت وشانی جیاواز لە PHP-یش هەیە کە دەتوانن چاوێک لە ئەویش بکەن کە لەگەڵ پاکەتەکە بوونی هەیە.(لەکاتی نووسینی ئەم بابەتە، وشانی PHP 5.6 ،PHP 7.0،PHP 7.1 و PHP 7.2بوونیان هەیە.)
لە ماڵپەڕی فەرمی کاتێک دایدەگرن ئەم پەرگە دەچێتە ناوی مەسیری Downloads ئێستا بە لێدانی دوکمەکانی Ctrl+Alt+T دەچینە نێو ترمیناڵ ،ئینجا فەرمانەکەی خوارەوە دەنووسین تا دەچینە نێو مەسیرە Downloads کە بوخچەکەمان تێدا پاشکەوت کردوە.

```shell
 $ cd ~/Downloads 
```

بە فەرمانەکەی خوارەوە ئاستی دەستپێگەیشتن بە پەڕگەی XAMPP بۆ دامەزراندن وەردەگرین.(ئاگادار بە کە ژمارەکان بە پێی وشانەکە جیاوازە)

```shell
 $ sudo chmod +x xampp-linux-x64-7.2.7-0-installer.run
```

پاش بەردەوامی، داوای وشەی نهینی بەڕێوەبەرمان لێدەکا.پاش نووسینی وشەی نهینی بەڕێوەبەر، مۆڵەتپێدان دەچیتە سەر فایلی زەمپەکە.
ئێستا فەرمانی خوارەوە بۆ دامەزراندن دەنووسین.

```shell
$ sudo ./xampp-linux-7.0.4-0-installer.run
```

پاش چەند چرکە پەنجێرەی زەمپ دەکرێتەوە ،دوکمەکانی Next لێدەدەین تا لە کۆتایی دەگەیین بە دوکمەی Finish ، پاش دامەزراندن بە سەرکەوتوویی، لە مەسیری opt بوخچەیێک بە ناوی lampp بوونی هەیە. پەڕگەو بوخچەکان بە شێوازی خوارەوەن:

```shell
apache2
etc
libexec
php
temp
bin
htdocs
licenses
phpmyadmin
uninstall
build
icons
logs
proftpd
uninstall.dat
cgi-bin
img
man
properties.ini
var
COPYING.thirdparty
include
manager-linux.run
README-wsrep
xampp
ctlscript.sh
info
manual
RELEASENOTES
docs
lampp
modules
sbin
error
lib
mysql
share
```

لێرە ئەو بوخچە کە ئێمە زۆر ئیشمان پێی هەیە بوخچەی htdocs کە پرۆژەکانمانی لێدادەنین یان دەتوانین سکریپتەکان وەک وۆردپرێس،جوملا،درووپاڵ و …هتدی تێدا دامەزرێنین.
ئێستا بۆ چالاککردنی زەمپ ئەم فەرمانە لە ترمیناڵ دەنووسین:

```shell
$ sudo /opt/lampp/lampp start
```

کاتێک هیچ کێشەمان نەبێ لە چالاک بوونی زەمپ، ئەم پەیامە لە ترمیناڵ‌دەردەکەوێت:

```shell
Starting XAMPP for Linux 7.0.4-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...already running.
```

ئێستا بۆ تاقیکردنی زەمپ وێبگەڕێک دەکەینەوە و ئەم ناونیشانەی تێدا دەنووسین localhost/index.php یا localhost و ئینتێر لێدەدەین.دەبێ ئەم پەڕە ببینین:

![](/server/images/07.png)

هەروا کە لە وێنەی سەرەوە دەیبینن بە شێوازی خۆکارانە دەچین بۆ ناونیشانی localhost/dashboard و هەموو شتێک درووستە.

**کێشە لە چالاک بوونی XAMPP**
بار وا هەیە کە لە چالاکبوونی زەمپ ئەم پەیامانە دەردەکەوێ:

```shell
Starting XAMPP for Linux 7.0.4-0...
XAMPP: Starting Apache...fail.
XAMPP:  Another web server is already running.
XAMPP: Starting MySQL...ok.
```

لە پەیامەکەی سەرەوە پێمان دەڵێ کە خزمەتگوزاریێکی دیکەی Apache چالاکەو سیستەمی کارپێکردنەکەت ناتوانێ هاوکات دوو وشانی جیاواز لەم خزمەتگوزارییە چالاک بکا.هۆکار ئەوەیە کە پێشتر خزمەتگوزاری MySQL ،Apache و PHP دامەزراوە و کانفیگ بووە.چارە ئەوەیە کە دەبێ سەرەتا پاکەتی زەمپ بوێستێنین واتە ناچالاکی بکەین.بەم شێوازە :

```shell
$ sudo /opt/lampp/lampp stop
```

هەر ئینتێرمان لێدا لە فەرمانەکەی سەرەوە، ئەم پەیامە دەردەکەوێ :

```shell
Stopping XAMPP for Linux 7.0.4-0...
XAMPP: Stopping Apache...ok.
XAMPP: Stopping MySQL...ok.
```

ئێستا دەبێ خزمەتگوزاریەکان جودا جودا بوێستێنین واتە ناچالاکیان کەین بەڵام بە شێوازی تاک:

```shell
$ service apache2 stop
```

وە

```shell
$ service mysql stop
```

ئێستا خزمەتگوزاری زەمپ دوبارە چالاک دەکین :

```shell
$ sudo /opt/lampp/lampp start
```

پاش ئینتێر لە فەرمانی سەرەوە ئەم پەیامە دەردەکەوێ :

```shell
Starting XAMPP for Linux 7.0.4-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...already running.
```

ئێستا زەمپەکەمان چالاکەو دەتوانین لێ کەڵک بگرین.