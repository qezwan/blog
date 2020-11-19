---
layout: post
title: ئیش بە فەرمانی مەرجی LIKE لە MySQL
tags: [mysql]
date : "2018-06-28 05:35:45"
---

### پێشەکی

لە وانەکانی پێشوو لە گەڵ فەرمانی WHERE بۆ دیاریکردنی بەشێک تان گشت خانە(ـکان) و خشتە(_کان) لە بنکە دراوەی MySQL ئاشنا بووین.بەڵآم جاری واهەیە کە دەبێ بژاردەیێکی وردترمان بێت لە سەر دراوەکان، بۆ نمونە گەرەکمانە تۆمارکراوەیەک کە پیتی یەکەمیان یان چەندین پیتیان هاوشێوەن پەیدایان بکەین یان بیان پاڵێوین؛ بەئەمەش لە فەرمانی مەرجی **LIKE** لە MySQL سوود دەگرین.

### فەرمانی LIKE بنکەدراوەی MYSQL

- فەرمانی WHERE کرداری کردەگەرەکان[^1]وەک = کارا دەکا؛ئینجا تەواو بڕەکانی خانەیەک هاوئاهەنگ دەکا.
- فەرمانی LIKE لە MySQL بۆ پاڵافتنی گەڕان زۆر بەسوودە.
- فەرمانی LIKE لە MySQL لەگەڵ نیشانەی ٪ ئیشی پاڵافتنی[^2]گەڕان ئەنجام دەدا.

فەرمانی گشتی DELETE لە MySQL بۆ دەرهێنانی دراوەکان لە خشتەیەک بە گشتی بەم جۆرەیە:

```mysql
SELECT field1, field2,...fieldN table_name1, table_name2...
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```



- ئێوە دەتوانن هەر مەرجێک بە فەرمانی WHERE بنووسن.
- ئێوەدەتوانن فەرمانی LIKE لەگەڵ فەرمانی WHERE بەیەکەوە بێنن.
- ئێوە دەتوانن بە جیاتی **equals to** فەرمانی LIKE بهێنن.
- کاتێک لە فەرمانی LIKE لەگەڵ نیشانی ٪ سوود دەگرن، ئەمە وەک گەڕانی نووسەی مێتا[^3] جێبەجی دەبێ.
- بە یارمەتی کرده‌گه‌رکانی[^4]**AND** و **OR** دەتوانن زۆرتر لە یەک مەرج بە فەرمانی WHERE بسەپێنن.
- لە فەرمانی مەرجی WHERE…LIKE دەتوانن لە فەرمانەکانی DELETE و UPDATE بۆ دابین کردنی مەرج بەکاری بێنن.

### سوود وەرگرتن لە فەرمانی LIKE هێڵی فەرمان

لەم نمونە کۆدە فەرمانی مەرجی LIKE لە بنکەدراوەی MYSQL لەگەڵ فەرمانی مەرجی WHERE پیشان دەدەین.
**نمونە ١ :**
لە نمونەی تۆمارکراوەی خوارەوە لە خشتەی **tutorials_tbl** کە خانەیtutorial_authorــەکانی، بە jay کۆتایی پێهاتووە دیاریبکەین:

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use TUTORIALS;
Database changed
mysql> SELECT * from tutorials_tbl 
   -> WHERE tutorial_author LIKE '%jay';
+-------------+----------------+-----------------+-----------------+
| tutorial_id | tutorial_title | tutorial_author | submission_date |
+-------------+----------------+-----------------+-----------------+
|      3      |  JAVA Tutorial |     Sanjay      |    2007-05-21   |   
+-------------+----------------+-----------------+-----------------+
1 rows in set (0.01 sec)
 
mysql>
```



### بەکارهاوردنی فەرمانی LIKE لە PHP

ئێوەدەتوانن لە فەرمانی WHERE…LIKE لە نەخشەی **()mysql_query** لە زمانی PHP سوود وەربگرن. نەخشەی سەرەو بۆ جێبەجیکردنی فەرمانی SQL بەکاردەهێنرێت و لە نەخشەی **()mysql_fetch_array** بۆ دەرهێنانی تەواوی دراوەکانبەسوودە.
ئەگەر چوارچێوەی WHERE … LIKE لەگەڵ فەرمانەکانی DELETE یان UPDATE بە کاربهێنین هیچ نەخشەیەکی بانگکراوەی PHP ترمان پێویست نییە.
**نمونەی ٢ :** لە نمونەی خوارەوە تەواو تۆمارکراوەکان لە خشتەی **tutorials_tbl** کە خانەیtutorial_author ـەکانی بریتین لە **jay**، دیاریدەکەین :

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
      FROM tutorials_tbl
      WHERE tutorial_author LIKE "%jay%"';
 
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

[^1]:operators 
[^2]:filter
[^3]: meta character

