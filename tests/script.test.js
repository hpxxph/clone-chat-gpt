`const { JSDOM } = require('jsdom');`
const fs = require('fs');
const path = require('../JS/script.js');

const scriptCode = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
const { window } = new JSDOM(`<html><body>${scriptCode}</body></html>`);
const { document } = window;

const chatInput = document.querySelector('#chat-input')
const sendButton = document.querySelector('#send-btn')
const chatContainer = document.querySelector('.chat-container')
const themeButton = document.querySelector('#theme-btn')
const deleteButton = document.querySelector('#delete-btn')

test('Input field should be cleared after sending a message', () => {
  chatInput.value = 'Hello, ChatGPT!'
  sendButton.click();
  expect(chatInput.value).toBe('');
});
test('Chat container should be cleared after deleting all messages', () => {
  chatContainer.innerHTML = '<div class="chat outgoing"><p>Hello!</p></div>';

  deleteButton.click();

  expect(chatContainer.innerHTML).toBe('');
});

test('Theme should be toggled when theme button is clicked', () => {
  document.body.classList.add('light-mode');

  themeButton.click();

  expect(document.body.classList.contains('dark-mode')).toBe(true);

  themeButton.click();

  expect(document.body.classList.contains('light-mode')).toBe(true);
});

test('Input field height should update on input', () => {
  chatInput.style.height = '50px';
  chatInput.dispatchEvent(new window.Event('input'));
  expect(chatInput.style.height).not.toBe('50px');
});