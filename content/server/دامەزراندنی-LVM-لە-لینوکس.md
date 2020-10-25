---
layout: post
title:دامەزراندنی LVM لە لینوکس
tags: [ڕاژە]
date : "2017-08-15 05:35:45"
---

LVM کورتکراوەی Logical Volume Manager شێوازێکی پێشکەوتوو بۆ بەڕێوەبردنی پارتیشێنەکان و بۆشایی هاردە، کە ئیمکاناتێکی فرە بە بەراوەرد لە گەڵ شێوازە کۆنەکان دەخاتە بەردەست بۆ بەڕێوەبەری ڕاژە.

لە LVM دەتوانین کۆی هاردەکان و پارتیشێنەکان کە بە Physical Volume ناسراوەن بەشێوازی چەند دیسکی مەنتەقی، گەورەتر و یەکپارچە بە ناوی Volume Group دروست بکەین و لە سەر ئەم دیسکانە پارتیشێنی خۆمان کە بە Logical Volume ناسراوەن بخولقێنین.

سوودی ئەم شێوازە لەوەدایە کە کاتێک کە قەبارەی ئەکێک لە پارتیشینەکان تەواو بوون دەتوانیی بۆشاییێکی بخەینە سەر واتە قەبارەی پێ زیاد بکەین بێ ئەوە کە کێشەیێک درووست بێ.

بەداخەوە LVM هەڵەچنین و گەڕانەوەی دەیتاکانمانی نییە ئەمەش بە پێچەوانەیRAID ، ئەکامی ئەمەش ئەوەیە کاتێک یەکێک لە پارتیشێنەکانمان خراپ بێ دەیتاکان خاپوور دەبن. ?

لەم فێرکارییە دامەزراندن و کانفیگی LVM لە لینوکس فێر دەبین،پێس دەستبەکار بوون چاوێک لەم وێنە بکە.

![](/server/images/06.png)

سەرەتا دەبێ پاکەتی lvm2 لە سەر لینوکس دامەزرێنین.

بۆ دابەشکراوەکانی دێبیان:

```shell
sudo apt install lvm2
```

بۆ دابەشکراوەکانی ڕێدهەت:

```shell
sudo yum install lvm2
```

ئێستا دەبێ بە فەرمانی pvcreate پارتیشێن یان دیسکەکان بگۆڕین بە Physical Volume .

```shell
pvcreate /dev/sda /dev/sdb
```

پاش ئەنجامدانی فەرمانی سەرەوە بۆ ئاگاداری لە Physical Volume لە فەرمانی خوارەوە سوود دەگرین.

```shell
pvdisplay
```

ئامانجی فەرمان بە شێوازی خوارەوەیە:

```shell
"/dev/sda" is a new physical volume of "8.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sda
  VG Name               
  PV Size               8.00 GiB
  Allocatable           NO
  PE Size               0   
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               cAwfbX-Nik0-X1iR-lAzP-GJGD-5FNS-tX5fuY
   
  "/dev/sdb" is a new physical volume of "8.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb
  VG Name               
  PV Size               8.00 GiB
  Allocatable           NO
  PE Size               0   
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               VRDlaw-eeXm-p3XP-2w4t-fCZ8-92NP-2izZb3
```

هەروا دەبینن کە دیسکەکانی sda و sdb بە قەبارەی 8گیگ ناسراوەن.

```shell
vgcreate vg_server /dev/sda /dev/sdb
```

ئێستا دەبێ ئەو Physical Volume ـانە کە دروستمان کردووە بە Volume Group بیانناسێنین.

```shell
vgdisplay vg_server
```

ئامانجی فەرمانەکەی سەرەوە بەم شێوەیە:

```shell
 --- Volume group ---
  VG Name               vg_server
  System ID             
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               15.99 GiB
  PE Size               4.00 MiB
  Total PE              4094
  Alloc PE / Size       0 / 0   
  Free  PE / Size       4094 / 15.99 GiB
  VG UUID               udnHV5-QwGw-PkA4-zsF3-5ABo-WhOA-XI51SZ
```

هەروا کە لەسەرەوە دەبینن کۆی ئەو بەشە کە زیادمان کردووە لە بەر ڕەستەی Free PE/ Size نیشان دراوە.
بۆ زیادکردنی دیسکی فرەتر بە Volume Groupدەتوانن بەم شێوازە کردار بکەن:

```shell
pvcreate /dev/sdd
vgextend vg_server /dev/sdd
```

ئێمە لێرە دانەێێک Physical Volume بەناوی sdd بە Volume Group زیاد دەکەین.

ئینجا دەتوانین بە شێوازی خوارەوە Logical Volume ـانە کە خوازمان لێیەتی و لە سەر Volume Group کە درووستکراوە بیناسێنین.

```shell
lvcreate -L 1G -n Vol01 vg_server
```

ئێمە لێرە دانەیێک Logical Volume بە قەبارەی 1Gb و بەناوی Vol01 دەناسێنین.

بۆ دیتنی ئامانجی کارەکەمان و بارودۆخەکە لە Logical Volume دروستکراوە، فەرمانی خوارەوە دەنووسین.

```shell
lvdisplay vg_server
```

ئامانج بەم شێوەیە :

```shell
 --- Logical volume ---
  LV Path                /dev/vg_server/Vol01
  LV Name                Vol01
  VG Name                vg_server
  LV UUID                dwdyI0-yy7l-jF9U-bPHB-QNpO-15RO-0uKlPH
  LV Write Access        read/write
  LV Creation host, time debian, 2016-08-11 11:48:48 -0400
  LV Status              available
  # open                 0
  LV Size                1.00 GiB
  Current LE             256
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:0
```

ئێستا دەتوانین Logical Volume ـی درووستکراوە لە گەڵ فۆرماتی فایلی سیستەمی دڵخوازمان بە شیوازی خوارەوە فۆرمات یان بسڕینەوە .

```shell
mkfs -t ext4 /dev/vg_server/vol01
```

لە کۆتایی بە فەرمانی mount ئەو ماونت بکەین.

```shell
mount /dev/vg_server/vol01 /mnt
```

ئەگەر بمانهەوێ ئەندازی Logical Volume دڵخوازمان بگۆڕین بەم شێوازە کردار دەکەین.

```shell
lvextend -L +800 /dev/vg_server/vol01
```

ئینجا بەفەرمانەکەی خوارەوە ئەو گۆڕانکارییە کە لە سەر Logical Volume ئەنجامان داوە تۆماری دەکەین:

```shell
resize2fs /dev/vg_server/vol01
```

لە نمونەی سەرەوە 800Mb لە بۆشایی چۆڵ لە Volume Group بە Logical Volume مان زیاد کرد.

```shell
lvremove /dev/vg_server/vol01
```

بۆ سڕینەوەی Volume Group فەرمانی خوارەوە دەنووسین:

```shell
vgremove vg_server
```

