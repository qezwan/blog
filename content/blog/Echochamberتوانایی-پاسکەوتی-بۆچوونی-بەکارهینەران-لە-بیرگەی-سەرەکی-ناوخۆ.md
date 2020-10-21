---
layout: post
title: Echochamber:توانایی پاشکەوتی بۆچوونی بەکارهێنەران لە بیرگەی سەرەکی ناوخۆ
tags: [سەرچاوەکراوە]
date : "2020-10-19 00:17:45"
---

[Echochamber.js](https://github.com/tessalt/echo-chamber-js) کتێبخانەیەکی جاڤا سکریپت کە یارمەتی گەشەپێدەران دەدا زۆر بە ئاسانی بتوانن فۆرمی بۆچوون لە بلۆگ یان ماڵپەڕەکەیان زیاد بکەن.ئەمەش لە کاتێکە کە بۆچوونی بەکارهێنەران لە بیرگەی ناوخۆیی(LocalStorage) پاشکەوت دەکرێت.

Echochamber.js ئەم ئیمکانە دەخاتە بەردەستان، کە هەر کات بەکارهێنەرێک لە ژێر ناوەرۆکی تایبەت لە ماڵپەڕەکەتان بۆچۆنێک یان تێبینێکی نووسی، تەنها لە بیرگەی ناخۆیی پاشکەوت بێت.بس کاتێک بەکارهێنەر دەگەڕیتەوە سەر ئەو پەڕە دڵنیا دەبێت کە بۆچوونەکەی تۆمار کراوە،بەڵام سەردانکەرەکانی دیکە بۆچوونی نابینن.

بە یارمەتی ئەم کتێبخانەیە هیچ  داوایەک لە جۆری HTTP بۆ لای ڕاژەکار ناڕوا، بۆ ئەوە کە ئەم بیرگە ناوخۆییە تەنها لە سنووری وێبگەر ئیش دەکا؛ئەمە کۆدی چالاکی ئەم کتێبخانەیە:

```javascript
<script id="echochamber">
    var EchoChamber = window.EchoChamber || {};
    (function() {
      EchoChamber.discussionURL = window.location;
      var script = document.createElement('script');
      script.src = 'https://s3.amazonaws.com/echochamberjs/dist/main.js';
      script.async = true;
      var entry = document.getElementById('echochamber');
      entry.parentNode.insertBefore(script, entry);
    })();
</script>
```

**تایبەتمەندییەکانی Echochamber.js**

- بی نیاز لە ڕاژەکار و بنکەدراوە و ١٠٠٪ پارێزراو لە هەرزەنامە.
- سازگار لەگەڵ زۆربەی پلاتفۆرمەکانی وێب و ماڵپەڕە نەجۆڵاوەکان.
- هاوئاهەنگی لەگەڵ ڕووکاری ماڵپەڕ و بلۆگی ئێوە.

