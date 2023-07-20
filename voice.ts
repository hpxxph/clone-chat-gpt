
const microphoneBtn = document.querySelector("#microphoneBtn") as HTMLButtonElement;


const input = document.querySelector<HTMLInputElement>("#chat-input");


let recognition: SpeechRecognition;

 
if ("webkitSpeechRecognition" in window) {
  
  recognition = new webkitSpeechRecognition();
} else {
  
  recognition = new SpeechRecognition();
}


recognition.continuous = false;


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

