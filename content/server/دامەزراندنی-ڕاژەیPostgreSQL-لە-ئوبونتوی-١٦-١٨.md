---
layout: post
title: دامەزراندنی ڕاژەیPostgreSQL لە ئوبونتوی ١٦-١٨
tags: [ڕاژە]
date : "2019-02-05 05:35:45"
---

**پێشەکی :**

PostgreSQL(یان بە کورتە پۆستگرێس)، بانکێکی زانیاری یان بنکە دراوەیێکی خێرا و سیستەمێکی بەڕێوەبردنی بنکەدراوەی پەیوەندی دارە(ORDMS).لە سەر ویندۆز،لینوکس، فری بی ئێس دی،ئەریس،یونیکس و ماک بە ئاسانی دادەمەزرێ. لە ڕاژەی macOS بە شیوازی سەرەتایی بوونی هەیە.لەوانەیە پێشکەوتوترین سیستەمی بەڕێوەبردنی سەرچاوەکراوی بنکەدراوە(database) بێت.ئێوە دەتوانن فۆنکشنی دڵخوازی خۆتان بە زمانی بەرنامەنووسی تایبەت پێ زیاد بکەن، بۆ وێنەPerl,Lua .NET ,Python ,C/C++, Java وە …هتد.لە ئامازۆن ، سکایپ و ئینستاگرام بگرە تا سیستەمی کەش و هەوای بریتانیا پەنجەمۆرەی دیارە.

pgAdmin ڕوخسارێکی گرافیکە لە سەر بنەمای وێب بۆ بەڕێوەبردنی PostgreSQL کە زۆر سادەیە و لە ڕێگای وێبگەڕەکەت ئیشدەکا .لەم بابەتە فێر دەبین کە چۆن ڕاژەی بنکەدراوەی PostgreSQL لە سەر ئوبونتو دامەزرێنین و بە یارمەتی pgAdmin بەڕێوەی ببین.

##### **قۆناغی ١ )** دامەزراندنی PostgreSQL

زیاد کردنی کانگای پاکەتەکانی PostgresSQL بە ئوبونتو زۆر سادەیە، بە یارمەتی هێڵەکانی خوارەوە زیادی بکەن بە کانگای ئوبونتو

```shell
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -sc)-pgdg main" > /etc/apt/sources.list.d/PostgreSQL.list'
```

گەر تەواوبووی، قۆناغەکانی خوارەوە لە پێش بگرە…

##### **قۆناغی ٢)** بەڕۆژکردن و دامەزراندنی PostgreSQL

لە ئێستا دا کانگاکان و کلیلەکان زیادکران.بە هێڵەکانی خوارەوە پاکەتەکان PostgresSQL ئامادە و دامەزراندنی دەستپێدەکەین. بۆ دامەزراندنی PostgreSQL 11 لە هێڵەکانی خوارەوە سود بگرە:

```shell
sudo apt update
sudo apt-get install postgresql-11
```

پاش دامەزراندنی PostgresSQL ئێمە بەفەرمانەکەی خوارەوە دەتوانین لە هەر کاتێک PostgresSQL ڕاوێستێنین(stop)، دابگرسێنین(start) و توانابکەین(enable) و بارو دۆخی(status) ئاگادار بین:

```shell
sudo systemctl stop postgresql.service
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
sudo systemctl status postgresql.service
```

زانیاریێکی وا دەردەکەوێت لە کاتی چالاک بوون :

```shell
postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor prese
   Active: active (exited) since Wed 2018-10-31 11:58:09 CDT; 12s ago
 Main PID: 7930 (code=exited, status=0/SUCCESS)
    Tasks: 0 (limit: 4663)
   CGroup: /system.slice/postgresql.service

Oct 31 11:58:09 ubuntu1804 systemd[1]: Starting PostgreSQL RDBMS...
Oct 31 11:58:09 ubuntu1804 systemd[1]: Started PostgreSQL RDBMS.
```

