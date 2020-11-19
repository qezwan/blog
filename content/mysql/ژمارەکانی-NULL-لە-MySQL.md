---
layout: post
title: ژمارەکانی NULL لە MySQL
tags: [mysql]
date : "2018-06-25 05:35:45"
---

### پێشەکی

کاتێک ئێوە لە فەرمانە مەرجییەکان وەک WHERE سوود دەگرن و هەرەکتانە کە دراوەکانی پێ دەرهێنن ، گەر بڕی تۆمارکراوەیێک NULL [^1 ]بێت، ئیمکانی هەیە کە دەرئەنجامی گەڕانەوە لە بنکەدراوە ڕاست دەرنەچێت.بۆ پێشگیری لەم جۆرە کێشانە دەبێ ئیشکردن و بەڕێوەبردنی بڕیکانی NULL لە MYSQL فێر بن.

### بڕەکانی NULL لە MySQL

لەم بابەتە ئێوە لەگەڵ فەرمانەکانی چاودێری NULL لە MYSQL ئاشنا دەکەین.بۆ ئەم مەبەستە سێ کردەگەر لە MYSQL بوونی هەیە:

- IS NULL :ئەم کردەگەرە کاتێک کە خانە بڕی NULLــی هەبێت، TRUE دەگەڕێنێتەوە.
- IS NOT NULL : ئەم کردەگەرە لە کاتیک کە خانە بڕی NULLــی نەبێت، TRUE دەگەڕێنێتەوە.
- ⇔ :بڕی دوو خانە بەیەکەوە هەڵدەگرسێنێت گەر دوو بڕەکە NULL بن، TRUE دەگەڕێنێتەوە.

ئاگادار بن کە بۆ تاقیکردنەوەی NULL بوونی یەک خانە ناتوانرێت شێوازەکانی وەک : **= NULL** یا **!= NULL** بەکاربهێنین؛ گەر بەکاری بهێنن هەڵەتان پیشان دەدا.

### بەکارهێنانی بڕەکانی NULL لە هێڵێ فەرمان

گریمانە کە خشتەیەکمان هەیە بە ناوی **tcount_tbl** کە لە بنکە دراوەی TUTORIALS جێگیرکراوە. هەروەها ئەم خشتە بریتییە لە دوو خانە بە ناوەکانی **tutorial_author** و **tutorial_count** .
**نمونەی ١ :**
ئەم نمونە ڕچاو بگرن :

```sql
root@host# mysql -u root -p password;
Enter password:*******
 
mysql> use TUTORIALS;
Database changed
 
mysql> create table tcount_tbl
   -> (
   -> tutorial_author varchar(40) NOT NULL,
   -> tutorial_count  INT
   -> );
Query OK, 0 rows affected (0.05 sec)
 
mysql> INSERT INTO tcount_tbl
   -> (tutorial_author, tutorial_count) values ('mahran', 20);
 
mysql> INSERT INTO tcount_tbl
   -> (tutorial_author, tutorial_count) values ('mahnaz', NULL);
 
mysql> INSERT INTO tcount_tbl
   -> (tutorial_author, tutorial_count) values ('Jen', NULL);
 
mysql> INSERT INTO tcount_tbl
   -> (tutorial_author, tutorial_count) values ('Gill', 20);
 
mysql> SELECT * from tcount_tbl;
+-----------------+----------------+
| tutorial_author | tutorial_count |
+-----------------+----------------+
|     mahran      |       20       |
|     mahnaz      |      NULL      |
|      Jen        |      NULL      |
|     Gill        |       20       |
+-----------------+----------------+
4 rows in set (0.00 sec)
 
mysql>
```

دەتوانن چاوی لێبکەن کە کردەگەرەکان **=** و **!=** بۆ تاقیکردنەوەی بڕەکانی NULL کارامە نییە :

```sql
mysql> SELECT * FROM tcount_tbl WHERE tutorial_count = NULL;
Empty set (0.00 sec)
 
mysql> SELECT * FROM tcount_tbl WHERE tutorial_count != NULL;
Empty set (0.01 sec)
```

بۆ پەیداکردنی تۆمارکراوەکانی خانەی tutorial_count کە بڕی NULL ـیان هەبێ یان نە، دەتوانن بەم شێوازە کۆد بنووسن:

```sql
mysql> SELECT * FROM tcount_tbl 
   -> WHERE tutorial_count IS NULL;
+-----------------+----------------+
| tutorial_author | tutorial_count |
+-----------------+----------------+
|     mahnaz      |      NULL      |
|      Jen        |      NULL      |
+-----------------+----------------+
2 rows in set (0.00 sec)
mysql> SELECT * from tcount_tbl 
   -> WHERE tutorial_count IS NOT NULL;
+-----------------+----------------+
| tutorial_author | tutorial_count |
+-----------------+----------------+
|     mahran      |       20       |
|     Gill        |       20       |
+-----------------+----------------+
2 rows in set (0.00 sec)
```



### بەڕێوەبردنی بڕەکانی NULL لە زمانی PHP

بۆ بەڕێوەبردنی بڕەکانی NULL لە زمانی PHP دەتوانن چوارچێوەی مەرجی if…else بەکاربێنن.
**نمونەی ٢ :** نمونەی خوارەوە tutorial_count لە دەرەوە دەگرن ئینجا لەگەڵ بڕ و نرخی[^2]نێو خشتەکە هەڵدەسەنگێنن.

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
 
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
 
   if( isset($tutorial_count )) {
      $sql = 'SELECT tutorial_author, tutorial_count
         FROM  tcount_tbl
         WHERE tutorial_count = $tutorial_count';
   } else {
      $sql = 'SELECT tutorial_author, tutorial_count
         FROM  tcount_tbl
         WHERE tutorial_count IS $tutorial_count';
   }
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
    
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
 
   while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
      echo "Author:{$row['tutorial_author']}  <br> ".
         "Count: {$row['tutorial_count']} <br> ".
         "--------------------------------<br>";
   } 
   echo "Fetched data successfully\n";
   mysql_close($conn);
?>
```

------

[^1]:بەتاڵ،پووچ
[^2]:value

