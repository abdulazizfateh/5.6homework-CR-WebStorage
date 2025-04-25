// FORM - POPUP

const navCreateBtnEl = document.querySelector(".nav_create_btn");
const formWrapperEl = document.querySelector(".form_wrapper");
const overlayEl = document.querySelector(".overlay");

let isFormPoppedUp = JSON.parse(localStorage.getItem("form"));

navCreateBtnEl.addEventListener("click", () => {
    showOverlay();
    showForm();
    localStorage.setItem("form", JSON.stringify(true));
})

overlayEl.addEventListener("click", () => {
    hideOverlay();
    hideForm();
    localStorage.setItem("form", JSON.stringify(false));
})


const showForm = () => {
    formWrapperEl.classList.add("show");
}

const hideForm = () => {
    formWrapperEl.classList.remove("show");
}

const showOverlay = () => {
    overlayEl.classList.add("show");
}

const hideOverlay = () => {
    overlayEl.classList.remove("show");
}





// FORM - CREATE

const userFormWrapper = document.querySelector(".users_wrapper");
const formEl = document.querySelector(".form");

let DATA = JSON.parse(localStorage.getItem("DATA")) || [];
const addData = (product) => {
    DATA.push(product);
    localStorage.setItem("DATA", JSON.stringify(DATA));
}
const render = (data) => {
    userFormWrapper.innerHTML = null;
    data.forEach(item => {
        const userCardEl = document.createElement("div");
        userCardEl.className = "users_card";
        userCardEl.innerHTML =
            `<div class="users_image">
                <img src="${item.url}" width="100%" height="288" alt="Invalid URL">
            </div>
            <div class="users_body">
                 <div class="users_body_title">
                     <p class="user_card_name">${item.name}</p>
                    <p class="user_card_price">$${item.price}</p>
                  </div>
                  <p class="user_card_color">${item.color}</p>
            </div>`
        userFormWrapper.appendChild(userCardEl);
    })
}
render(DATA);

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let url = formEl.firstElementChild.value;
    let category = formEl.children[1].value;
    let name = formEl.children[2].value;
    let price = formEl.children[3].value;
    let color = formEl.children[4].value;
    if (url.trim() === "" || category.trim() === "" || name.trim() === "" || price.trim() === "" || color.trim() === "") {
        return null;
    }

    addData({ id: new Date().getTime(), url: url, category: category, name: name, price: price, color: color, })
    render(DATA);
    formEl.firstElementChild.value = "";
    formEl.children[1].value = "";
    formEl.children[2].value = "";
    formEl.children[3].value = "";
    formEl.children[4].value = "";
    hideOverlay();
    hideForm();
    localStorage.setItem("form", JSON.stringify(false));
})

if (isFormPoppedUp == true) {
    showOverlay();
    showForm();
}