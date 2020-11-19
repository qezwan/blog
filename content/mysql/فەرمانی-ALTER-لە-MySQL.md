---
layout: post
title: فەرمانی ALTER لە MySQL
tags: [mysql]
date : "2018-06-22 05:35:45"
---

### پێشەکی

زۆر جار بە هۆکارێک، پێویستە کە ناوی خشتەیەک یان خانەیەک بگۆڕن یان هەمووی خشتەکان و خانەکان.هەروەها جاری وا هەیە کە گەرەکتانە خانە یان خانەکانی خشتەیەک بسڕنەوە یان بە خشتەیەک زیادی بکەن؛ بۆ ئەم مەبەستانە فەرمانی ALTER بەکار دەهێنن.

### فەرمانی ALTER لە MYSQL

فەرمانی ALTER لە بنکەدراەی MYSQL بۆ هەر جۆرە گۆڕانکاریێک لە خشتەکان و خانەکان یان زیادکردن و سڕینەوەی خانەکان کاراییە هەیە.
سەرەتا خشتەیەک بە ناوی **testalter_tbl** دروستدەکەین:

```sql
root@host# mysql -u root -p password;
Enter password:*******
 
mysql> use TUTORIALS;
Database changed
 
mysql> create table testalter_tbl
   -> (
   -> i INT,
   -> c CHAR(1)
   -> );
Query OK, 0 rows affected (0.05 sec)
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field |  Type   | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
|   i   | int(11) | YES  |     |   NULL  |       |
|   c   | char(1) | YES  |     |   NULL  |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec
```



### سڕینەوە، زیادکردن و گۆڕینی شوێنی ستونێک لە خشتەکان

بە مەبەستی ئەوە ستونی I لە خشتەکانی mysql بسڕینەوە، دەبێ فەرمانی DROP پاش ALTER بەشێوازی خوارەوە بەکاربهێنین:

```sql
mysql> ALTER TABLE testalter_tbl  DROP i;
```

خاڵ :گەر خشتەکان تەنها بریتی بن لە ئەستوونێک، فەرمانی DROP ئیش ناکا.
بۆ زیادکردنی ستوون دەتوانن فەرمانی ADD لە پێناسەی ستوون پاش ALTER بەکاربهێنن.
لە نمونە کۆدی خوارەوە ستوونی I بە خشتەی testalter_tbl زیاددەکەن.

```sql
mysql> ALTER TABLE testalter_tbl ADD i INT;
```

پاش زیادکردنی دووبارەی I بە خشتەی testalter_tbl ،چوارچێوەکەی وەک پێش نابێت. بۆ ئەوە کە لە سەرەتاوە ستوونی I یەکەمین ستوونی ئەم خشتە بووە، بەڵام بە سڕینەوە و زیادکردنی دووبارەی ئەو بە خشتە، ستوونێک کە بە نوێیی زیاد کرا بە کۆتایی خشتە زیاد دەبێ

