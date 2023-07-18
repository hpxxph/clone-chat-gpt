const microphoneBtn = document.querySelector("#microphoneBtn");
const input = document.querySelector("#chat-input");
let recognition;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
}
else {
    recognition = new SpeechRecognition();
}
recognition.continuous = false;
microphoneBtn.addEventListener("click", () => {
    recognition.start();
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        input.value = result;
    };
});