##### **قۆناغی ٣ )** دروستکردنی وشەی نهێنی بەکارهێنەری لینوکسی PostgreSQL

پاش دامەزراندنی PostgreSQL بیرۆکەیێکی باشە بۆ گۆڕین یان دروستکردنی وشەی نهێنی پێشگریمانی بنکەدراوەی PostgreSQL .بەفەرمانەکەی خوارەوە دەتوانین وشەی نهێنی دروست یان بگۆڕین لە ترمیناڵ:

```shell
sudo passwd postgres
```

بە نووسینی دووبار، وشەی نهێنی نوێ، پەیامی گۆڕان بە سەرکەوتویی، پێ دەدا.

```shell
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
```

پاش گۆڕینی وشەی نهێنی هەر جارێک کە بچنە نێو بنکەدراوە لە ڕێگای شێڵ داوای وشەی نهێنیتان لێ دەکا.

##### **قۆناغی ٤ )** دەستپێگەیشتن بە PostgreSQL

ئێستا بانکی زانیاری یان بنکەدراوەی PostgreSQL دامەزراوە،بۆ دەستپێگەیشتن و پەیوەندی دەبێ هێڵەکەی خوارەوە لە شێڵ بنووسن.ئێوە پێویستان بە چوونە ژوورەوە وەک بەکارهێنەرێکی postgres _ە .

```shell
sudo su -l postgres
```

لەو کاتەوە کە ئێوە لە فەرمانی psql سود دەگرن بۆ پەیوەندی لە رێگای شێڵ،کاتێکە بۆ دروستکردن و بەڕێوەبردنی بنکەدراوەی PostgreSQL

```shell
psql
```

– سازدانی وشەی نهێنی بۆ بەڕێوەبەری بنکەدراوەی (postgres)

```shell
su - postgres
psql
```

لەفەرمانی psql ،بە شێوازی خوارەوە وشەی نهێنی بۆ بەڕێوەبەر ساز بکەن یان بیگۆڕن:

```shell
postgres=# \password
یان
postgres=# \password postgres
```

پاش تەواوکردن چوونەدەرەوڤە

```shell
\q
exit
```

##### **قۆناغی ٥ )** دامەزراندنی PgAdmin4 بۆ ڕوخساری وێب

ئێستا کە PostgreSQL دامەزرا،بەفەرمانەکەی خوارەوە pgAdmin4 دادەمەزرێنین بۆ بەڕێوەبردنی گرافیکی PostgreSQL

```shell
sudo apt-get install pgadmin4 pgadmin4-apache2
```

پاش بەردەوام بوونی قۆناغەکانی دامەزراندن،وشەی نهێنی PostgreSQL ڕێکبخەن

![](/server/images/18.png)

 

دروستکردنی وشەی نهێنی pgAdmin4 بۆ چوونەژوور لە رێگای وێبگەڕ ؛

 

![](/server/images/18-1.png)

 

پاش دامەزراندن، وێبگەڕەکەت بکەرەوە ئینجا IP یان ناوی ڕاژە لەگەڵ pgAdmin4 بنووسە ،بەم جۆرە :

```shell
http://example.com/pgadmin4
```

پەڕەیێک وەک وێنەی خوارەوە دەر دەکەوێت و لەو زانیاریانە کە پێش تر بۆ pgadmin4 دابینت کردووە ، بۆ چوونەژوورەوە سود بگرە

 

![](/server/images/18-2.png)

 

ئەمەش پەڕەی سەرەکی بەڕێوەبردنی ڕاژەی بنکەدراوەی PostgreSQL_ە

 

![](/server/images/18-3.png)

 

![](/server/images/18-4.png)

 

ئەمەتا، هەرچەندە، ئێوە دەتوانن بۆ ئاسایشی فرەتر دەستپێگەیشتنی IP بۆ ئەم پەڕە سنوردار بکەن.

سەرچاوە: [websiteforstudents](https://kurd.click/?p=377) 