// ==UserScript==
// @name         MemeFI web
// @version      1.7
// @description  Running MemeFI in a browser
// @author       mudachyo
// @match        https://tg-app.memefi.club/*
// @match        https://web.telegram.org/*/*
// @grant        none
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/29373.png
// @downloadURL  https://github.com/mudachyo/MemeFi-Coin/raw/main/memefi-web.user.js
// @updateURL    https://github.com/mudachyo/MemeFi-Coin/raw/main/memefi-web.user.js
// @homepage     https://github.com/mudachyo/MemeFi-Coin
// ==/UserScript==

(function() {
    function updateIframeSrc() {
      const iframe = document.querySelector('iframe');

      if (iframe) {
        let src = iframe.src;

        if (src.includes('tg-app.memefi.club') && !src.includes('tgWebAppPlatform=android')) {
          if (src.includes('tgWebAppPlatform=weba')) {
            src = src.replace(/tgWebAppPlatform=weba/g, 'tgWebAppPlatform=android');
          } else if (src.includes('tgWebAppPlatform=web')) {
            src = src.replace(/tgWebAppPlatform=web/g, 'tgWebAppPlatform=android');
          }

          iframe.src = src;

          console.log('Ссылка обновлена:', src);
        }
      } else {
      }
    }

    setInterval(updateIframeSrc, 1000);
  })();