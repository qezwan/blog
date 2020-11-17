---
layout: post
title: فێرکاری بە نەرمەکالای گرافیکی ئادۆبی XD
category: [مەنجەڵ]
date : "2020-10-14 01:35:45"
image: "/learn/gimp/img/g02.jpg"
description : " پرۆژەرەی ڕەنگ کردنی چاو "
videosrc : "https://tree.kurd.click/wp-content/uploads/2020/11/bac.mp4"

layout: "gimp"

---

مەنجەڵ فێرگەیەکی چەور و چلیک لە نەرمەکالاکانی گرافیک، ئۆفیس و …هتد؛ کە هەم لە سەر ویندۆز، ماک و دابەشکراوەکانی لینوکس(بەشێکیان) بە ئاسانی دادەمەزرێن و ئیشدەکەن. مەبەست فێربوونێکە بۆ بازاری کار و و ئیشێکی پوخت و جوانە بەم نەرمەکالا بەهێزانە.

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