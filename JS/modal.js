'use strict';

/**
 * Получить модальный
 *  @constant
 * @type {HTMLDivElement}
 *  @default
*/
const modal = document.querySelector(".modal");
/**
 * Получить модальный
 *  @constant
 * @type {HTMLDivElement}
 *  @default
*/

const modalContent = document.querySelector(".modal-content")



/**
/ *  Получить кнопку, которая открывает модальный
 *  @constant
 * @type {HTMLButtonElement}
 *  @default
*/
const btn = document.getElementById("delete-btn");



/**
/ *  Получить класс "close", которая закрывает модальный
 *  @constant
 * @type {HTMLButtonElement}
 *  @default
*/
 const closeModal = document.getElementsByClassName("close")[0];
/**
/ *   Кнопка "Close"нажата
 *  @event module: handle event "click"
 * @return {void}
 *  
*/ 

closeModal.addEventListener("click", () => {
animatedCloseModal();    
});

/**
 * animation close modal window
 * @returns {void}
 */

function animatedCloseModal() {
  
  let result = modalContent.classList.add("close-modal");
     
    setTimeout(function(){
      modalContent.classList.remove("close-modal");
      modal.style.display = "none";
    }, 400);
}

/**
/ *  Получить кнопку "Close", которая закрывает модальное окно
 *  @constant
 * @type {HTMLButtonElement}
 *  @default
*/
const btnModalClose = document.getElementById("btn-modal-close");

/**
/ *  Получить кнопку "delete" модального окна
 *  @constant
 * @type {HTMLButtonElement}
 *  @default
*/
const btmModalDelete = document.getElementById("btn-modal-delete");


// Когда пользователь нажимает на кнопку, откройте модальный
/**
/ *   Кнопка "clear chat" окна window нажата
 *  @event module: handle event "click"
 * @return {void}
 *  
*/ 
btn.addEventListener("click", () => {
  modal.style.display = "block";  
});



/**
/ *   Когда пользователь нажимает на кнопку "Close", закройте модальное окно
 *  @event module: handle event "click"
 * @return {void}
 *  
*/ 
 btnModalClose.addEventListener("click", () => {
  animatedCloseModal();  ;
});



/**
/ *  Когда пользователь щелкает в любом месте за пределами модального, закройте его
 *  @event module: handle event "click"
 * @return {void}
 *  
*/ 
window.addEventListener("click",(event) => {
  if (event.target == modal) {
    animatedCloseModal();  ;
  }
});

/**
/ *  удаление данных из LocalStorage
 *  @event module: handle event "click"
 * @return {void}
 *  
*/ 

btmModalDelete.addEventListener("click",() =>{
  localStorage.removeItem("all-chats");
  loadDataFromLocalStorage();
});
