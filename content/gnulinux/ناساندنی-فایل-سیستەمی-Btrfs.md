---
layout: post
title: ناساندنی فایل سیستەمی Btrfs
tags: [گنو/لینوکس]
date : "2017-02-27 05:20:45"
---

![](/gnulinux/images/00008.png)

فایل سیستم (Filesystem)بە شێوازێک بۆ پاشکەوتکردنی زانیاریەکان و گەڕانەوەیان دەڵێن.کاتێک ئێوە فایلیکی دەق دەنووسن ئەمە فایل سیستەمە کە ڕێتان پێدەدات لە کوێ و چۆن پاشکەوتی بکەن.
Btrfs کورتکراوەی B-tree Filesystem کە فایل سیستەمێکی بە موڵەتدانی GPL .کە لە لایەن کۆمپانیاکانی  لینوکس فاندیشن،ئینتێل،فۆجیستۆ،رێدهات،فەیسبووک، ئۆراکڵ،سووزە و … هتد گەشەی سەندووە.

ئەم فایل سیستەمە هاردەکان بە قەبارەی 16 ئێگزا بایت و فایل بە ئەندازەی 8 ئێگزابایت پاڵپشتی دەکات. بۆ ناو لێنان فایلەکان لە سەر ئەم فایل سیستەمە بێجگەلە ‘/’ و NULL  هەر ناوێک دەتوانیت بنووسرێت.

##### تایبەتمەندیەکانی Btrfs :

- یەکخستنی پارچەبەندبووەکانی دیسک بە شێوازی سەرهێڵ(Defragmention).
- گۆڕینی ئەندازەی پارتیشێنەکان بە شێوازی سەر هێڵ(Volume).
- سڕینەوە یان زیادکردنی هارد بە شێوازی سەر هێڵ.
- چاودێری فایل سیستەم بە شێوازی دەرهێڵ(Fsck).
- چاودێری فایل سیستەمەکان و چارەسەری کێشەکان بە شێوازی سەر هێڵ(Data Scrubbing).
- پالپشتی لە RAID0 , RAID1, RAID10.
- پاڵپشتی لە Subvolumeەکان.
- پساندن (Transparent Compression).
- چاودێری Checksum لە سەر داتاکان و Metadata.

Btrfs لەسەر زۆربەی دابەشکراوەکان بە شێوازی پێشگریمان دادەمەزریت بەڵام بۆ سوود وەرگرتن، دەبێت ئامێرەکانی پێویست لەسەر دابەشکراوەکەتان دامەزرێنن.

##### بۆ دابەشکراوەکانی دێبیان:

```shell
apt install btrfs-tools
```

بۆ دابەشکراوەکانی رێدهات.

```shell
yum install btrfs-progs
```

`خاڵ :` تایبەتمەندیێکی بەهێزی Btrfs ئەوەیە کە ئێوە دەتوانن فایل سیستەم لە سەر هاردێکی چۆڵ و خام کە هێشتا پارتیشێن نەکراوە درووستبکەن. ئیتر پێویستان بە ئامرازی fdisk بۆ پارتیشین نییە.
بۆ وێنە بۆ درووستکردنی فایل سیستەمی Btrfs لە سەر سێ دیسکی sdb, sdc, sdd فەرمانەکەی خوارەوە بنووسن :

```shell
mkfs.btrfs /dev/sdb /dev/sdc /dev/sdd
```

پاش فەرمانەکەی سەرەوە ئەم دەرەنجامەتان هەیە :

```shell
Btrfs v3.17
See http://btrfs.wiki.kernel.org for more information.

Turning ON incompat feature 'extref': increased hardlink limit per file to 65536
adding device /dev/sdc id 2
adding device /dev/sdd id 3
fs created label (null) on /dev/sdb
	nodesize 16384 leafsize 16384 sectorsize 4096 size 24.00GiB
```

