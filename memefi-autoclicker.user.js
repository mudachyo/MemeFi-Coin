// ==UserScript==
// @name         MemeFI Autoclicker
// @version      1.1
// @description  Running TapSwap in a browser
// @author       mudachyo
// @match        https://tg-app.memefi.club/*
// @grant        none
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/29373.png
// @downloadURL  https://github.com/mudachyo/MemeFi-Coin/raw/main/memefi-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/MemeFi-Coin/raw/main/memefi-autoclicker.user.js
// @homepage     https://github.com/mudachyo/MemeFi-Coin
// ==/UserScript==

// Функция для генерации и отправки событий клика с рандомными координатами
function triggerClick(element) {
    // Генерация случайных координат в пределах 422x321
    const randomX = Math.floor(Math.random() * 422);
    const randomY = Math.floor(Math.random() * 321);

    const events = [
        new MouseEvent('pointerover', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('pointerenter', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('mouseover', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('mousedown', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('pointerdown', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('mouseup', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY }),
        new MouseEvent('pointerup', { view: window, bubbles: true, cancelable: true, clientX: randomX, clientY: randomY })
    ];

    events.forEach(event => element.dispatchEvent(event));
}

// Функция для поиска элемента и установки автокликера
function findAndClick() {
    const targetElement = document.querySelector('div[aria-disabled="false"].css-79elbk');

    if (targetElement) {
        function clickWithRandomInterval() {
            triggerClick(targetElement);
            const randomInterval = Math.floor(Math.random() * (130 - 30 + 1)) + 30;
            setTimeout(clickWithRandomInterval, randomInterval);
        }

        console.log(`${logPrefix}Element found. Starting auto-clicker...`, styles.success);
        clickWithRandomInterval();
    } else {
        if (attempts < 5) {
            attempts++;
            console.log(`${logPrefix}Attempt ${attempts} to find the element failed. Retrying in 3 seconds...`, styles.info);
            setTimeout(findAndClick, 3000);
        } else {
            console.log(`${logPrefix}Element not found after 5 attempts. Restarting search...`, styles.error);
            attempts = 0;
            setTimeout(findAndClick, 3000);
        }
    }
}

// Конфигурация стилей для логов
const styles = {
    success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
};
const logPrefix = '%c[MemeFiBot] ';

// Перезапись функции console.log для добавления префикса и стилей
const originalLog = console.log;
console.log = function () {
    if (typeof arguments[0] === 'string' && arguments[0].includes('[MemeFiBot]')) {
        originalLog.apply(console, arguments);
    }
};

// Отключение остальных методов консоли для чистоты вывода
console.error = console.warn = console.info = console.debug = () => { };

// Очистка консоли и стартовые сообщения
console.clear();
console.log(`${logPrefix}Starting`, styles.starting);
console.log(`${logPrefix}Created by https://t.me/mudachyo`, styles.starting);
console.log(`${logPrefix}Github https://github.com/mudachyo/MemeFi-Coin`, styles.starting);

// Начало поиска и автокликера
let attempts = 0;
findAndClick();

// Постоянный поиск элемента
setInterval(() => {
    if (!document.querySelector('div[aria-disabled="false"].css-79elbk')) {
        attempts = 0;
        findAndClick();
    }
}, 5000);
