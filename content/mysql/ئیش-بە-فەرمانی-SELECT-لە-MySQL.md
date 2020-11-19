---
layout: post
title: ئیش بە فەرمانی SELECT لە MySQL
tags: [mysql]
date : "2018-08-02 05:35:45"
---

### پێشەکی

تا ئێستا لەگەڵ تێخستنی دراوە بۆ بنکەدراوەکان ئاشنا بووین. بەڵام گەر هەرەکمانە کە دراوەێێک لە خشتەیەک یان چەندین خشتە بپاڵیوین یان گەڕانی لەسەر ئەنجام بدەین دەبێ سەرەتا دراوە دیاریبکەین یان هەڵیبژێرین ئینجا هەناردەی بکەین.بۆ ئەم کردارانە بە فەرمانی SELECT لە MYSQL ئاشنا دەبین.هەرچەندە کە کرداری دیکە وەک دەستکاری، بەڕۆژکردن و سڕینەوەش جیبەجیدەکرێت بەڵام بۆ داهاتوو.

### فەرمانی SELECT لە MYSQL

فەرمانی SQL SELECT بۆ کۆ کردنەوەیدراوەکان لە MYSQL بە کەڵکە.ئێوە دەتوانن ئەم فەرمانە لە mysql> prompt یان سکریپتێکی PHP دابین بکەن.
داڕستانی گشتی SELECT لە SQL بۆ هەڵکێشانی دراوە لە خشتەکان بەم جۆرەیە:

```sql
SELECT field1, field2,...fieldN 
FROM table_name1, table_name2...
[WHERE Clause]
[OFFSET M ][LIMIT N]
```



- لەداڕستانی سەرەوە ئێسە دەتوانن خشتەیەک یان چەندین خشتە بە بۆر[^1]، لە یەک جودا بکەنەوە تاکوو مەرجی تایبەت لەسەریان بسەپێنن.
- لە فەرمانێکی SELECT ئێوە دەتوانن یەک یان چەندین خانە بۆ هێنانەوەی دراوە دیاریکەن.
- ئێوە دەتوانن بە جیاتی ناوی خانەکان لە هێمای هەستێرە(*) سوود بگرن، هەر بەم بۆنەوە تەواو خانەکان خشتە هەڵدەبژێرن یان دیارییدەکەن.
- بە یارمەتی فەرمانی WHERE دەتوانن مەرجی فرە لە سەر ئەم هەڵکێشانەی دراوە لە خشتەکان بسەپێنن.
- بە یارمەتی OFFSET دەتوانن لە شوێن یان خاڵێک کە هەرەکتانە ریکۆردەکانی دابینکراوە بگەڕێنەوە، دابینی بکەن.پێشگریمانە سفرە.
- بە یارمەتی LIMIT دەتوانن ژمارەی دەرئەمجامەکان لە گەڕانەوە سنووردار بکەن.

### هێنانەوەی دراوەکان بە یارمەتی هێڵی فەرمان

لێدەرهێنانی دراوەکان لە MYSQL بە یارمەتی داڕستانی فەرمانی SELECT جێبەجێ دەکرێت.
**نمونەی ١ :**
نمونەی خوارەوە ریکۆردەکانی خشتەی **tutorials_tbl** دەگەڕێنێتەوە :

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use TUTORIALS;
Database changed
mysql> SELECT * from tutorials_tbl 
+-------------+----------------+-----------------+-----------------+
| tutorial_id | tutorial_title | tutorial_author | submission_date |
+-------------+----------------+-----------------+-----------------+
|           1 | Learn PHP      | John Poul       | 2007-05-21      |
|           2 | Learn MySQL    | Abdul S         | 2007-05-21      |
|           3 | JAVA Tutorial  | Sanjay          | 2007-05-21      |
+-------------+----------------+-----------------+-----------------+
3 rows in set (0.01 sec)
 
