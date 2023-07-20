'use strict';


/**
 * Кнопка микрофона.
 * @constant
 * @type {HTMLButtonElement}
 * @default
 */
const microphoneBtn = document.querySelector("#microphoneBtn");

/**
 * Поле ввода.
 * @constant
 * @type {HTMLInputElement}
 * @default
 */
const input = document.querySelector("#chat-input");
/**
 * Объект для распознавания речи.
 * @var
 * @type {SpeechRecognition}
 */
let recognition;

/**
 * Проверяем поддержку Web Speech API и создаем объект распознавания речи
 */
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
}
else {
    recognition = new SpeechRecognition();
}

/**
 * Устанавливаем опцию continuous в false, чтобы распознавание останавливалось после первого распознанного результата
 */
recognition.continuous = false;

/** 
 *  Добавляем обработчик события click на кнопку микрофона
 * @event module: handle event "click"
 * @returns {DataTransferItem}
*/
microphoneBtn.addEventListener("click", () => {
    recognition.start();
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        input.value = result;
    };
});
