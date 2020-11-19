---
layout: post
title: خشتە کاتییەکان لە MySQL
tags: [mysql]
date : "2018-06-20 05:35:45"
---

### پێشەکی

تا ئێستا لەگەڵ خشتە ئاساییەکان و دەستکارییان لە بنکەدراوەی MYSQL ئاشنا بووین.بێجگە لەوان دەتوانین لە خشتە کاتییەکان[^1]لە MYSQL بۆ هەڵگرتنی دراوە کاتییەکانیش سوود بگرین، تەنها یەک خاڵ دەبێ ڕچاو بگرن ، کە بنکەدراوە خشتە کاتییەکان پاش تەواو بوونی خولێکی کاری[^2]بەکارهێنەرانی ئێستاکە، دەیسڕێتەوە.

### خشتەکاتییەکان چیین ؟

خشتەکاتییەکان لە وشانی ٣،٢٣ لە MYSQL زیاد کران.گەر ئێوە لە وشانی کۆنەی MYSQL سوود دەگرن، ناتوانن لە خشتەکاتییەکان سوود بگرن، بەڵام دەتوانن لە خشتەکانی **Heap** کەڵک ببینن.
هەر وا کە ئاماژەمان پێکرد خشتە کاتییەکان تەنها تا کۆتایی خولی کاری لە ئاڕادایە، بەردەوام دەبێت.کاتیک کە سکریپتەکانی PHP جێبەجێدەبێت، کاتێک کە جێبەجیکردنی PHP تەواو دەبێت، خشتەی کاتیش تەواو دەبێت.
گەر بە ڕاژەی MYSQL لە ڕێگای ڕاژەخوازی MYSQL پەیوەندی دەگرن، دەبێ خشتە کاتییەکان دەستی بسڕنەوە.یان کاتێک کە خولی کاری تەواو دەبێت دەسڕێتەوە.
**نمونە**
بەرنامەی خوارەوە نمونەی ساکارە بۆ چۆنیەتی سوود وەرگرتن لە خشتەکانی کاتی .
ئەم خشتە دەتوانرێت لە چوارچێوەی **() mysql_query** لە PHP بەکاربهێنین:

```sql
mysql> CREATE TEMPORARY TABLE SalesSummary (
   -> product_name VARCHAR(50) NOT NULL
   -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
   -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
   -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
);
Query OK, 0 rows affected (0.00 sec)
 
mysql> INSERT INTO SalesSummary
   -> (product_name, total_sales, avg_unit_price, total_units_sold)
   -> VALUES
   -> ('cucumber', 100.25, 90, 2);
 
mysql> SELECT * FROM SalesSummary;
+--------------+-------------+----------------+------------------+
| product_name | total_sales | avg_unit_price | total_units_sold |
+--------------+-------------+----------------+------------------+
|   cucumber   |   100.25    |     90.00      |         2        |
+--------------+-------------+----------------+------------------+
1 row in set (0.00 sec)
```

کاتێک کە فەرمانی **SHOW TABLES** جێبەجێی دەکەین، خشتە کاتییەکان لە چوارچێوەی پێرست جێگیر نابن.
ئێستا گەر لە خولی کاری MYSQL بچنەدەرەوە وە فەرمانێکی **SELECT** جێبەجێ بکەن، خشتەی کاتی پەیدا ناکەن.



### سڕینەوەی خشتەی کاتی

لە حاڵەتی پێشگریمانە، کاتێک بنکەدراوە تەواو دەبێت. تەواو خشتە کاتییەکان لادبرێن. بەڵام گەر بتانهەوێ بەشێک لە ئەوان خۆتان بیسڕنەوە(لای بەرن)، دەتوانن فەرمانی **DROP TABLE** جێبەجێ بکەن.
بەرنامەی خوارەوە نمونەیەکی سادە لە سڕینەوە خشتەیەکی کاتییە :

```sql
mysql> CREATE TEMPORARY TABLE SalesSummary (
   -> product_name VARCHAR(50) NOT NULL
   -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
   -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
   -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
);
Query OK, 0 rows affected (0.00 sec)
 
mysql> INSERT INTO SalesSummary
   -> (product_name, total_sales, avg_unit_price, total_units_sold)
   -> VALUES
   -> ('cucumber', 100.25, 90, 2);
 
mysql> SELECT * FROM SalesSummary;
+--------------+-------------+----------------+------------------+
| product_name | total_sales | avg_unit_price | total_units_sold |
+--------------+-------------+----------------+------------------+
|   cucumber   |   100.25    |     90.00      |         2        |
+--------------+-------------+----------------+------------------+
1 row in set (0.00 sec)
mysql> DROP TABLE SalesSummary;
mysql>  SELECT * FROM SalesSummary;
ERROR 1146: Table 'TUTORIALS.SalesSummary' doesn't exist
```

------

[^1]: temporary tables
[^2]:session:١-خولێکی کاری، دانیشتن، کۆڕ، ٢-کۆڕی وانه‌، وانه‌کۆڕ، پۆل

