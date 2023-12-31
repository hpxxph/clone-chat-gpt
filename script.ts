
const chatInput = document.querySelector<HTMLInputElement>("#chat-input");


const sendButton = document.querySelector<HTMLButtonElement>("#send-btn");


const chatContainer = document.querySelector<HTMLDivElement>(".chat-container");


const themeButton = document.querySelector<HTMLButtonElement>("#theme-btn");


const deleteButton = document.querySelector<HTMLButtonElement>("#delete-btn");

const userImgLink = 'public/images/user.png';

let userText = null;


const API_KEY = "YOUR API";

/*`
 * Загрузка данных из локального хранилища.
 * Инициализация темы и чата.
 */
const loadDataFromLocalStorage = () => {
  /**
   * Цвет темы из локального хранилища.
   * @type {string | null}
   */
  const themeColor = localStorage.getItem("themeColor");

  // Установка класса light-mode, если тема равна "light_mode"
  document.body.classList.toggle("light-mode", themeColor === "light_mode");

  // HTML-разметка по умолчанию для чата
  const defaultText = `<div class="default-text">
                            <h1>ChatGPT</h1>
                        </div>`;

  // Загрузка сообщений чата из локального хранилища или установка разметки по умолчанию
  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};


const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};


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
  } catch (error) {
    pElement.classList.add("error");
    pElement.textContent =
      "Oops! Something went wrong while retrieving the response. Please try again.";
  }

  incomingChatDiv.querySelector(".typing-animation")?.remove();
  incomingChatDiv.querySelector(".chat-details")?.appendChild(pElement);
  localStorage.setItem("all-chats", chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

/**
 * Копирует ответ чата в буфер обмена.
 * @param {HTMLElement} copyBtn - Кнопка копирования ответа.
 */
const copyResponse = (copyBtn) => {
  const responseTextElement = copyBtn.parentElement?.querySelector("p");
  if (responseTextElement) {
    navigator.clipboard.writeText(responseTextElement.textContent || "");
    copyBtn.textContent = "done";
    setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
  }
};


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


const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

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


themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("themeColor", themeButton.innerText);
});


const initialInputHeight = chatInput.scrollHeight;


chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});


chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

// Загрузка данных из локального хранилища и установка обработчиков событий
loadDataFromLocalStorage();
sendButton.addEventListener("click", handleOutgoingChat);