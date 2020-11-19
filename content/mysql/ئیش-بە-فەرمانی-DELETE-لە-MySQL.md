---
layout: post
title: ئیش بە فەرمانی DELETE لە MySQL
tags: [mysql]
date : "2018-06-29 05:35:45"
---

### پێشەکی

گەر ئێوە گەرەکتان بێت تۆمارکراوەکانی خشتەیێک MYSQL ،بسڕنەوە پێویستان بە فەرمانیێک SQL هەیە بەناوی **DELETE FROM** .ئەم فەرمانە پاش mysql> دەهێنن وە یا دەتوانن لە سکریپتی PHP بەکاری بهێنن.

#### فەرمانی سڕینەوە لە MYSQL

چوارچیوەی گشتی فەرمانی سڕینەوە لە SQL لە بنکە دراوەی MYSQL بەم جۆرەیە:

```sql
DELETE FROM table_name [WHERE Clause]
```



- ئێوە دەتوانن یەک یان چەند خانە بە تەواوی بسڕنەوە.ئەمەش کاتێکە کە مەرجی WHERE لە نێو فەرمان نەنووسرابێت.
- ئێوە دەتوانن هەر مەرجێک کە لە فەرمانی WHERE ئەنجامتان داوە لە چوارچیوەی DELETEـیش ئەنجامی بدەن.
- ئێوە دەتوانن تەواوی بڕەکان لە خشتەیەک تەنها لە یەک کات بسڕنەوە.
- فەرمانی WHERE تەنها کاتێک کە ئێوە گەرەکتانە بە شێک لە تۆمارکراوەکانی خشتەیەک بسڕنەوە زۆر کارامەیە.

### سڕینەوی دراوە بە یارمەتی هێڵی فەرمان

لەم بەشە نمونە کۆدێک لە فەرمانی DELETE لەگەڵ فەرمانی WHERE نووسراوە.

**نمونەی ١ :**

لەم نمونە تۆمارکراوەیێک لە خشتەی **tutorial_tbl** لە خانەی tutorial_id کە بڕی ٣ـی تێدایە دەسڕینەوە.



```sql
root@host# mysql -u root -p password;
Enter password:*******
 
mysql> use TUTORIALS;
Database changed
 
mysql> DELETE FROM tutorials_tbl WHERE tutorial_id=3;
Query OK, 1 row affected (0.23 sec)
 
mysql>
```



### سڕینەوەی دراوە بە یارمەتی کۆدی PHP

ئێوە دەتوانن لە فەرمانەکانی DELETE لە زمانی SQL لەگەڵ فەرمانی مەرجی WHERE یان بێ ئەم فەرمانە بە خشتەی **()mysql_query** لە زمانی PHP سوود بگرن.
لە نەخشەی سەرەوە ، فەرمانەکانی SQL وەک هێڵی فەرمانی <mysql جێبەجێ دەکا.

**نمونەی ٢**

لە نمونەی خوارەوە خانەی tutorial_title لە تۆمارکراوەیێک کە tutorial_idی بڕی ٣یە بەڕۆژ دەبێت:

```php
<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
 
   $sql = 'DELETE FROM tutorials_tbl WHERE tutorial_id = 3';
 
   mysql_select_db('TUTORIALS');
   $retval = mysql_query( $sql, $conn );
 
   if(! $retval ) {
      die('Could not delete data: ' . mysql_error());
   }
   echo "Deleted data successfully\n";
   mysql_close($conn);
?>
```