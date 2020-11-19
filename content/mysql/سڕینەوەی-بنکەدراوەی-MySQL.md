---
layout: post
title: سڕینەوەی بنکەدراوەی MySQL
tags: [mysql]
date : "2018-08-10 05:35:45"
---

### پێشەکی

لە بەرانبەر دروستکردنی بنکەدراوە کە لە [وانەی پێشوو](http://localhost:1313/mysql/%D8%AF%D8%B1%D9%88%D8%B3%D8%AA%DA%A9%D8%B1%D8%AF%D9%86%DB%8C-%D8%A8%D9%86%DA%A9%DB%95%D8%AF%D8%B1%D8%A7%D9%88%DB%95-%D9%84%DB%95-mysql/) فێری بووین ، سڕینەوەی بنکەدراوەشمان دەبێ. زۆر جار بە هۆی جیاواز وەک بێ سوود بوون، دەتوانین بنکەدراوەکە بسڕینەوە؛ هەر لەم گۆشە دەبێ فێر بین چۆن ئەم کردارە ئەنجام بدەین.

### سڕینەوەی بنکەدراوە

لێرە ئێمە دە دوو شێواز دەتوانین بکەدراوە لە MYSQL بسڕینەوە.تەنها ئێوە دەبێ ئاستی ئەم کارەتان ببێت واتە لە ئاستێک بن بۆ سڕینەوە و یان دروستکردنی بنکەدراوە. گریمانە ئێوە دەستپێگەیشتنتان بە بەکارهێنەری ROOT هەیە و دەتوانن بە نەخشەی mysqladmin بنکەدراوە بسڕنەوە.
پێش سڕینەوەی هەر بنکەدراوەێک دەبێ لەیادتان بێت هە تەواو زانیاری واتە دراوەکان لەدەست دەچن. لە ئەم نمونە چۆنیەتی سڕینەوەی بنکەدراوە کە لە وانەی ٥ دروستمان کرد، نیشان دەدرێت.

```
[root@host]# mysqladmin -u root -p drop KURDISH
Enter password:******
```

بە فەرمانەکەی سەرەوە سەرەتا ئاگادارییکتان پێ دەدرێت کە ئایا دڵنیای لە سڕینەوەی بنکەدراوەکەت :

```
Dropping the database is potentially a very bad thing to do.
Any data stored in the database will be destroyed.
 
Do you really want to drop the 'KURDISH' database [y/N] y
Database "KURDISH" dropped
```



### سڕینەوەی بنکەدراوە بە یارمەتی کۆدەکانیPHP

زمانی PHP لە نەخشەی mysql-query بۆ دروستکردن و سڕینەوەی بنکەدراوەی MYSQL سوود دەگرێت.
ئەم نەخشە دوو پارامەتر و TRUE & FALSE دەگەرێنێتەوە.

**داڕستان**



```
bool mysql_query( sql, connection );
```



|  ریز |   پارامەتر |                                                        شڕۆڤە |
| ---: | ---------: | -----------------------------------------------------------: |
|    ١ |        sql |           گوزارشێەکی sql بۆ دروستکردن و سڕینەوەی بنکەدراوەیە |
|    ٢ | connection | گەر پەیوەندی دیاری نەکرێت، دوایین پەیوەندی کراوە بە یارمەتی نەخشەی mysql_connect دادەخرێت. |

**نمونە** نمونەی خوارەوە جۆنیەتی سڕینەوەی بنکەدراوەیێک نیشان دەدا:

```
<html>
   <head>
      <title>Deleting MySQL Database</title>
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
         $sql = 'DROP DATABASE KURDISH';
         $retval = mysql_query( $sql, $conn );
          
         if(! $retval ) {
            die('Could not delete database: ' . mysql_error());
         }
         echo "Database KURDISH deleted successfully\n";
         mysql_close($conn);
      ?>
   </body>
</html>
```