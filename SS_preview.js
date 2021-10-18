// ==UserScript==
// @name         SS_preview
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Secret Sphire のコミュニティ発言画面で、プレビューをJSで処理します。
// @author       oborodoji
// @match        http://www.sssloxia.jp/d/rc.aspx*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
/* load jQuery */
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

  var $input = $('textarea[name="TBCom"]');
  var $output = $('#LBView');
  var $icon = $('#icondiv img');
  var Pno = "XXX";

  // テキストボックスに入力したら実行する処理（元の処理と衝突するのでコメントアウト）
  //$input.on('input', function(event) {
  //  $output.html(dispPreview($input.val()));
  //});

  // プレビューボタンを追加
  var previewbtn = '<input type="button" name="Preview" value="プレビュー" id="ButtonPreview">';
  $('#BtnT').after(previewbtn);
  $('#ButtonPreview').on('click', function(event) {
    $output.html(dispPreview($input.val()));
  });

  // ---以下、実際に動くプログラム---

  // アイコンのリスト作成
  var iconlist = [];
  for (let i = 0; i < $icon.length; i++) {
    iconlist.push($icon[i].getAttribute('src'));
  }

  // プレビュー表示
  function dispPreview(text){
    var tmp = [];
    var list = [0];
    var pattern = /(@@@)|(@[^@]+@)/g;
    var res = [];

    // 文章をパーツ分け
    while (tmp = pattern.exec(text)) {
      list.push(tmp.index);
    }
    for (let i = 0; i < list.length; i++) {
      var next = list[i+1];
      if (isNaN(next)) {
        next = 0;
      }
      var str = text.slice(list[i], list[i+1]);
      if (str) {
        res.push(str);
      }
    }
    if (list.length === 0) {
        res.push(text);
    }

    // 文章パーツごとにテーブルに分割
    for (let i = 0; i < res.length; i++) {
      pattern = '@@@';
      if(res[i].indexOf(pattern) === 0){
        // ト書き
        pattern = /@@@/;
        let tmp = '<table class="WordsTable" cellspacing="0" cellpadding="0">'
        +'<tr><td class="String">'
        + sstag(res[i].slice(3))
        + '</td><tr>'
        + '</table>';
        res[i] = tmp;
      } else {
        // アイコン付き
        let name;
        let iconno;
        let icon;
        let str;

        pattern = '@';
        if (res[i].indexOf(pattern) === 0) {
          name = res[i].match(/@[^@]+@/)[0].slice(1,-1);
          iconno = res[i].match(/\/[0-9]+\//)[0].slice(1,-1);
          if (isNaN(iconno)) {
            icon = '';
          } else {
            icon = iconlist[iconno];
          }
          str = sstag(res[i].slice(name.length + iconno.length + 4));
        } else {
          name = $('#TBName').val();
          icon = iconlist[0];
          str = sstag(res[i]);
        }

        let tmp = '<table class="WordsTable" cellspacing="0" cellpadding="0">'
        + '<tr><td class="Icon" rowspan="2">'
        + '<img src="' + icon + '" width="60" height="60">'
        + '</td><td class="Name"><font color="" class="F2">' + name + ' - PNo.' + Pno + '</font></td></tr>'
        + '<tr><td class="Words">'
        + '「'
        + str
        + '」'
        + '</td></tr>'
        + '</table>';
        res[i] = tmp;
      }
    }

    // テーブルタグとして連結
    var result = '';
    for (let i = 0; i < res.length; i++) {
      result += res[i];
    }

    return nl2br(result);
  }

  // 特殊文字をタグに変換
  function sstag(str) {
    // F1～F7
    str = str.replace(/<F1>/g, '<span class="F1">');
    str = str.replace(/<\/F1>/g, '</span>');
    str = str.replace(/<F2>/g, '<span class="F2">');
    str = str.replace(/<\/F2>/g, '</span>');
    str = str.replace(/<F3>/g, '<span class="F3">');
    str = str.replace(/<\/F3>/g, '</span>');
    str = str.replace(/<F4>/g, '<span class="F4">');
    str = str.replace(/<\/F4>/g, '</span>');
    str = str.replace(/<F5>/g, '<span class="F5">');
    str = str.replace(/<\/F5>/g, '</span>');
    str = str.replace(/<F6>/g, '<span class="F6">');
    str = str.replace(/<\/F6>/g, '</span>');
    str = str.replace(/<F7>/g, '<span class="F7">');
    str = str.replace(/<\/F7>/g, '</span>');

    // 太字、斜体など
    str = str.replace(/<B>/g, '<span class="B">');
    str = str.replace(/<\/B>/g, '</span>');
    str = str.replace(/<I>/g, '<span class="I">');
    str = str.replace(/<\/I>/g, '</span>');
    str = str.replace(/<S>/g, '<span class="S">');
    str = str.replace(/<\/S>/g, '</span>');

    // ランダム
    str = str.replace(/<D>/g, '<img border="0" alt="1" src="http://www.sssloxia.jp/p/d1.png" width="20" height="20">');
    str = str.replace(/<T>/g, '<img border="0" alt="card" src="http://www.sssloxia.jp/p/t/da1.png" width="30" height="40">');

    return str;
  }

  // 改行をタグに変換
  function nl2br(str) {
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/(\n|\r)/g, '<br />');
    return str;
  }

})();
