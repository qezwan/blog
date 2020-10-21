---
layout: post
title: Draft.js:چوارچێوە سەرچاوەکراوە بۆ دروستکردنی دەستکاریکەر بە React
tags: [سەرچاوەکراوە]
date : "2020-10-18 10:40:45"
---

[Draft.js](https://facebook.github.io/draft-js/) ئیمکانێک دەدا بە گەشەپێدەران تا هەر دەستکاریکەرێکی دەق کە نیازیان پێی بێت، زۆر بە سادەیی بۆ دەستکاری چەند دێڕی سادە تا دەستکاریکەرێکی پێشکەوتوو بۆ بڵاو کردنی دەقەکان بە چوارچێوەی ئاڵۆز، زیاد بکەنە نێو پڕۆژەکەیان.گەشەپێدەر دەتوانێت لە سەر هەر بەشی بە وردەکاری ئیش و دڵخوازی بکەن.



**ڕێنمایی داگرتن** 

Draft.js لە رێگای NPM[^١] کە دەیخاتە بەردەست گەشەپێدەران،  لە ڕێگای فەرمانی خوارەوە دەتوانن چوارچێوەی Draft.js دابەزێنن:

```shell
$ npm install --save draft-js react react-dom
```

پاش دامەزرادندن، کۆدەکانی ئەم چوارچێوەیە بەم جۆرەیە:

```powershell
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const {editorState} = this.state;
    return ;
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);
```



Draft.js بۆ خۆی پشتیوانی لە  یونیکۆد دەکا دەتوانن لە بەشی سەردێڕی پەڕەکەتان ئەم کۆدە بنووسن:

```html
<meta charset="utf-8" />
```







---

[^١]: پاکەتێکی پێشگریمانەی بەڕێوەبردنی نۆد جەی‌ئێس‌ـە