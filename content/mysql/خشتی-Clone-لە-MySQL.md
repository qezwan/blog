---
layout: post
title: خشتی Clone لە MySQL
tags: [mysql]
date : "2018-06-19 05:35:45"
---

### پێشەکی

جاری واهەیە کە پێتان خۆشە کە روونووسێکی هاوشێوەتان لە خشتەیەکی بنکەدراوەکەتان هەبێت، بۆ ئەم مەبەستە سود لە CREATE TABLE … SELECT ئامانجی ئێوە ناپێکێ.لەم بابەتە رێگایێکی سادە بۆ ڕوونووسی خشتەکانتان پێ دەڵێین. بەم ڕوونووسە **Clone** دەڵێن.

### ئاشنایی لەگەڵ خشتەکانی Clone لە MYSQL

نمونەیەکی سادە دهێنینەوە کە فامی ئێوە رووناک بکات.بۆ ڕوونووسی تەواو لە خشتەیەک قۆناغەکانی خوارەوە بەوردی جێبەجی بکەن.

- بە یارمەتی فەرمانی SHOW CREATE TABLE تەواو خشتەکانی نێو بنکە دراوە پێرست بکەن.
- فەرمانی دروستکردنی وشانی ئەسڵی بۆ خشتەی ڕوونووس(Clone) بە ناو و ریزیکی جیاواز بگۆڕن.
- گەر بە ناوەرۆکی خشتەکان نیازتان هەیە لە فەرمانی INSERT INTO … SELECT سوود بگرن.

### نمونەی دروستکردنی خشتەکانی Clone لە MYSQL

لە نمونەی خوارەوە خشتەیەکی Clone لە خشتەی **tutorials_tbl** دروستدەکەین.
**قۆناغی یەکەم :**چوارچێوەی تەواوی دروستکردنی خشتەکان پەیکەرسازی بکەن:

```sql
mysql> SHOW CREATE TABLE tutorials_tbl \G;
*************************** 1. row ***************************
      Table: tutorials_tbl
Create Table: CREATE TABLE `tutorials_tbl` (
   `tutorial_id` int(11) NOT NULL auto_increment,
   `tutorial_title` varchar(100) NOT NULL default '',
   `tutorial_author` varchar(40) NOT NULL default '',
   `submission_date` date default NULL,
   PRIMARY KEY  (`tutorial_id`),
   UNIQUE KEY `AUTHOR_INDEX` (`tutorial_author`)
) TYPE = MyISAM
1 row in set (0.00 sec)
 
ERROR:
No query specified
```

**قۆناغی دووهەم :** گۆڕانی نێوی خشتەکان و دروستکردنی خشتەکانی دیکە:

```sql
mysql> CREATE TABLE clone_tbl (
   -> tutorial_id int(11) NOT NULL auto_increment,
   -> tutorial_title varchar(100) NOT NULL default '',
   -> tutorial_author varchar(40) NOT NULL default '',
   -> submission_date date default NULL,
   -> PRIMARY KEY  (tutorial_id),
   -> UNIQUE KEY AUTHOR_INDEX (tutorial_author)
-> ) TYPE = MyISAM;
Query OK, 0 rows affected (1.80 sec)
```

**قۆناغی سێهەم:** پاشجێبەجیکردنی قۆناغی دووهەم خشتەیەکی clone لە بنکە دراوە دروست دەکەین:
گەر هەرەکتانە دراوەکان لە خشتەی کۆنە ڕوونووس بکەن، دەتوانن بە یارمەتی INSERT INTO … SELECT پێی زیاد بکەن :

```sql
mysql> INSERT INTO clone_tbl (tutorial_id,
   -> tutorial_title,
   -> tutorial_author,
   -> submission_date)
    
   -> SELECT tutorial_id,tutorial_title,
   -> tutorial_author,submission_date
   -> FROM tutorials_tbl;
Query OK, 3 rows affected (0.07 sec)
Records: 3  Duplicates: 0  Warnings: 0
```