`خاڵ :`گەر فەرمانی mkfs.btrfs بۆ چەند هارد بەکار بهێنین بە شێوازی پێشگریمان (RAID0 (Stripe بۆ پاشکەوتکردنی زانیاری و Mirror) RAID1) بۆ پاشکەوتکردنی Metadata چالاک دەبێت.سوودی ئەمە ئەوەیە گەر یەکێک لە هاردەکان دوچاری کێشە بن دەتوانین بە فەرمانی Metadata زانیاریەکان بگەرێنینەوە.
گەر پێت خۆشە کە btrfs تەنها لەسەر دیسکێک دروستبێت یان گەرەکتان نییە کە Data و Metadata بەشێوازی RAID پاسکەوت بێت لە ئۆپشین یان سویچی m- سوود بگرن وەک فەرمانەکەی خوارەوە :

```shell
mkfs.btrfs -m single /dev/sdb
```

گەر پێتان خۆشە ئەم کارە بۆ چەند دیسک بەکارببەن لە فەرمانەکەی خوارەوە سوود بگرن :

```shell
mkfs.btrfs -m raid0 /dev/sdb /dev/sdc /dev/sdd
لە نمونەی سەرەوە بۆ پاسکەوتکردنی Metadata لە (RAID0 (Stripe بەجێگەی RAID1 (پێشگریمان) سوود دەگرین.
هەروا دەتوانین جۆری پاشکەوتکردن Data و Metadata بە حەزی خۆمان بناسێنین. بۆ وێنە:
mkfs.btrfs -m raid0 -d raid1 /dev/sdb /dev/sdc /dev/sdd
```

لە فەرمانەکەی سەرەوە جۆری سویچەکانی m- و d- شێوازی پاشکەوتکردن دەناسێنن.
`خاڵ :`دەتوانین لە RAID10 بۆ پاشکەوتکردنی Data و Metadata سوودبگرین،بەڵام دەبێ هۆشیار بین کە بۆ سوود وەرگرتن لە RAID10 ژمارەی دیسکەکان لانی کەمدەبێت ۴ دیسک بێت.

بۆ زانیاری ئەو فایل سیستەمە کە درووستتکردووە دەبێتئەم فەرمانە بەکار بێنیت :

```shell
btrfs filesystem show /dev/sdb
```

لە فەرمانەکەی سەرەوە ئێمە بۆ نیشاندانی تواناییەکانی RAID در Btrfs لە ۳ دیسک سوودمان بینیوە.بۆ نیشاندانی زانیاری هیچ جیاوازی نییە کە کام دیسک لەم فەرمانە دابنین بۆ ئەوە کە هەر ۳دیسک پەیوەندیان بە یەک فایل سیستەم هەیە لە رووکارێکی Pool .
دەرەنجامی فەرمانەکەی سەرەوە بەم شێوازەیە :

```shell
Label: none  uuid: f36e0a56-bcea-4637-a1e4-c9788574d84a
	Total devices 3 FS bytes used 112.00KiB
	devid    1 size 8.00GiB used 1.82GiB path /dev/sdb
	devid    2 size 8.00GiB used 827.19MiB path /dev/sdc
	devid    3 size 8.00GiB used 1.81GiB path /dev/sdd

Btrfs v3.17
```

پاش ئەوە فایل سیستەمان درووستکرد دەتوانین بە فەرمانی خوارەوە Mount بکەین :

```shell
mount /dev/sdb /mnt
```

بۆ دیتنی قەبارە مەسرەفکراوەو قەبارەی چۆڵی فایل سیستەم لەم فەرمانە سوود دەگرین :

> ```shell
> btrfs filesystem df /mnt
> ```

ئەمەش دەرەنجامی فەرمانەکەی سەرەوە :

```shell
Data, RAID0: total=2.40GiB, used=832.00KiB
Data, single: total=8.00MiB, used=0.00B
System, RAID1: total=8.00MiB, used=16.00KiB
System, single: total=4.00MiB, used=0.00B
Metadata, RAID1: total=1.00GiB, used=112.00KiB
Metadata, single: total=8.00MiB, used=0.00B
GlobalReserve, single: total=16.00MiB, used=0.00B
```

