'use strict';

/**
 * Поле ввода чата.
 * @constant
 * @type {HTMLInputElement}
 * @default
 */
const chatInput = document.querySelector("#chat-input");

/**
 * Кнопка отправки сообщения.
 * @constant
 * @type {HTMLButtonElement}
 * @default
 */
const sendButton = document.querySelector("#send-btn");

/**
 * Контейнер чата.
 * @constant
 * @type {HTMLDivElement}
 * @default
 */
const chatContainer = document.querySelector(".chat-container");
/**
 * Кнопка переключения темы.
 * @constant
 * @type {HTMLButtonElement}
 * @default
 */
const themeButton = document.querySelector("#theme-btn");

/**
 * Кнопка удаления всех сообщений в чате.
 * @constant
 * @type {HTMLButtonElement}
 * @default
 */
const deleteButton = document.querySelector("#delete-btn");


/**
 * Ссылка на изображение пользователя.
 * @constant
 * @type {string}
 * @default
 */
const userImgLink = 'public/images/user.png';


/**
 * Текст пользователя.
 * @var
 * @type {string | null}
 */
let userText = null;

/**
 * Ключ API OpenAI.
 * @constant
 * @type {string}
 * @default
 */
const API_KEY = "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";
/**
 * загрузка данных из LocalStorage
 * @returns {DataTransferItem}
 */
const loadDataFromLocalStorage = () => {
    const themeColor = localStorage.getItem("themeColor");
    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    const defaultText = `<div class="default-text">
                            <h1>ChatGPT</h1>
                        </div>`;
    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

/**
 * Создает элемент чата.
 * @param {string} content - Содержимое элемента чата.
 * @param {string} className - Класс элемента чата.
 * @returns {HTMLDivElement} - Элемент чата.
 */
const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
};

/**
 * Получает ответ чата с помощью API OpenAI.
 * @param {HTMLDivElement} incomingChatDiv - Входящий элемент чата.
 */
const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null,
        }),
    };
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    }
    catch (error) {
        pElement.classList.add("error");
        pElement.textContent =
            "Oops! Something went wrong while retrieving the response. Please try again.";
    }
    incomingChatDiv.querySelector(".typing-animation")?.remove();
    incomingChatDiv.querySelector(".chat-details")?.appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};
const copyResponse = (copyBtn) => {
    const responseTextElement = copyBtn.parentElement?.querySelector("p");
    if (responseTextElement) {
        navigator.clipboard.writeText(responseTextElement.textContent || "");
        copyBtn.textContent = "done";
        setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
    }
};

/**
 * Показывает анимацию набора сообщения.
 */
const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="public/images/chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
};

/**
 * Обрабатывает отправку исходящего сообщения.
 */
const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    if (!userText)
        return;
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="${userImgLink}" alt="">
                        <p>${userText}</p>
                    </div>
                </div>`;
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
};

/**
 * Обработчик клика на кнопку переключения темы.
 * @event module: handle event "click"
 * @return {void}
 */
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
});
/**
 * Обновляет высоту поля ввода чата при инициализации.
 * @constant
 * @type {number}
 * @default
 */
const initialInputHeight = chatInput.scrollHeight;

/**
 * Обновляет высоту поля ввода чата при изменении его содержимого.
 * @event module: handle event "input"
 * @returns {number}
 */
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

/**
 * Обрабатывает нажатие клавиши "Enter" для отправки исходящего сообщения (только если ширина окна больше 800px).
 * @param {KeyboardEvent} e - Событие клавиатуры.
 * @event module: handle event "keydown"
 */
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});
loadDataFromLocalStorage();
sendButton.addEventListener("click", handleOutgoingChat);
