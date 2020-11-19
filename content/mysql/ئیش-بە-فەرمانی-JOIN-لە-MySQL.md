---
layout: post
title: ئیش بە فەرمانی JOIN لە MySQL
tags: [mysql]
date : "2018-06-26 05:35:45"
---

### پێشەکی

لە کاتی ئاسایی و لە فەرمانێکی SQL، ئێمە تنها دەمانتوانیی لە دراوەکانی هەبوو لە خشتەیەک ئیش بکەین. بەڵام بۆ دیاریکردن و دەستکاری هاوکاتی دراوەکانی چەند خشتە لەیەک فەرمانی SQL ریگایێکی زۆر سادەیە هەیە، ئەوەس سوود وەرگرتن لە فەرمانی JOIN لە MYSQL ــە.ئەم فەرمانە ئیمکانی هەڵبژاردنی چەندین خشتە بە هێڵێکی کۆدی SQL دەدا.

### فەرمانی JOIN لە SQL

ئێوە دەتوانن لە فەرمانی JOIN لە MYSQL لە فەرمانەکانی UPDATE, SELECT و DELETE بۆ دەستکاری هاوکاتی چەندین خشتە سوود بگرن.
لەم نمونە ئیمە گریمانە کە دوو خشتە لە **tcount_tbl** و **tutorials_tbl** لە بنکە دراوەی TUTORIALS بوونیان هەیە.
**نمونە ١**
ئەم نمونە چاو لێبکەن:

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use TUTORIALS;
Database changed
mysql> SELECT * FROM tcount_tbl;
+-----------------+----------------+
| tutorial_author | tutorial_count |
+-----------------+----------------+
|      mahran     |       20       |     
|      mahnaz     |      NULL      |        
|       Jen       |      NULL      |          
|      Gill       |       20       |          
|    John Poul    |        1       |      
|     Sanjay      |        1       |        
+-----------------+----------------+
6 rows in set (0.01 sec)
mysql> SELECT * from tutorials_tbl;
+-------------+----------------+-----------------+-----------------+
| tutorial_id | tutorial_title | tutorial_author | submission_date |
+-------------+----------------+-----------------+-----------------+
|      1      |  Learn PHP     |     John Poul   |    2007-05-24   |   
|      2      |  Learn MySQL   |      Abdul S    |    2007-05-24   |   
|      3      | JAVA Tutorial  |      Sanjay     |    2007-05-06   |   
+-------------+----------------+-----------------+-----------------+
3 rows in set (0.00 sec)
mysql>
```

ئێستا ئێمە دەتوانین داوایێک (query ) لە sql بنووسین کە دوو خشتەی سەرەوە بە یەکەوە دەبستێتەوە
ئەم داوا تەواو نووسەرانی خانەی (tutorial_author) لە خشتەکانی **tutorials_tbl**هەڵدەبژێرێت وtutorial ــی پەیوەندکراوە لەگەڵیان لە خشتەکانی **tcount_tbl** دیاریدەکا:

```sql
mysql> SELECT a.tutorial_id, a.tutorial_author, b.tutorial_count
   -> FROM tutorials_tbl a, tcount_tbl b
   -> WHERE a.tutorial_author = b.tutorial_author;
+-------------+-----------------+----------------+
| tutorial_id | tutorial_author | tutorial_count |
+-------------+-----------------+----------------+
|      1      |    John Poul    |        1       |
|      3      |     Sanjay      |        1       |
+-------------+-----------------+----------------+
2 rows in set (0.01 sec)
mysql>
```



### سود وەرگرتن لە فەرمانی JOIN لە PHP

هەروا کە پێشتریش ئاماژەمان پێیان دا بۆ جێبەجیکردنی داواکان لە SQL لە زمانی PHP لە نەخشەی ()mysql_query سوود دەگرین.ئینجا دەتوانین لە نەخشەکانی دیکە وەک mysql_fetch_array دەرئەنجامەکان دەربهێنین.
**نمونەی ٢**
ئەم نمونە ڕچاو بگرن :

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
 
   $sql = 'SELECT a.tutorial_id, a.tutorial_author, b.tutorial_count
      FROM tutorials_tbl a, tcount_tbl b
      WHERE a.tutorial_author = b.tutorial_author';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
 
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
 
   while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
      echo "Author:{$row['tutorial_author']}  <br> ".
         "Count: {$row['tutorial_count']} <br> ".
         "Tutorial ID: {$row['tutorial_id']} <br> ".
         "--------------------------------<br>";
   } 
   echo "Fetched data successfully\n";
   mysql_close($conn);
?>
```



### فەرمانی LEFT JOIN لە MYSQL

فەرمانێکی MySQL LEFT JOIN لەگەڵ فەرمانی JOINـی سادە جیاوازە.ئەم فەرمانە بە نەخشەیێک کە لەلای چەپەوەیە زۆرتر سەرنج دەدا.گەر ئێمە لە فەرمانی LEFT JOIN سوود بگرین، تەواو تۆمارکراوەکانی دوو خشتەیەک کە لەگەڵ یەکەوە هاوئاهەنگن و لە کۆتایی تۆمارکراوەکانی ماوە لە خشتەی لای چەپەوە کە هاوئاهەنگ نییە بە دەرئەنجامی گەڕانەکش زۆر دەکرێت.
**نمونەی ٣ :**
ئەم نمونە فامتان لە LEFT JOIN فرەتر دەکا:

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use TUTORIALS;
Database changed
mysql> SELECT a.tutorial_id, a.tutorial_author, b.tutorial_count
   -> FROM tutorials_tbl a LEFT JOIN tcount_tbl b
   -> ON a.tutorial_author = b.tutorial_author;
+-------------+-----------------+----------------+
| tutorial_id | tutorial_author | tutorial_count |
+-------------+-----------------+----------------+
|      1      |    John Poul    |       1        |
|      2      |     Abdul S     |      NULL      |
|      3      |     Sanjay      |       1        |
+-------------+-----------------+----------------+
3 rows in set (0.02 sec)
```

دەبێ راهێنانی فرە ئەنجام بدەن. هەرچەند کە ئەم فەرمانە **JOIN** کەمێ ئاڵۆزە، بەڵام لە کاتی راهێنانی کەمێ دژوار لە MySQL / SQL زۆرتر بۆتان ڕووندەکرێتەوە.