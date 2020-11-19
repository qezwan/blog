---
layout: post
title: ئیش بە فەرمانی INSERT لە MySQL
tags: [mysql]
date : "2018-08-03 05:35:45"
---

### پێشەکی

بۆ تێخستن یان خزاندنی[^1]دراوە لە خشتەیەکی MySQL ، دەتوانن سوود لە فەرمانی **INSERT INTO** لە SQL بگرن. ئێوە دەتوانن زانیاری بخەنە نێو خشتەی MYSQL بە نووسینی فەرمانەکەی سەرەوە پاش <mysql.

### فرمانی تێخستن لە MYSQL

داڕستانی گشتی SQL بۆ فەرمانی INSERT INTO لە MYSQL بۆ مەبەستی تێخستنی دراوە لە خشتەیەکی MYSQL بەم جۆرەیە :

```
INSERT INTO table_name ( field1, field2,...fieldN )
   VALUES
   ( value1, value2,...valueN );
```

بۆ تێخستنی دراوەکان بە ڕیزبەندیەکان دەبێ نرخەکان[^2]، لە تەقەڵ یان جووت تەقەڵ[^3] (وەک "value")جێگیر بکەین.



### تێخستنی دراوە بە هێڵی فەرمان

بۆ تێخستنی دراوە بە یارمەتی هێڵی فەرمان دەبێ فەرمانی INSERT INTO لە MySQL بنووسین.
نمونە خوارەوە سێ تۆمارمان[^4]لە خشتی kurdish_tbl دروستدەکەین:

```sql
root@host# mysql -u root -p password;
Enter password:*******
mysql> use KURDISH;
Database changed
 
mysql> INSERT INTO kurdish_tbl 
   ->(kurdish_title, kurdish_author, submission_date)
   ->VALUES
   ->("Learn PHP", "qezwan", NOW());
Query OK, 1 row affected (0.01 sec)
 
mysql> INSERT INTO kurdish_tbl 
   ->(kurdish_title, kurdish_author, submission_date)
   ->VALUES
   ->("Learn MySQL", "Abdul S", NOW());
Query OK, 1 row affected (0.01 sec)
 
mysql> INSERT INTO kurdish_tbl 
   ->(kurdish_title, kurdish_author, submission_date)
   ->VALUES
   ->("JAVA Tutorial", "Sanjay", '2007-05-06');
Query OK, 1 row affected (0.01 sec)
mysql>
```

**خاڵ :**
سەرنج بدەن کە هێمای (< -) بەشیک لە فەرمانی SQL نییە. ئەم هیمایە لە کاتی لێدانی کلیلی Enter و لە هێڵی دیکە بە شێوازی خۆکار دروستدەبێت.



لە کۆدەکەی سەرەوە بۆ خانەی kurdish_id برێکمان دابین نەکردووە، بۆ ئەوە کە ئەم خانەیە تایبەتی AUTO_INCREMENT هەیە، کە بۆ هەر دێرێکی نوێ ژمارەیێک زیاد دەکا وە لەم خانە پاسکەوت دەکا.لە ڕاستی ئەم خانە ژمێریارێکی دێڕە.

### تێخستنی دراوە بە PHP

لە زمانی PHP چوارچێوەی فەرمانی INSERT لە MySQL بۆ تێخستنی دراوە سوود دەگرین.
بۆ ئەم مەبەستە ئێوە دەتوانن لە هەر ئەو فەرمانەی INSERT INTO دە MYSQL لە نێو نەخشەی **()mysql_query** لە PHP بۆ تێخستنی دراوە سوود دەبینین.
**نمونە :**
لەم نمونە سێ پارامه‌تر[^5]لە بەکارهێنەر دەگرین وە دەیخەینە خشتەی MYSQL بۆ پاشکەوتکردن.

```php
<html>
 
   <head>
      <title>Add New Record in MySQL Database</title>
   </head>
 
   <body>
      <?php
         if(isset($_POST['add'])) {
            $dbhost = 'localhost:3036';
            $dbuser = 'root';
            $dbpass = 'rootpassword';
            $conn = mysql_connect($dbhost, $dbuser, $dbpass);
          
            if(! $conn ) {
               die('Could not connect: ' . mysql_error());
            }
 
            if(! get_magic_quotes_gpc() ) {
               $kurdish_title = addslashes ($_POST['kurdish_title']);
               $kurdish_author = addslashes ($_POST['kurdish_author']);
            } else {
               $tutorial_title = $_POST['kurdish_title'];
               $tutorial_author = $_POST['kurdish_author'];
            }
 
            $submission_date = $_POST['submission_date'];
    
            $sql = "INSERT INTO kurdish_tbl ".
               "(kurdish_title,kurdish_author, submission_date) "."VALUES ".
               "('$kurdish_title','$kurdish_author','$submission_date')";
               mysql_select_db('KURDISH');
            $retval = mysql_query( $sql, $conn );
          
            if(! $retval ) {
               die('Could not enter data: ' . mysql_error());
            }
          
            echo "Entered data successfully\n";
            mysql_close($conn);
         } else {
      ?>
    
      <form method = "post" action = "<?php $_PHP_SELF ?>">
         <table width = "600" border = "0" cellspacing = "1" cellpadding = "2">
            <tr>
               <td width = "250">Kurdish Title</td>
               <td>
                  <input name = "kurdish_title" type = "text" id = "kurdish_title">
               </td>
            </tr>
          
            <tr>
               <td width = "250">Kurdish Author</td>
               <td>
                  <input name = "kurdish_author" type = "text" id = "kurdish_author">
               </td>
            </tr>
          
            <tr>
               <td width = "250">Submission Date [   yyyy-mm-dd ]</td>
               <td>
                  <input name = "submission_date" type = "text" id = "submission_date">
               </td>
            </tr>
       
            <tr>
               <td width = "250"> </td>
               <td> </td>
            </tr>
          
            <tr>
               <td width = "250"> </td>
               <td>
                  <input name = "add" type = "submit" id = "add"  value = "Add Kurdish">
               </td>
            </tr>
         </table>
      </form>
   <?php
      }
   ?>
   </body>
</html>
```

کاتێک خەریکین دراوەکان تێدەخەن باشتر وایە لە نەخشەی **() get_magic_quotes_gpc** ریکخستنەکان ئێستا magic quote چاودێر بکەن.
گەر نەخشەی سەرەوە بڕی FALSE بگەڕێنێتەوە، ئینجا لە نەخشەی **() addslashes** بۆ زیادکردنی هێڵە لار(/) پێش کۆتەیشێنەکان کەڵک دەگرین.

------

[^1]: INSERT
[^2]:values 
[^3]:double or single quotes
[^4]:records
[^5]:parameter 







