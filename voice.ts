/**
 * Кнопка микрофона.
 * @type {HTMLButtonElement}
 */
const microphoneBtn = document.querySelector("#microphoneBtn") as HTMLButtonElement;

/**
 * Поле ввода.
 * @type {HTMLInputElement}
 */
const input = document.querySelector<HTMLInputElement>("#chat-input");

/**
 * Объект для распознавания речи.
 * @type {SpeechRecognition}
 */
let recognition: SpeechRecognition;

// Проверяем поддержку Web Speech API и создаем объект распознавания речи
if ("webkitSpeechRecognition" in window) {
  /**
   * Объект распознавания речи (для WebKit-браузеров).
   * @type {webkitSpeechRecognition}
   */
  recognition = new webkitSpeechRecognition();
} else {
  /**
   * Объект распознавания речи.
   * @type {SpeechRecognition}
   */
  recognition = new SpeechRecognition();
}

// Устанавливаем опцию continuous в false, чтобы распознавание останавливалось после первого распознанного результата
recognition.continuous = false;

// Добавляем обработчик события click на кнопку микрофона
microphoneBtn.addEventListener("click", () => {
  // Запускаем распознавание речи
  recognition.start();

  // Добавляем обработчик события onresult, который будет вызываться при получении результатов распознавания
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    /**
     * Результат распознавания речи.
     * @type {string}
     */
    const result = event.results[0][0].transcript;
    // Устанавливаем значение распознанного результата в поле ввода
    input.value = result;
  };
});

