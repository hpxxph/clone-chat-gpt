'use strict';

// Получить модальный
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content")
// const modalClasses = modal.classList;

// Получить кнопку, которая открывает модальный
const btn = document.getElementById("delete-btn");

// Получить кнопку "Close", который закрывает модальный
 const closeModal = document.getElementsByClassName("close")[0];
closeModal.addEventListener("click", () => {
animatedCloseModal();    
});

function animatedCloseModal() {
  let result = modalContent.classList.add("close-modal");
     
    setTimeout(function(){
      modalContent.classList.remove("close-modal");
      modal.style.display = "none";
    }, 400);
}


const btnModalClose = document.getElementById("btn-modal-close");
const btmModalDelete = document.getElementById("btn-modal-delete");


// Когда пользователь нажимает на кнопку, откройте модальный
btn.addEventListener("click", () => {
  modal.style.display = "block";
  console.log("!");
});


// Когда пользователь нажимает на кнопку "Close", закройте модальное окно
 btnModalClose.addEventListener("click", () => {
  animatedCloseModal();  ;
});

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.addEventListener("click",(event) => {
  if (event.target == modal) {
    animatedCloseModal();  ;
  }
});

btmModalDelete.addEventListener("click",() =>{
  localStorage.removeItem("all-chats");
  loadDataFromLocalStorage();
});
