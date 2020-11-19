---
layout: post
title: ریزکردنی ئاکامە و دەرئەنجام لە MySQL
tags: [mysql]
date : "2018-06-27 05:35:45"
---

### پێشەکی

تا ئێستا لە وانەکانی ڕابردوو فەرمانەکانی سڕینەوە، بەڕۆژکردن، هەڵبژاردن دەستکاریکردنی خشتەکانی MYSQL ـیان جیبەجێ دەکرد. دەرئەنجامی ئەم فەرمانانە بە شیوازێک دەکەونە بەرچاو کە هیچ ریزێکیان نییە.کاتێک ئێوە گەرەکتانە کە دەرئەنجامی داوایێک بە ریزبەندیێکی تایبەت وەربگرن، دەتوانن لە فەرمانی **ORDER BY** لە MySQL سوود بگرن.

### ریزبەندی دەرئەنجامەکان لە MYSQL

داڕستانی گشتی فەرمانی ORDER BY بۆ ریزبەندی دەرئەنجامەکان[^1]لە MYSQL بۆ دەرهێنانی دراوەکان بەم شێوەیەیە:

```sql
SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]
```



- ئێوە دەتوانن دەرئەنجامی گەڕانەوەی درواوەکان لە بنکەدراوە لە هەر خانەیەک رێکبکەن، گەر ئەم خانەیە پێرست کرابێت.
- ئێوە دەتوانن دەرئەنجام لە یەک یان زۆرتر لە چەند خانە پێرست بکەن.
- ئێوە دەتوانن لە وشەکانی ASC[^2]  یا DESC[^3]ریزکردنی_ئاکامە_و_دەرئەنجام_لە_mysql#fn__3)سوود بگرن کە دەرئەنجامەکەتان بە شێوازی بەرەو ژوور بوونەوە یا نزمبوونی بۆ ڕیز بکەن. بە شێوازی گریمانە ئەم ریزە بۆ سەرەوەیە.
- ئێوە دەتوانن لە چوارچێوەی مەرجی WHERE … LIKE سوود بگرن.

### کار بەفەرمانی ORDER BY بۆ رێککردنی دەرئەنجام لە mysql بە هێڵێ فەرمان

لەم بەشە نمونە کۆدێک لە فەرمانی ORDER BY لە MySQL لەگەڵ مەرجی WHERE نیشان دەدەین.

**نمونە ١ :**

نمونەی خوارەوە تەواو دەرئەنجامەکانی بە شێوازی بەرەو ژوور بوونەوە ASC نیشان دەدا:

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use TUTORIALS;
Database changed
mysql> SELECT * from tutorials_tbl ORDER BY tutorial_author ASC
+-------------+----------------+-----------------+-----------------+
| tutorial_id | tutorial_title | tutorial_author | submission_date |
+-------------+----------------+-----------------+-----------------+
|      2      |  Learn MySQL   |     Abdul S     |    2007-05-24   |   
|      1      |   Learn PHP    |    John Poul    |    2007-05-24   |   
|      3      | JAVA Tutorial  |     Sanjay      |    2007-05-06   |   
+-------------+----------------+-----------------+-----------------+
3 rows in set (0.42 sec)
 
mysql>
```

بڕواننە ئەستوونی خانەی tutorial_author کە بە شێوازی ریزی پیتی ئەلف و بێ ریکی خستووە.



### فەرمانی ORDER BY لە PHP

ئێوە دەتوانن لە فەرمانی ORDER BY لە نەخشەی **()mysql_query** لە زمانی PHP بەکاربهێنن. بۆ دەرهێنانی دراوەکان دەتوانن لە فەرمانی **()mysql_fetch_array** سوود بگرن.

**نمونەی ٢ :**

لەم جارە نمونەی ژمارە ١ بە شێوازی داکشاوی، نزمبوونی(DESC) ریکدەخەین:

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
   $sql = 'SELECT tutorial_id, tutorial_title, 
      tutorial_author, submission_date
      FROM tutorials_tbl
      ORDER BY  tutorial_author DESC';
 
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

------

[^1]:Sorting Results
[^2]:ascend
[^3]:descend

