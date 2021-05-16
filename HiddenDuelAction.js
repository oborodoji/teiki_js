// ==UserScript==
// @name         HiddenDuelAction
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  デュエル結果からセリフとカットインを非表示にします。
// @author       ぼーろ
// @match        http://lisge.com/ib/k/*/r*b3.html
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
/* load jQuery */
// @include http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('div.SE1').css('display','none');
    $('div.SE2').css('display','none');
    $('img[width="800"]').css('display','none');
})();
