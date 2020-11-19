---
layout: post
title: سڕینەوەی خشت لە MySQL
tags: [mysql]
date : "2018-08-06 05:35:45"
---

### پێشەکی

سڕینەوەی خشتە لە بنکەدراوەیێک زۆر سادەیە بەڵام ئێوە دەبێ زۆر هۆشیار بن کە ئەم کردارە بە باشی ئەنجام بدەن.چوونکە ئەم کردارە واتە سڕینەو ئیتر ناگەڕێتەوە.

### ئاشنایی لەگڵ سڕینەوەی خشتەکان لە MYSQL

داڕستانی ئەسڵێ بۆ سڕینەوی خشتەکان لە MYSQL بەم جۆرەیە کە لە نمونەی خوارەوە دەیبینین

```sql
DROP TABLE table_name ;
```



### سڕینەوە بە هێڵی فەرمان

سڕینەوەی خشتەکان بە یارمەتی هێڵی فەرمان لە بنکەدراوە بە جێبەجیکردنی فەرمانی DROP TABLE پێش <mysql، ئەنجام دەبێ.
نمونە:
لە فەرمانەکەی خوارەو ئێمە خشتەی **kurdish_tbl** دەسڕینەوە؛

```sql
root@host# mysql -u root -p
Enter password:*******
mysql> use KURDISH;
Database changed
mysql> DROP TABLE kurdish_tbl
Query OK, 0 rows affected (0.8 sec)
mysql>
```



### سڕینەوەی خشتەیەک بە یارمەتی PHP

بۆ سڕینەوەی خشتەیەک کە بوونی هەیە لە بنکەدراوەیێک، ئێوە دەتوانن سوود لە خشتەی PHP بگرن واتە **()mysql_query**، ئێوە دەبێت بەڵگەی[^1]دووهەم بە گونجاوی بۆ سڕینەوەی خشتە بنێرن.

```php
<html>
   <head>
      <title>Creating MySQL Tables</title>
   </head>
    
   <body>
      <?php
         $dbhost = 'localhost:3036';
         $dbuser = 'root';
         $dbpass = 'rootpassword';
         $conn = mysql_connect($dbhost, $dbuser, $dbpass);
          
         if(! $conn ) {
            die('Could not connect: ' . mysql_error());
         }
         echo 'Connected successfully<br />';
         $sql = "DROP TABLE kurdish_tbl";
         mysql_select_db( 'KURDISH' );
         $retval = mysql_query( $sql, $conn );
          
         if(! $retval ) {
            die('Could not delete table: ' . mysql_error());
         }
         echo "Table deleted successfully\n";
         mysql_close($conn);
      ?>
   </body>
</html>
```

------

[^2]: Argument 

