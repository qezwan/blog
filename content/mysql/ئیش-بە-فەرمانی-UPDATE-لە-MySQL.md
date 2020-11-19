---
layout: post
title: ئیش بە فەرمانی UPDATE لە MySQL
tags: [mysql]
date : "2018-07-30 05:35:45"
---

### پێشەکی

لە وانەی پێش لەگەڵ فەرمانی مەرجی WHERE ئاشنا بووین، وە ئاماژەمان کرد کە ئەم فەرمانە لە چوارچێوەی UPDATE یش زۆر سوودی لێدەگرین. فەرمانی UPDATE لە MYSQL بۆ دەستکاری و بەڕۆژ کردنی خانەکانی بژاردە لە خشتەکان لە MYSQL سوودی دەبێت.یەکێک لە فەرمانە ئاساییەکان توانایی دەستکاری بەشێک لە زانیاریی بەکارهێنەرانە.

### فەرمانی بەڕۆژکردن لە MYSQL

چوارچێوەی فەرمانی UPDATE لە MYSQL بەم جۆرەیە

```sql
UPDATE table_name SET field1 = new-value1, field2 = new-value2
[WHERE Clause]
```



- ئێوە دەتوانن یەک یان چەند خانە بە تەواوی بەڕۆژ بکەنەوە.
- ئێوە دەتوانن هەر مەرجێک کە لە فەرمانی WHERE ئەنجامتان داوە لە چوارچیوەی UPDATEـیش ئەنجامی بدەن.
- ئێوە دەتوانن تەواوی بڕەکان لە خشتەیەک تەنها لە یەک کات بەڕۆژ بکەن.
- فەرمانی WHERE تەنها کاتێک کە ئێوە گەرەکتانە بە شێک لە تۆمارکراوەکانی خشتەیەک بەڕۆژ بکەنەوە زۆر کارامەیە.

### بەرۆژکردنی دراوە بە یارمەتی هێڵێ فەرمان

لەم بەشە نمونە کۆدێک بە فەرمانی UPDATE لەگەڵ مەرجی WHERE پیشان دراوە.

**نمونەی ١** :

لە نمونەی خوارەوە خانەی tutorial_title لە تۆمارکرووەیێک کە tutorial_id یەکەی بڕی ٣ی هەیە بەڕۆژ دەبێت:

```sql
root@host# mysql -u root -p password;
Enter password:*******
 
mysql> use TUTORIALS;
Database changed
 
mysql> UPDATE tutorials_tbl 
   -> SET tutorial_title = 'Learning JAVA' 
   -> WHERE tutorial_id = 3;
Query OK, 1 row affected (0.04 sec)
Rows matched: 1  Changed: 1  Warnings: 0
 
mysql>
```



### بەڕۆژکردنی دراوە لە کۆدی PHP

ئێوە دەتوانن لە فەرمانی UPDATE لەگەڵ WHERE یان بێ ئەو لە نەخشەی **()mysql_query** لە PHP سوود بگرن
لە نەخشەی سەرەوە ، فەرمانەکانی SQL وەک هێڵی فەرمانی <mysql جێبەجێ دەکا.

**نمونەی ٢**

لە نمونەی خوارەوە خانەی **tutorial_title** لە تۆمارکراوەیێک کە tutorial_idی بڕی ٣یە بەڕۆژ دەبێت:

```sql
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
 
   $sql = 'UPDATE tutorials_tbl
      SET tutorial_title="Learning JAVA"
      WHERE tutorial_id=3';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
    
   if(! $retval ) {
      die('Could not update data: ' . mysql_error());
   }
   echo "Updated data successfully\n";
   mysql_close($conn);
?>
```