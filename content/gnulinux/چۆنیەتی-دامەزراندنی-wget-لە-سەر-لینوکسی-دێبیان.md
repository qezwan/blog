---
layout: post
title: چۆنیەتی دامەزراندنی wget لە سەر لینوکسی دێبیان
tags: [گنو/لینوکس]
date : "2017-02-20 05:20:45"
---

کاتێک کە بە تازەیی لە سیستەمی کارپێکردنی ویندۆز سێرڤێر هاتمە سەر گنو/لینوکسی دێبیان، بۆ ئەو بەرنامانە کە لە سەر PHPـیەکەم دادەمەزرێت.من پێویستم بە دامەزراندنی چەند نەرمەکالایێک بوو بە فەرمانی wget،بەڵام ئەم هێڵە نیشاندەدرا:

```shell
bash: wget: command not found
```

##### لە ڕاستی ئەم هەڵەچۆن درووست دەبێت ؟

گنو Wget، ئامێرێکی ئازاد و خۆڕاییە بۆ داگرتنی فایلەکان لە نێو ماڵپەرەکان کە لەم دەرگانە HTTP, HTTPS وە FTP پاڵپشتی دەکات.هەر وا لە پرۆکسی HTTPـیش پشتیوانی دەکات.لەم بابەتە فێر دەبینن کە چۆن بە یارمەتی نەرمەکالی wget فایلێک لە وێب دابگرین و دایمەزرێنین.

##### دامەزراندنی wget لە سەر لینوکسێکی دێبیان :

سەرەتا پێویستت بە فەرمانی apt-get / apt بۆ دامەزراندی پاکەتەکان لە سەر Wgetـە.ئێوە دەتوانن بە فەرمانی apt-cache بگەڕێن بۆ پاکەتەکان بەم شێوازە :

```shell
$ {apt-cache search {package 
$ apt-cache search wget 
$ apt-cache search wget | grep wget 
$ apt search wget 
```

##### بۆ وێنە ئەم ئامانجەی هەیە:

```shell
qezwan@eos:~$ apt-cache search wget
devscripts - scripts to make the life of a Debian Package maintainer easier
wget - retrieves files from the web
abcde - A Better CD Encoder
apt-mirror - APT sources mirroring tool
axel - light command line download accelerator
filetea - Web-based file sharing system
getdata - management of external databases
libcupt4-1-downloadmethod-wget - flexible package manager -- wget download method
ow-shell - shell utilities to talk to an 1-Wire owserver
puf - Parallel URL fetcher
pwget - downloader utility which resembles wget (implemented in Perl)
python-wget - pure Python download utility for Python 2
python3-wget - pure Python download utility for Python 3
snarf - command-line URL grabber
texlive-latex-extra - TeX Live: LaTeX additional packages
wput - tiny wget-like ftp-client for uploading files
```

هەڤاڵان لە سێهەمین هێڵ (لە سەرەوە)ئێوە دەبینن کە پاکەتی Wget ئامادەیە بۆ دامەزراندن.ئێستا ئێوە دەتوانن پاکەتیwget دامەزرینن بەم فەرمانانە:

```shell
$ sudo apt-get install {package-name-here}
```

یان بەم فەرمانەی لە ئاستی بەرێوەبەر واتە sudo :

```shell
 # apt-get install {package-name-here} 
```

بۆ وێنە ئێوە دەتوانن wget بەم دوو فەرمانە دامەزرێنن :

```shell
$ sudo apt install wget 
```

یان

```shell
$ sudo apt-get install wget 
```

##### ئێستا چۆن بە نەرمەکالای wget، فایلێک دابگرین :

```shell
wget http://url/file
wget ftp://domain/file.tar.gz
```

هیوادارم بەسوود بێت و ئاشنا ببن بە چۆنیەتی داگرتنی فایل لە ترمیناڵ.



سەرچاوە : [cyberciti](https://www.cyberciti.biz/faq/how-to-install-wget-togetrid-of-error-bash-wget-command-not-found/) 