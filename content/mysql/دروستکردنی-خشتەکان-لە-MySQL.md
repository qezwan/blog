---
layout: post
title: دروستکردنی خشتەکان لە MySQL
tags: [mysql]
date : "2018-08-07 05:35:45"
---

### پێشەکی

لە بەشەکانی پێش، زانیمان داڕستانەکان[^1]و قۆناغەکانی دروستکردنی بنکەدراوە لە MYSQL چۆنە.هەروەها زانیمان کە دراوەکان[^2]لە چوارچێوەی خانەکان [^3]لە بنکەدراوە پاشکەوت دەکرێن. لەم قۆناغە دەبێ فێر بین کە چۆن خشتەکان[^4]لە گەڵ خانەکانی پێویستی دروست بکەین.خشتەکان وەک ماتریسێکی دوو ڕەهەندین کە لە بنکە دراوە، دراو یان زانیاری پاشکەوت کراوەی خۆیان وەک، چوارچێوەی پەڕە پانەکان[^5]نیشان دەدەن.

### دروستکردنی خشتەکان

پێش هەر شتێک ئێوە دەبێ بزانن کە بۆ دروستکردنی خشتە دەبێ وردەزانیاریەکانی خوارەوە دابین بکەن:

- ناوی هەر خشتە
- ناوی خانەکان
- پێناسە بۆ هەر کام لە خانەکان

**داڕستان :** ئەمە داڕستانی گشتی بۆ دروستکردنی خشتەکان لە بنکەدراوەی MYSQLــە :

```sql
CREATE TABLE table_name (column_name column_type);
```

ئێستا بۆ نمونە خشتەییک بەناوی **KURDISH** دروست دەکەین:

```sql
create table kurdish_tbl(
   kurdish_id INT NOT NULL AUTO_INCREMENT,
   kurdish_title VARCHAR(100) NOT NULL,
   kurdish_author VARCHAR(40) NOT NULL,
   submission_date DATE,
   PRIMARY KEY ( kurdish_id )
);
```

شڕۆڤە :



- تایبەتمەندی **NOT NULL** بۆ خانەکانی خشتە پێناسەدەکرێن،بۆ ئەوە کە گەرەکمان ناوێ خانەکان چۆڵ یا سفر[^6]نەبن. کەواتە کاتێک بەکارهێنەر هەوڵی پاشکەوتکردنی خانەیێکی چۆڵ بدا،MYSQL هەڵەی پێدەدا.
- خانەیێک بە تایبەتمەندی **AUTO_INCREMENT** نیشانبکرێت، لەڕاستی ئەو خانە دەکا بە ژمێرەری دێڕ بۆ خشتە.
- کلیلە وشەی **PRIMARY KEY** بۆ دانەیێک لە خانەکان دابین کراوە کە ئەو خانە دەکا بە کلیلی ئەسڵی خشتە.

### دروستکردنی خشتەیەک بە هێڵی فەرمان

دروستکردنی خشتە لە هێڵی فەرمان [^7]بە سادەیی بە نووسینی فەرمانی <mysql جێبەجی دەکرێت.\\بۆ ئەم مەبەستە دەبێ لە فەرمانی CREATE TABLE سوود بگرین.
لە نمونەی خوارەوە دروستکردنی خشتەیێک بە ناوی kurdish_tbl :

```sql
root@host# mysql -u root -p
Enter password:*******
mysql> use KURDISH;
Database changed
mysql> CREATE TABLE kurdish_tbl(
   -> kurdish_id INT NOT NULL AUTO_INCREMENT,
   -> kurdish_title VARCHAR(100) NOT NULL,
   -> kurdish_author VARCHAR(40) NOT NULL,
   -> submission_date DATE,
   -> PRIMARY KEY ( kurdish_id )
   -> );
Query OK, 0 rows affected (0.16 sec)
mysql>
```



### دروستکردنی خشتە بە PHP

بۆ دروستکردنی خشتەیەکی نوێ لە هەرکام لە بنکەدراوەکان بە یارمەتی کۆدەکانی PHP دەبێ لە نەخشەی **()mysql_query** سوود بگرین.\\ئێوە دەبێ پارامەتی دووهەم بە فەرمانی SQLی گونجاو بۆ دروستکردنی خشتە بنێرن.
نمونە:

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
         $sql = "CREATE TABLE kurdish_tbl( ".
            "kurdish_id INT NOT NULL AUTO_INCREMENT, ".
            "kurdish_title VARCHAR(100) NOT NULL, ".
            "kurdish_author VARCHAR(40) NOT NULL, ".
            "submission_date DATE, ".
            "PRIMARY KEY ( kurdish_id )); ";
         mysql_select_db( 'KURDISH' );
         $retval = mysql_query( $sql, $conn );
          
         if(! $retval ) {
            die('Could not create table: ' . mysql_error());
         }
         echo "Table created successfully\n";
         mysql_close($conn);
      ?>
   </body>
</html>
1) syntax
```

------

[^1]:syntax
[^2]: Data
[^3]: fields
[^4]: Tables
[^5]: EXCEL:ئێکسێڵ نەرمەئامێرێکی ژمێریاریی لە کۆی مایکرۆسۆفت ئۆفیسە وەک CALC لە گنو/لینوکس
[^6]: NULL
[^7]: Command Prompt









