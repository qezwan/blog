---
layout: post
title: زنجیرەکان (sequence) لە MySQL
tags: [mysql]
date : "2018-06-16 05:35:45"
---

### پێشەکی

زنجیرەکان[^1]لە MYSQL ، کۆی ژماره تەواوەکانن[^2]١،٢،٣،…، کە بە مەبەستی داوا تایبەتییەکان دروستدەبن. زنجیرەکان زۆرتر لە بنکەدراوەکان بەکاردەهێنرێن. چونکە زۆر یەک لەپرۆگرامەکان نیازیان بە هەر دێڕێک لە خشتە بۆ هەبوونی بڕێکی تایبەت و یەکتا هەیە، لەم ڕوانگە خنجیرەکان رێگایێکی هاسان بۆ بەرهەمهێنانی زنجیرەکانە.

### ئیش بە زنجیرەکان لە MYSQL

#### سودوەرگتن لە خانەی AUTO_INCREMENT

سادەترین رێگا بۆ سودوەرگرتن لە زنجیرەکان لە MYSQL، ناساندنی یەک خانە لە جۆری**AUTO_INCREMENT**ــە.
**نمونەی ١**
لە نمونەی خوارەەوە لەگەڵ ژمارەیەک خانەی دروستکراوە و دواتر ژمارەیەک تۆمارکراوە بەو خانەیە زیاددەبێت.\\لەم خشتەیە نیاز بە تێخستنی بڕی خانەی ID نییە،بۆ ئەوە کە بڕی ئەو بە شیوازی خۆکارانە لە هەر تۆمارکراوەیەک زۆر دەبێت:

```sql
mysql> CREATE TABLE insect
   -> (
   -> id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   -> PRIMARY KEY (id),
   -> name VARCHAR(30) NOT NULL, # type of insect
   -> date DATE NOT NULL, # date collected
   -> origin VARCHAR(30) NOT NULL # where collected
);
Query OK, 0 rows affected (0.02 sec)
mysql> INSERT INTO insect (id,name,date,origin) VALUES
   -> (NULL,'housefly','2001-09-10','kitchen'),
   -> (NULL,'millipede','2001-09-10','driveway'),
   -> (NULL,'grasshopper','2001-09-10','front yard');
Query OK, 3 rows affected (0.02 sec)
Records: 3  Duplicates: 0  Warnings: 0
mysql> SELECT * FROM insect ORDER BY id;
+----+-------------+------------+------------+
| id |    name     |    date    |   origin   |
+----+-------------+------------+------------+
|  1 |  housefly   | 2001-09-10 |   kitchen  |
|  2 |  millipede  | 2001-09-10 |  driveway  |
|  3 | grasshopper | 2001-09-10 | front yard |
+----+-------------+------------+------------+
3 rows in set (0.00 sec)
```



#### وەرگرتنی بڕەکانی AUTO_INCREMENT

نەخشەی **( ) LAST_INSERT_ID** لە SQL بۆ هەر ڕاژەخواز[3)](http://wiki.kurd.click/زنجیرەکان_sequence_لە_mysql#fn__3)ـێک کە بریتییە لە فەرمانەکانی SQL، سود دەبینرێت. ئەم نەخشەیە بە مەبەستی وەرگرتنی دوایین بڕی خانەی**AUTO_INCREMENT** بەکاردەبردرێت.
**نمونەی ١ - PERL**
تایبەتمەندی **mysql_insertid** بۆ وەرگرتنی بڕی **AUTO_INCREMENT** کە بە یەک داوا بەرهەمهێنراوە، سوودی لێدەگرین.
ئەم تایبەتمەندییە لە هاوپۆلی بنکەدراوە یان هاوپۆلێک لە فەرمانە هەبووەکانە.لەنمونەی خوارەوە ئەو لە رێگای فەرمانی هاوپۆلی بنکەدراوە دەنێرین :

```sql
$dbh->do ("INSERT INTO insect (name,date,origin)
VALUES('moth','2001-09-14','windowsill')");
my $seq = $dbh->{mysql_insertid};
```

**نمونەی ١ - PHP** پاش دەرچوونی داوایەک لە بڕی AUTO_INCREMENT بەرهەمدێنێت. بانگکردنی فەرمانی () mysql_insert_id ی ئەو بڕەدەگەڕێنێتەوە:

```sql
mysql_query ("INSERT INTO insect (name,date,origin)
VALUES('moth','2001-09-14','windowsill')", $conn_id);
$seq = mysql_insert_id ($conn_id);
```



### گۆڕانی ژمارەی زنجیرەیەکی هەبوو

گریمانە کە ئێوە تەواو تۆمارکراوەکانی خشتەیەکتان سڕیوە، وە بڕیارتان داوە کە دووبارە زنجیرەی تۆمارکراوەکان پشت سەر بخەن. ئەم ئیشە بە فێڵێکی سادە و ساکار جێبەجیدەکرێت.بەڵام لەدۆخی تێکڵاو بوونی خشتەی ئێوە لەگەڵخشتەیەکی دیکە کەمێ دژوارە.
گەر پێتان وایە کە گۆڕانی دووبارەی یەک خانە AUTO_INCREMENT پارێزهەڵنەگرە،رێگایێک ئەوەیە کە خانە لە خشتەکە بسڕنەوە ئینجا دووبارە زیادی بکەن.
نمونەی خوارەوە نیشانی دەدا چۆن بڕەکانی id لە خشتە بە یارمەتی ئەم تەکنیکە دووبارە سەرژمێری دەکەین:

```sql
mysql> ALTER TABLE insect DROP id;
mysql> ALTER TABLE insect
   -> ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
   -> ADD PRIMARY KEY (id);
```



### دەستپێکردنی زنجیرە لە چوارچێوەی بڕێکی تایبەت

پێسگریمانە MYSQL زنجیرەیەک لە ١ دەستپێدەکا.ئێوە دەتوانن هەر ژمارەیەکی دیکە لە کاتی دروستکردنی خشتە، دیاری بکەن.بەرنامەی خوارەوە نمونەیەکە کە نیشان دەدا چۆن MYSQL زنجیرەکان لە ١٠٠ دەستپێدەکا:

```sql
mysql> CREATE TABLE insect
   -> (
   -> id INT UNSIGNED NOT NULL AUTO_INCREMENT = 100,
   -> PRIMARY KEY (id),
   -> name VARCHAR(30) NOT NULL, # type of insect
   -> date DATE NOT NULL, # date collected
   -> origin VARCHAR(30) NOT NULL # where collected
);
```

هەر وەها دەتوانن پاش دروستکردنی خشتە، بەیارمەتی فەرمانی **ALTER TABLE**دەرمانی بڕی زنجیرە رێکبخەن :

```sql
mysql> ALTER TABLE t AUTO_INCREMENT = 100;
```



[^1]:  Sequence:ڕیزه، زنجیره
[^2]:integer
[^3]:client