```sql
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field |  Type   | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
|   c   | char(1) | YES  |     |   NULL  |       |
|   i   | int(11) | YES  |     |   NULL  |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

ئێستا گەر هەرەکتانە ئەستوونێک کە زیادی دەکەن بە سەرەتای خشتە زیاد بکرێت دەبێ لە کۆتایی **ALTER** لە کلیل وشەی **FIRST** سوود بگرن.
گەر هەرەکتانە ستوونی نوێ پاش ستونێکی تایبەت لە خشتە خێگیر بکرێت ناوی ئەو ستوونە پاش **AFTER** وە ناوی ستوونی نوێ پێش ئەو بێنن.
لە نمونەی خوارەوە ستوونی I جارێک بە عینوانی یەکەمین ستوون بە خشتە زیاد کراوە و جارێکی دیکە پاش ستوونی c بە خشتە زیاد بووە

```sql
ALTER TABLE testalter_tbl DROP i;
ALTER TABLE testalter_tbl ADD i INT FIRST;
ALTER TABLE testalter_tbl DROP i;
ALTER TABLE testalter_tbl ADD i INT AFTER c;
```

خاڵ :
کلیل وشەکانی FIRST و AFTER تەنها بە فەرمانی ADD بەکاردەبرێن.
ئەمەش بەو مانایەیە گەر هەرەکتانە کە شوێنی ستوونێک لە خشتە بگۆڕن ،سەرەتا دەبێ بیسڕنەوە ئینجا لە شوێنی نوێ بە فەرمانی ADD زیادی بکەن.



### گۆڕانی پێناسەی ستوون یان ناوەکەی

بۆ گۆڕانی پێناسەی ستوون لە کلیل وشەی **MODIFY** یا **CHANGE** لە فەرمانی ALTER سوود بگرن.
بۆ نمونە بۆ گۆڕینی ستوونی C لە (CHAR(1 بە (CHAR(10 دەتوانن لە فەرمانی خوارەوە سوود بگرن :

```sql
mysql> ALTER TABLE testalter_tbl MODIFY c CHAR(10);
```

بە CHANGE ، داڕستانی بیتێک جیاوازە.کەوایە دەبێ پاش کلیل وشەی CHANGE نوی ستوون بۆ گۆڕان بنووسین.ئینجا پێناسەیێکی نوێ دەناسێنین کە بریتییە لە ناوی نوێ.

```sql
mysql> ALTER TABLE testalter_tbl CHANGE i j BIGINT;
```

بۆ گۆڕانی **J** لە **BIGINT** بە **INT** بێ گۆڕینی نێوی ستوون، کۆد دەبێ بە شێوازی خوارەوە بێت :

```sql
mysql> ALTER TABLE testalter_tbl CHANGE j j INT;
```

کاتی گۆڕین یا گۆڕینی ستوونێک، دەتوانین دابینی بکەین کە ئایا ستوون دەتوانێت بڕەکانی Null یان بڕی گریمانەی هەبێت یان نە. لە ڕاستیدا گەر ئێوە ئەم ئیشە نەکەن،MYSQL بە شێوازی خۆکارانە بڕەکان بۆ ئەم تایبەتمەندییانە ڕچاو دەگرێت.
لە نمونە کۆدی خوارەوە ستوونێک کە بڕی **NOT NULL** هەیە، بڕی پێشگریمانەی ١٠٠ پێدراوە:

```sql
mysql> ALTER TABLE testalter_tbl 
   -> MODIFY j BIGINT NOT NULL DEFAULT 100;
```

گەر لە کۆدی سەرەوە سوود ناگرن MYSQL گشت ستوونەکان بە بڕی NULL پڕ دەکاتەوە.



### گۆڕینی بڕەکانی پێش گریمانەی ستوونێک

بە یارمەتی ALTER ئێوە دەتوانن بڕی پیشگریمان بۆ هەر ستوونێک دابین بکەن.
نمونەی خوارەوە چاو لێبکەن:

```sql
mysql> ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field |  Type   | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
|   c   | char(1) | YES  |     |   NULL  |       |
|   i   | int(11) | YES  |     |   1000  |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

ئێوە دەتوانن پێشگریمانەکان لە ستوونەکان بە یارمەتی لە فەرمانی DROP لەگەڵ ALTER بسڕنەوە.

```sql
mysql> ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field |  Type   | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
|   c   | char(1) | YES  |     |   NULL  |       |
|   i   | int(11) | YES  |     |   NULL  |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```



### گۆڕینی جۆری خشتەیەک

ئێوە دەتوانن لە جۆری خشتەکان سوود بگرن، بەم شێوازە کە لە **TYPE** لە درێژی فەرمانی ALTER سوود بگرن.
لە نمونەی خوارەوە خشتەکان testalter_tbl لە جۆری MYISAM بگۆڕن. بۆ پەیداکردنی **TYPE** ئێستا خشتەکان دەتوانن لە**SHOW TABLE STATUS** سوود بگرن :

```sql
mysql> ALTER TABLE testalter_tbl TYPE = MYISAM;
mysql>  SHOW TABLE STATUS LIKE 'testalter_tbl'\G
*************************** 1. row ****************
           Name: testalter_tbl
           Type: MyISAM
     Row_format: Fixed
           Rows: 0
 Avg_row_length: 0
    Data_length: 0
Max_data_length: 25769803775
   Index_length: 1024
      Data_free: 0
 Auto_increment: NULL
    Create_time: 2007-06-03 08:04:36
    Update_time: 2007-06-03 08:04:36
     Check_time: NULL
 Create_options:
        Comment:
1 row in set (0.00 sec)
```



### گۆڕنین ناوی خشتەیەک

بۆ گۆڕینی ناوی خشتەکان لە بژاردەی **RENAME** لە چوارچێوەی **ALTER TABLE** سوود دەگرین.
لە نمونەی خوارەوە ناوی خشتە لە testalter_tbl به alter_tbl دەگۆڕین:

```sql
mysql> ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```

ئێوە دەتوانن لە فەرمانی ALTER بۆ دروستکردن و سڕینەوە(ئازادکردن)ـی فەرمانی INDEX لە بڕگەی MYSQL سوود بگرن.