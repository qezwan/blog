---
layout: post
title: دامەزراندنی Apache, PHP ۷.۱ و MySQL لە CentOS ۷.۳
tags: [ڕاژە]
date : "2017-03-20 05:35:45"
---

##### پێشەکی

لەم وانە فێر دەبین کە چۆن ڕاژەیێکی Apache لە سەر گنو/لینوکسی CentOS 7 (راژە) بە پاڵپشتیکردنی PHP و MySQL دامەزرێنین.LAMP کورتکراوەی Linux, Apache, MySQL, PHPـە. ئەم وانە بەڕۆژبووە لە سەر PHP وشانی (7.0 وە 7.1) لە گنو/لینوکسی CentOS 7.3سێرڤێر.دەتوانن [ئەم بابەتەش](http://qezwan.ir/server/دامەزراندنی-ڕاژەیێکی-بچووک-بە-centos-7.3/) بۆ فێربوونی زیادتر بخوێنن

##### 1- خاڵێ سەرەکی :

لەم فێرکارییە من سوودم بینیوە لە ناوی ڕاژەی server1.example.com بەم IPییە 192.168.1.100. دەتوانێت ئەم ناوانە بۆ ئێوە جیاواز بێت و بیگۆڕن بە سەلیقەو حەزی خۆتان. من گەرەکمە کە پاکەتی EPEL زیادبکەم بۆ دوایین وشانی phpMyAdmin لەم وانە :

```shell
*rpm –import /etc/pki/rpm-gpg/RPM-GPG-KEY
yum -y install epel-release
```

هەروا بۆ ئەوە کە دەستکاری فایلەکان بکەم پێویستم بە ئەپێکی دەستکاریکەری دەقە کە من لێرە لە nano سوود دەبینم،بە فەرمانەکەی خوارەوە دایدەمەزرێنم:

```shell
yum -y install nano
```

##### 2- دامەزراندنی MySQL / MariaDB

MariaDB شاخەیێکە لە MySQL کە گەشەی سەندووە هەر بۆیە من لێرە بۆ پاشکەوتی زانیاریەکان لە MariaDB سوود دەگرم:

```shell
yum -y install mariadb-server mariadb
```

بەفەرمانەکانی خوارەوە ئێمە دەتوانین کە لە کاتی دەستپێکردنی سیستەم MySQL دەستبە ئیش بکات و ئامادە بێت:

```shell
systemctl start mariadb.service
systemctl enable mariadb.service
```

ئێستا دەبێت وشەی نهینی بۆ MySQL لە هەژمارەی root سازبکەین :

```shell
mysql_secure_installation
[root@server1 ~]# mysql_secure_installation
/usr/bin/mysql_secure_installation: line 379: find_mysql_client: command not found

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
SERVERS IN PRODUCTION USE! PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user. If you've just installed MariaDB, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none): <--ENTER
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.

Set root password? [Y/n]
New password: <--yourmariadbpassword
Re-enter new password: <--yourmariadbpassword
Password updated successfully!
Reloading privilege tables..
... Success!
By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them. This is intended only for testing, and to make the installation
go a bit smoother. You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] <--ENTER
... Success!

Normally, root should only be allowed to connect from 'localhost'. This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] <--ENTER
... Success!

By default, MariaDB comes with a database named 'test' that anyone can
access. This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] <--ENTER
- Dropping test database...
... Success!
- Removing privileges on test database...
... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] <--ENTER
... Success!

Cleaning up...

All done! If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
[root@server1 ~]#
```

##### 3- دامەزراندنی Apache

:
لە گنو/لینوکسی CentOS 7 ڕاژەی apache 2.4 بوونی هەیە ،بەڵام دەتوانین بەم فەرانە دایمەزرێنین :

```shell
yum -y install httpd
```

هەڵگرساندنی Apache لە کاتی دەستپێکی سیستەم دەتوانین بەم فەرمانە بانگی بکەین :

```shell
systemctl start httpd.service

systemctl enable httpd.service
```

بۆ ئەوە کە دەستپێگەیشتنمان بێت لە دەرەوەی ڕاژە دەبێت دەرگا یان پۆرتەکانی دیواریئاگرینەکەمان()بە (HTTP (80 وە (HTTPS (443 رێکبخەین.کە دەتوانین بە فەرمانەکانی خوارەوە کانفیگی بکەین :

```shell
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --reload
```

دەتوانن بە کردنەوەی وێبگەرەکەتان و نووسینی ئەم IP ئادرەسە واتە http://192.168.1.100 ڕاژەی Apache ببینن :

![](/server/images/04.png)

##### 4-دامەزراندنی PHP :

لە CentOS وشانی کۆنەی PHP بوونی هەیە واتە (PHP 5.4)، بەڵام من لێرە فێرتان دەکەم کە وشانی نوێی PHP کە بریتییە لە PHP 7.0 یا 7.1 لە کانگای Remi دامەزرێنین. بۆ زیاد کردنی Remi دەتوانین لە فەرمانەکەی خوارەوە سوود بگرین :

```shell
rpm -Uvh http://rpms.remirepo.net/enterprise/remi-release-7.rpm
```

دامەزراندنی yum-utils بۆ پەیکەربەستنی yum-config-manager بە فەرمانەکەی خوارەوە :

```shell
yum -y install yum-utils
```

سەرەتا yum بەرۆژ بکەن :

```shell
yum update
```

ئێستا سەرەتا وشانی کۆنەی PHP دادەمەزرێنین وە لە دوو بەشی جیاواز فێر دەبین کە چۆن وشانی PHP 7.0 وە PHP 7.1 دامەزرێنین :

سەرەتا بۆ دامەزراندنی وشانی کۆنەی PHP 5.4 فەرمانەکەی خوارەوە دەنووسین :

```shell
yum -y install php
```

###### 1-4- دامەزراندنی وشانی PHP 7.0 :

بۆ دامەزراندنی وشانی PHP 7.0 هەروا  Apache PHP 7.0 بەم فەرمانە کردار دەکەین :

```shell
yum-config-manager –enable remi-php70

yum -y install php php-opcache
```

###### 2-4- دامەزراندنی وشانی PHP 7.1 :

بۆ دامەزراندنی وشانی PHP 7.1 لەم دوو فەرمانە سوود دەگرین :

```shell
yum-config-manager –enable remi-php71

yum -y install php php-opcache
```

پاش گۆڕانکاریەکانی سەرەوە ئێمە دەبێت Apache ریستارت بکەینەوە . فەرمانەکەی خوارەوە دەنوسین :

```shell
systemctl restart httpd.service
```

##### 5- تاقیکردنیPHP :

لە مەسیری var/www/html/ ئێمە دەتوانین فایلێکی PHP درووست بکەین بە ناویinfo.php ،ئەم فایلە زانیاریەکانمان پێ پیشان دەدا. بە فەرمانەکەی خوارەوە دەچینە ناو ئەو فایلە :

```shell
nano /var/www/html/info.php
```

ئێستا لە ناو فایلەکە واتە info.php ئەم هێڵە دەنووسین و پاشکەوتی دەکین :

```shell

```

ئیستا دەبێت لە شریتی ناونیشانی  وێبگەرەکە ئەم مەسیرە بنووسین http://192.168.1.100/info.php

![](/server/images/04-1.png)

ێوە دەبینن زانیاری ڕاژە دەردەکەوێت و وشانی PHP 7.1 خەریکی کارکردنە و هەروا Apache 2.0 .

##### 6- دامەزراندنی MySQL بۆ پشتیوانیPHP :

دامەزراندنی MySQL و پشتیوانی لە PHP،ئێمە ئەتوانین پاکەتی php71w-mysql دامەزرێنین.سەرەتا بە فەرمانەکەی خوارەوە دەگەرێین بۆ ماژۆڵێ phpـەکەمان

```shell
yum search php
```

بەفەرمانەکەی خوارەوە دایدەمەزرێنین :

```shell
yum -y install php-mysql
```

لە هەنگاوەکەی دیکە ئێمە چەندین ماژۆڵی PHP دادەمەزرێنین بۆ ئەوە کە بتوانین سیستەمەکانی بەرێوەبردنی ناوەرۆک وەک وۆردپرێس،درۆپاڵ و ژۆمڵایلە سەر دامەزرێنین…

```shell
yum -y install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-soap curl curl-devel
```

ئێستا ریستارت دەکەینەوە :

```shell
systemctl restart httpd.service
```

ئێستا ناونیشانی http://192.168.1.100/info.php لە وێبگەرەکەمان دەنووسین و سکرۆڵ دینینە خوارەوە تا چاومان بە نوێکاریەکان بکەوێت وەک curl و …هتد.

![](/server/images/04-2.png)

ئیتر پێویستان بە فایلی php info نییەو دەتوانن بە فەرمانەکەی خوارەوە لە ترمیناڵ بیسڕنەوە :

```shell
rm /var/www/html/info.php
```

##### 7-دامەزراندنی phpMyAdmin :

phpMyAdmin ڕووخسارێکە بۆ بەرێوەبردنی بنکەدراوەی MySQL واتە شێوازێکی گرافیکی کارکردن لە سەر ئەم داتا بەیسەیە.

```shell
yum -y install phpMyAdmin
```

ئێستا دەبێتphpMyAdmin کانفیگ بکەین کە پێویستی بە ‘Require all granted’ هێڵەیە .سەرەتا دەچینە ناو فایلی کانفیگەکەی :

```shell
nano /etc/httpd/conf.d/phpMyAdmin.conf
```

دەستکاری دەکەین وەک نموونەی خوارەوە :

```shell
[...]
Alias /phpMyAdmin /usr/share/phpMyAdmin
Alias /phpmyadmin /usr/share/phpMyAdmin


 AddDefaultCharset UTF-8

 
 # Apache 2.4
# 
# Require ip 127.0.0.1
# Require ip ::1
# 
 Require all granted
 
 
 # Apache 2.2
 Order Deny,Allow
 Deny from All
 Allow from 127.0.0.1
 Allow from ::1
 





        Options none
        AllowOverride Limit
        Require all granted


[...] 
```

ئێستا دەبێت بوونی phpMyAdmin لە cookie to http بگۆڕین :

```shell
nano /etc/phpMyAdmin/config.inc.php
```



```shell
[...]
$cfg['Servers'][$i]['auth_type']     = 'http';    // Authentication method (config, http or cookie based)?
[...]
```

Apache ریستارت دەکەینەوە بەم فەرمانە :

> ```shell
> systemctl restart httpd.service
> ```

بۆ دەستپێگەیشتن بە رووخساری بنکەی دراوە واتە دەتوانی ئادرەسی http://192.168.1.100/phpmyadmin لە وێبگەڕەکەت بنووسیت .

![](/server/images/04-3.png)

##### بەستەرەکان :

Apache: http://httpd.apache.org
PHP: http://www.php.net
MySQL: http://www.mysql.com
CentOS: http://www.centos.org
phpMyAdmin: http://www.phpmyadmin.net



[howtoforge](https://www.howtoforge.com/tutorial/centos-lamp-server-apache-mysql-php/) 