mysql
```



### هێنانەوەی دراوەکان بە PHP

ئێوە دەتوانن بە فەرمانی SQL SELECT لە نێو نەخشەی **() mysql_query** لە زمانی PHP سوود بگرن؛ نەخشەی سەرەوە بۆ فەرمانی SQL بەکاردەبرێت، ئینجا بە فەرمانی () mysql_fetch_array دەتوانن دراوەی لێیدەرهێنن. ئەم نەخشەیە ریکۆرد یان دراوە بە شێوازی ڕیزەک[^2]بەیەکەوەدەبستێت[^3].
زمانی PHP نەخشەکانی دیکی وەک **() mysql_fetch_assoc** ، بۆگەڕانەوەی ڕیزەک بەیەکەوە دەبەستێت.

**نمونەی ٢**
لەم نمونە گشتی ریکۆردەکانی خشتەی tutorial_tb بە سوودوەەرگرتن لە نەخشەی ()mysql_fetch_assoc دەگەڕێنێتەوە :

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
   $sql = 'SELECT tutorial_id, tutorial_title, tutorial_author, submission_date FROM tutorials_tbl';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
    
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
    
   while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
      echo "Tutorial ID :{$row['tutorial_id']}  <br> ".
         "Title: {$row['tutorial_title']} <br> ".
         "Author: {$row['tutorial_author']} <br> ".
         "Submission Date : {$row['submission_date']} <br> ".
         "--------------------------------<br>";
   } 
   echo "Fetched data successfully\n";
   mysql_close($conn);
?>
```

ئێوە دەتوانن بە نەگۆڕاوی MYSQL_NUM بە عینوانی پارامەتری دووهەم لە نەخشەی () mysql_fetch_array ــیش سوود بگرن.ئەم نەخشەیە دەبێت هۆکارێک بۆ گەڕانەوەی ریزەکێک بە index ــە ژمارەییەکان.
**نمونەی ٣**
ئێستا لەم نمونە بەیارمەتی نەگۆڕاوەکانی **MYSQL_NUM** بە عینوانی بەڵگەی[^4]دووهەمی نەخشەی **() mysql_fetch_array** تەواو دەکەین.

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
 
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
    
   $sql = 'SELECT tutorial_id, tutorial_title, tutorial_author, submission_date
      FROM tutorials_tbl';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
    
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
    
   while($row = mysql_fetch_array($retval, MYSQL_NUM)) {
      echo "Tutorial ID :{$row[0]}  <br> ".
         "Title: {$row[1]} <br> ".
         "Author: {$row[2]} <br> ".
         "Submission Date : {$row[3]} <br> ".
         "--------------------------------<br>";
   }
   echo "Fetched data successfully\n";
   mysql_close($conn);
?>
```



لە سێ نمونەکەی سەرەوە ئێمە یەک دەرئەنجاممان بوو.

### ئازادکردنی بیرگە

ئەمە ڕاهێنانێکی باشە بۆ ئازادکردنی بۆشایی بیرگە پاش هەر بار دیاریکردنی بنکەدراوە. ئێوە دەتوانن بە نەخشەی PHP بەناوی **mysql_free_result()** بۆشایی قەرەباڵغی بیرگە بەڕەڵا بکەن.
**نمونەی ٤**

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
 
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
    
   $sql = 'SELECT tutorial_id, tutorial_title, tutorial_author, submission_date
      FROM tutorials_tbl';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
    
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
    
   while($row = mysql_fetch_array($retval, MYSQL_NUM)) {
      echo "Tutorial ID :{$row[0]}  <br> ".
         "Title: {$row[1]} <br> ".
         "Author: {$row[2]} <br> ".
         "Submission Date : {$row[3]} <br> ".
         "--------------------------------<br>";
   }
   mysql_free_result($retval);
   echo "Fetched data successfully\n";
   mysql_close($conn);
?>
```

بۆ دەرهێنانی دراوە ئێوە دەتوانن کۆدێکی ئاڵۆز بنووسن، بەڵام سەر و بنی وەک کۆدەکانی سەرەوەیە.

------

[^1]:comma
[^2]:array
[^3]:associative
[^4]:argument:به‌ڵگه‌، مشتومڕ، ده‌مه‌قاڵێ