یەکێک لە تواناییەکانی فایل سیستەمی Btrfs پساندانی زانیاریەکانە.بە شێوازە کە زانیاریەکان کاتێک لە سەر دیسک پاسکەوت دەبەن قەبارەیان کەم دەبێت واتە پساندانیان لەسەر ئەنجام دەبێت.ئەمەش دەبێتە هۆکاریک بۆ زۆر بوونی قەبارەی دیسک.دوو شێواز بۆ پساندان لە فایل سیستەمی Btrfs بریتییە لە zlib و lzo .
`خاڵ : `Btrfs بە شێوازی پێشگریمان بە شێوەی zlib پساندان ئەنجام دەدات.
بۆ چالاک کردن ئەم تواناییە دەبێت وەک فەرمانی خوارەوە دیسکەکە Mount بکەن :

```shell
mount -o compress=lzo /dev/sdb /mnt
```

یا

```shell
mount -o compress=zlib /dev/sdb /mnt
```

یا

```shell
mount -o compress /dev/sdb /mnt
```

لە یەکەم فەرمان بە شێوازی lzo وە دووهەم فەرمان بە شێوازی zlib وە لە فەرمانی کۆتایی بە شێوازی پێشگریمان خۆی پساندن دەکات.
`خاڵ :` کاتیک ئێوە پەساندن لەسەر دیسکێک بە شێوازی Mount دەکەن لەمەوبەر فایلەکان قەبارەیان کەم دەبێتوە.

یەکێک لە تایبەتمەندیەکانی Btrfs کەم کردنەوەی قەبارەیVolume بە شێوازی دەرهێڵە.بۆ وینە لە فەرمانی خوارەوە ئەندازەی 2 گیگابایت لە بۆشایی فایل سیستەمەی mnt/ کەم دەکەینەوە:

```shell
btrfs filesystem resize -2g /mnt
```

لەفەرمانەکەی خوارەوەی 500 مێگ بە فایل سیستەمی mnt/ زیاد دەکەین.

```shell
btrfs filesystem resize +500m /mnt
```

بۆ زیادکردنی دیسکێکی نوێ بە فایل سیستەمەکەمان وەک فەرمانی خوارەوە کردار دەکەین :

```shell
btrfs device add /dev/sde /mnt
```

فەرمانەکەی خوارەوە بۆ نیشاندانی بارودۆخی فایل سیستەمەکەمانە :

> ```shell
> btrfs filesystem show /dev/sdb
> ```

دەرئەنجامەکە بەم شێوازە بوو :

```shell
Label: none  uuid: f36e0a56-bcea-4637-a1e4-c9788574d84a
	Total devices 4 FS bytes used 960.00KiB
	devid    1 size 8.00GiB used 1.82GiB path /dev/sdb
	devid    2 size 8.00GiB used 827.19MiB path /dev/sdc
	devid    3 size 8.00GiB used 1.81GiB path /dev/sdd
	devid    4 size 8.00GiB used 0.00B path /dev/sde

Btrfs v3.17
```

هەروا کە دەبینین دیسکی sde بە فایل سیستەمەکەمان زیادکرا،بەڵام لە بۆشایی دیسکەکە سوود نابینرێت بۆ ئەوە کە بتوانین ئەم بۆشاییەی دیسکەکەمان کە زیادمان کردووە بەکەڵک بێت، لەم فەرمانە سوود دەگرین :

```shell
btrfs filesystem balance /mnt
```

ئەمانجی فەرمانەکەی سەرەوە بەم شێوازەیە :

```shell
Done, had to relocate 6 out of 6 chunks
```

بۆ سڕینەوەی دیسکێک لە فایل سیستەملە فەرمانەکەی خوارەوە سوود دەگرین :

```shell
btrfs device delete /dev/sdc /mnt
```

گەر هەرەکتانە RAID Level لە ئەو دیسکە کە درووستان کردووە بیگۆرن لەفەرمانەکەی خوارەوە سوود بگرن :

```shell
btrfs balance start -dconvert=raid1 -mconvert=raid1 /mnt
```

یەکێک لە تواناییەکانی قەشەنگی btrfs واتایێکە بە ناوی Subvolume. لە btrfs دەتوانین لە هەر فایل سیستەم Subvolumeـەکان درووستبکەین و ئینجا لە Subvolumeـەکان Snapshot بگرین.یان بەشێوازی سەربەخۆ لە فایل سیستەمی فەرمی Mount بکەین.
بۆدرووستکردنیSubvolume لە فەرمانی خوارەوە سوود دەبینین :

