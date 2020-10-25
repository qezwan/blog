---
layout: post
title: دامەزراندنی بەستەری تۆڕ لە دێبیان، ئوبونتو و مینت(Network Interface)
tags: [ڕاژە]
date : "2017-02-06 05:35:45"
---

##### پێشەکی

زۆر یەک لە سیستەمەکارپێکردنەکان رێدەدەن بە دامەزراندن و بەستەری تۆر (Network Interface)، بە یارمەتی هێڵی فەرمان(command line).لە لینوکس ئێمە دەتوانین زۆر بە بەر بڵاوی بۆ دامەزراندن و دەستکاری کردنی بەستەری ڕایەڵە یان تۆڕ،کردار ئەنجام بدەین.لەم بابەتە شڕۆڤە ئەکەین لە سەر بەستری ئامادەکردنی تۆڕی لە سەرسیستەمی کارپێکردنی دێبیان،ئوبونتو و مینت .

##### ۱- دامەزراندنی خزمەتگوزاری “Hostname”

لێرە ئێوە دەتوان ناوی ڕژە یان سێرڤێر یان ڕاژەیێکی نوێ بناسێنن بە سیستەمی کارپێکردنەکەتان.
ناوی ڕاژە لە ترمیناڵ بنووسن ئینجا لەسەر دوکمەی Enter کرتە بکەن.

```shell
$ hostname
```

###### نوسینی ناوی ڕاژە

ناوی ڕاژەی نوێ بنووس و پێویستی بە ریستارت نییە.

```shell
$ hostname station1.example.com
```

بۆ سازدانی ناوی ڕاژەی نوێ، ئێوە پێویستان بە دەستکاریکردنی فایلی /etc/hostname و نووسینی ناوی ڕاژەی نوێیە. خاڵ:پاش ده‌ستپێکردنه‌وه‌ ئەم ناوە هەر دەمینێت .

```shell
$ sudo echo "station1.example.com" > /etc/hostname
```

ئێستا فایلی /etc/hosts دەستکاریدەکەین، ناوی نوێی ڕاژە لەگەڵ ناونیشانی ip خۆماڵێ( local ip) بۆ دابین دەکەین.

```shell
127.0.0.1 localhost station1.example.com
```

##### ۲- پێرستی بەستەری تۆڕی لکاو :

بەم فەرمانە پێرستێک لەو بەستەرانە کە بۆ دامەزراندنی ڕاژە پێویستمان پێیەتی دەردەکەون.

```shell
$ ip addr
1: lo:  mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0:  mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:27:0e:1d:62:ab brd ff:ff:ff:ff:ff:ff
3: eth1:  mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:e0:4d:77:8a:0e brd ff:ff:ff:ff:ff:ff
```

##### ۳-پێکهێنانی IP بۆ بەستەرەکانی تۆڕ:

بۆ دەستکاری فایلی پێکهێنانی بەستەری ڕایەڵە(تۆڕ) فایلی /etc/network/interfaces دەستکاری دەکەین.بۆ وێنە ئێمە بەستەری eth0 بۆ ناونیشانی ip لە DHCP server و eth1 بۆ ipـیێکی جێگیر و نەگۆڕاو(static) رێکددەخەین.

```shell
$ sudo vi /etc/network/interfaces
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

auto eth1
iface eth1 inet static
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 8.8.8.8
```

##### ۴-دامەزراندنی IP خەیاڵی لە بەستەر(Virtual IP):

گەر ئێوە گەرەکتانە کە ئادرەسی دووهەم (virtual ip) لە سەر هەر ئەو بەستەرە (eth1) زیاد بکەن،ئێوە دەبێت ناوێکی ساختە(alias) لە ناوی بەستەری تۆڕ بناسێنن ئینجا ipـیێکی دیکەشی بۆ دابین بکەن.سەرەتا بجنە ئەم شوێنە:

```shell
$ sudo vi /etc/network/interfaces
auto eth1:0
iface eth1:0 inet static
address 192.168.1.101
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 8.8.8.8
```

##### ۵- ده‌ستپێکردنه‌وه‌ خزمەتگوزاری تۆڕ یان ڕایەڵە:

بۆ ئەوە کە تەواو گۆرانکاریەکانتان بە باشی ەنجام ببیت دەبێت تۆرەکەتان بە فەرمانەکەی خوارەوە ریستارت بکەەوە:

```shell
$ sudo /etc/init.d/networking restart
```



سەرچاوە: [کتێبی ڕێنمایی ڕاژەی لینوکس،چ تاران،ن:حسێن بەهاری،١٣٨٧](#) 