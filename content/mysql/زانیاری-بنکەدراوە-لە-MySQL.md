---
layout: post
title: زانیاری بنکەدراوە لە MySQL
tags: [mysql]
date : "2018-06-18 05:35:45"
---

### پێشەکی

تەواوی خشتەکان کە ئێوەبۆ پاشکەوتکردنی زانیاری(دراوە) لەMYSQL بەکاری دهێنن، لە بنکەدراوەیێکی یەکتا بوونی هەیە.زۆر جار نیازتان هەیە کە زانیاری دەربارەی خشتەکانی بنکەدراوە، دەرئەنجامی داواکانی بنکەدراوە یان ڕاژەکاری MYSQL بەدەست بهێنن.
بۆ نمونە گەر هەرەکتان لە نێوان چەند خشتە لە بنکەدراوەی پەیوەندی دروست بکەن پێویستە تەواو خشتەکان بۆ دروستکردنی باشترین پەیوەندی چاو لێبکەن.

### زانیاری بنکەدراوە لە MYSQL

ئێوە دەتوانن سێ جۆر زانیاری لە نێو بنکەدراوەکەتان هەبێ:

- زانیاریەکان لە بارەی دەرئەنجامی Queryـەکان: بریتییە لە تۆمارکراوەکان کە بە فەرمانەکانی SELECT،UPDATE یا DELETE بەدەست هێندراوە.
- زانیاریەکان دەربارەی خشتەکان و بنکەدراوەکان: بریتییەلە زانیاری چوارچێوەی بنەمایی بنکەدراوەکان و خشتەکان.
- زانیاری دەربارەی ڕاژەکاری MYSQL :بریتییە لە بارودۆخەکانی ڕاژەکاری بنکەدراوە، ژمارەی وشان و … .

### بەدەستهاوردنی ژمارەی دێڕەکان یەک تۆمارکراوە

**نمونەی ١ - PERL**
لە سکریپتەکانی DBI ژمارەی دێڕەکان بە فەرمانی **()do** وە یا **( )execute** دەگەڕێنینەوە، ئەمەش بە جۆنیەتی جێبەجیکردنی query پەیوەندی هەیە:

```sql
# Method 1
# execute $query using do( )
my $count = $dbh->do ($query);
# report 0 rows if an error occurred
printf "%d rows were affected\n", (defined ($count) ? $count : 0);
 
# Method 2
# execute query using prepare( ) plus execute( )
my $sth = $dbh->prepare ($query);
my $count = $sth->execute ( );
printf "%d rows were affected\n", (defined ($count) ? $count : 0);
```

**نمونەی ١ - PHP**
لە زمانی PHP لە نەخشەی **()mysql_affected_rows** بۆ بەدەست هێنانی ژمارەی تۆمارکراوەکان کە لە Query گۆڕدراوەن سود دەگرین:

```sql
$result_id = mysql_query ($query, $conn_id);
# report 0 rows if the query failed
$count = ($result_id ? mysql_affected_rows ($conn_id) : 0);
print ("$count rows were affected\n");
```



### پێرست کردنی خشتەکان و بنکەدراوەکان

پێرست کردنی هەموو بنکەدراوەکان و خشتەکانی هەبوو لە ڕاژەکارێکی بنکەدراوە زۆر ئاسانە.گەر مۆڵەتی ئەم کردارەتان نەبێت ئاکامی null تان بۆ دەگەڕێنێتوە.
بێجگە لەو شێوازەکە لە کۆدی خوارەوە شیکاری دەکەین، دەتوانن لە SHOW TABLES یان SHOW DATABASES بۆ وەرگرتنی پێرستێک لە خشتەکان یان بنکەدراوەکان لە php یان PERL سود بگرن.
**نمونەی ٢ - PERL**

```sql
# Get all the tables available in current database.
my @tables = $dbh->tables ( );
 
foreach $table (@tables ){
   print "Table Name $table\n";
}
```

**نمونەی ٢-PHP**

```php
<?php
   $con = mysql_connect("localhost", "userid", "password");
    
   if (!$con) {
      die('Could not connect: ' . mysql_error());
   }
   $db_list = mysql_list_dbs($con);
 
   while ($db = mysql_fetch_object($db_list)) {
      echo $db->Database . "<br />";
   }
   mysql_close($con);
?>
```



### وەرگرتنی Metadata ڕاژەکار

چەند فەرمانی گرینگ لە MYSQL هەیە کەدەتوانین لێیان لە چوارچێوەی MYSQL یان PHP بۆوەرگرتنی زانیاری گرینگ و جیاواز لە ڕاژەکاری بنکەدراوە، سود بگرن.

| ڕیز  |       فەرمان       |            شڕۆڤە             |
| :--: | :----------------: | :--------------------------: |
|  ١   | ( )SELECT VERSION  |    ڕیزبەندی وشانی ڕاژەکار    |
|  ٢   | ( )SELECT DATABASE |    ناوی ئێستای بنکەدراوە     |
|  ٣   |   ( )SELECT USER   |      بەکارهێنەری ئێستا       |
|  ٤   |    SHOW STATUS     | نیشانەکانی بارو دۆخی ڕاژەکار |
|  ٥   |   SHOW VARIABLES   |  گۆڕاوەکانی سازدانی ڕاژەکار  |