```shell
btrfs subvolume create /mnt/sv1
```

لە فەرمانی سەرەوە Subvolume ، بە ناوی sv1 لە فایل سیستەمی mnt/ درووستکرا.
بۆ نیشاندانی دۆخی Subvolumeـەکان لە فایل سیستەمی mnt/ فەرمانەکەی خوارەوە دەنووسین:

```shell
btrfs subvolume list /mnt
```

ئامانجی ئەم فەرمانە بەم شیوازەیە :

```shell
ID 272 gen 136 top level 5 path sv1
```

هەروا کە چاوی لێدەکەن Subvolume دانەیێک ID تایبەت بەخۆی هەیە کەئاماژە بە Subvolume دەکات.
هەروا دەتوانین Subvolume لە نێو Subvolume تر درووستبکەین.

```shell
btrfs subvolume create /mnt/sv1/sv2
```

بۆ Mount کردنی دانەیێک Subvolume بە شێوازی خوارەوە کردار دەکەین:
سەرەتا فایل سیستەمی فەرمی کە Mount بووە Unmount ـی بکەین.

```shell
umount /mnt
```

ئینجا بە فەرمانەکەی خوارەوە Subvolume ID بە شێوازی Mount دەریدێنین.

```shell
mount -o subvolid=272 /dev/sdb /mnt
```

لە فەرمانەکەی سەرەوە Subvolume ،ID ـەکەی ئێمە بەرابەری 266 ـەیە.هەروا دەتوانین بە جێگای سوودگرتن لە ID لە ناوی Subvolume ئیستفادە بکەین.

```shell
mount -o subvol=sv1 /dev/sdb /mnt
```

خاڵ : ID پەیوەند بە Volume ریشە یان ڕەگ 0 ـە.
بۆ گۆڕینی Default Volume لە کاتی Mount دەتوانین بەم فەرمانە کردار بکەین :

```shell
btrfs subvolume set-default 266 /mnt
```

لەمەودا Mount کردنی فایل سیستەم، بە جیاتیVolume ریشە Subvolume دیاری کراوە و بە شێوازی پێشگریمان Mount دەبێت.
بۆ سڕینەوەی Subvolume فەرمانی خوارەوە دەنووسین :

```shell
btrfs subvolume delete /mnt/sv1
```

لە فەرمانەکەی سەرەوە Subvolume بە ناوی sv1 دەسڕێتەوە.
یەکیکی دیکە لە توانایەکانی btrfs ئیمکانی Snapshot لە Subvolume ـەکان بە شێوازی سەرهێڵە. لەلایەن Snapshot ـەکان دەتوانین Data ـکانی پاشکەوتکراوە لە Subvolume ـەکان پاڵپشتی بگرین تا لە کاتی پێویست Data کان بگەڕێنینەوە بۆ دۆخی سەرەتایی.
بۆگرتی Snapshot فەرمانی خوارەوە دەنووسین.

```shell
btrfs subvolume snapshot /mnt/sv1 /mnt/sv1_snapshot
```

لە فەرمانەکەی سەرەوە Snapshot بە ناوی sv1_snapshot لە sv1 گیرا.
ئێستا دەتوانین Snapshot لە کاتی پێویست ڕاستەو خۆ Mount بکەین و زانیاریەکان وا پاشکەوتمان کردووە سوودیان لێ بگرین.

> ```shell
> > mount -o subvol=sv1_snapshot /dev/sdb /mnt
> ```



بۆ یەکخستنی پارچەبەندبووەکانی دیسک (Defragment) بە فەرمانەکەی خوارەوە کردار دەکەین:

```shell
btrfs filesystem defrag /mnt
```

هەروا دەتوانین ب فەرمانەکەی خوارەوە یەکخستنی پارچەبەندبووەکانی دیسک بە شێوازی خۆکارMount بکەین :

```shell
mount -o autodefrag /dev/sdb /mnt
```





سەرچاوە: [howtoforge](https://www.howtoforge.com/a-beginners-guide-to-btrfs) 