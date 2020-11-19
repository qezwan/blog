---
layout: post
title: دروستکردنی بنکەدراوە لە MySQL
tags: [mysql]
date : "2018-08-11 05:35:45"
---

### پێشەکی

لە وانەکانی دیکەلەگەڵ داڕستانی ئەسڵی و چۆنیەتی پەیوەندی بە بنکەدراوەی MYSQL ئاشنا بووین، بەڵام ئەم پەیوەندییە کاتیک سوودی دەبێت کە، بنکەدراوەیێک پێشتر بوونی هەبێت. هەر بۆ ئەم مەبەستە پێویستمان بە دروستکردنی بنکەدراوەیێکی نوێیە.دروستکردنی بنکەدراوە لە MYSQL زۆر کارێکی سادەیە تەنها نەخشەیێکی تایبەت و کۆدەکانی SQL توانایی ئەنجامان دەبێت

### دروستکردنی بنکەدراوە بەmysqladmin

بۆ دروستکردنی بنکە دراوە ئێوە پێویستان بە دەستپێگەیشتنی تایبەت بۆ سڕینەوە و دروستکردنی بنکەدراوەی MySQL هەیە. بەو مەرجە کە ئێوە توانایی دەستپێگەیشتنتان بە بەکارهێنەری root هەیە دەتوانن بە یارمەتی mysqladmin بنکەدراوەی خۆتان دروست بکەن.

**نمونە** نمونەیێکی سادە بۆ دروستکردنی بنکەدراوەی KURDISH ـە.

```sql
[root@host]# mysqladmin -u root -p create KURDISH 
Enter password:******
```



### دروستکردنی بنکەدراوە بە یارمەتی PHP

زمانی PHP لە نەخشەیێک بە ناوی mysql_query بۆ دروستکردن و خڕینەوەی بنکەدراوەیێکی MYSQL سوود دەگرێت.ئەم نەخشە دوو پارامەتر دەگرێت کە لە کاتی سەرکەوتن TRUE و لە کاتی هەڵە FALSE دەگەڕێنێتەوە

**داڕستان**

```sql
bool mysql_query( sql, connection );
```



|  ریز |   پارامەتر |                                                        شڕۆڤە |
| ---: | ---------: | -----------------------------------------------------------: |
|    ١ |        sql |           گوزارشێەکی sql بۆ دروستکردن و سڕینەوەی بنکەدراوەیە |
|    ٢ | connection | گەر پەیوەندی دیاری نەکرێت، دوایین پەیوەندی کراوە بە یارمەتی نەخشەی mysql_connect دادەخرێت. |

**نمونە** نمونەیێک سادە لە دروستکردنی بنکەدراوەیە :

```php
<html>
   <head>
      <title>Creating MySQL Database</title>
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
         $sql = 'CREATE DATABASE KURDISH';
         $retval = mysql_query( $sql, $conn );
          
         if(! $retval ) {
            die('Could not create database: ' . mysql_error());
         }
         echo "Database KURDISH created successfully\n";
         mysql_close($conn);
      ?>
   </body>
</html>
```