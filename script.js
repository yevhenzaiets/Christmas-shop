//// burger menu
const openMenu = document.querySelector('.brand_burger_menu');
const bodyMenu = document.querySelector('.brand_nav_menu');
const navMenu = document.querySelectorAll('#nav-menu');

navMenu.forEach(e => {
    e.addEventListener('click', () => {
        openMenu.classList.remove('active');
        bodyMenu.classList.remove('active');
        document.querySelector('body').classList.remove("hidden");
    })
});

openMenu.addEventListener('click', () => {
    if(openMenu.classList.contains('active') || bodyMenu.classList.contains('active')) {
        openMenu.classList.remove('active');
        bodyMenu.classList.remove('active');
        document.querySelector('body').classList.remove("hidden");
    }else{
        openMenu.classList.add('active');
        bodyMenu.classList.add('active');
        document.querySelector('body').classList.add("hidden");
    }
})

//// slider
const slides = document.querySelectorAll(".slide_item");
const previousBut = document.querySelector(".previous_slide");
const nextBut = document.querySelector(".next_slide");
/// set up current slide number
let currentPosition = 0;
let maxSlides = slides.length;
let offset = 299;
/// check screen width
const deviceScreenWidth = screen.width;
deviceScreenWidth <= 768 ? maxSlides += 2 : maxSlides;
///change style button if it's inactve/active
function updateButtons() {
    currentPosition === 0 ? previousBut.classList.remove('active_btn') : previousBut.classList.add('active_btn');
    currentPosition === maxSlides ? nextBut.classList.remove('active_btn') : nextBut.classList.add('active_btn');
}
////show slides
function showNextSlide() {
    if(currentPosition < maxSlides) {
        currentPosition++;
        document.querySelector(".slider_body").style.transform = `translateX(-${currentPosition * offset}px)`;
    }
    updateButtons();
}

function showPreviousSlide() {
    if(currentPosition > 0) {
        currentPosition--;
        document.querySelector(".slider_body").style.transform = `translateX(-${currentPosition * offset}px)`;
    }
    updateButtons();
}

previousBut.addEventListener('click', showPreviousSlide);
nextBut.addEventListener('click', showNextSlide);

///gifts card popup
async function getGiftData() {
    const res = await fetch('./gifts.json');
    return res.json();
}

const outputCard = document.querySelectorAll('.gifts_list_item');
const modalImg = document.querySelector(".modal_img");

async function showGifts() {
    let giftData = await getGiftData();
    const sortedGiftData = giftData.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < outputCard.length; i++) {
        const output = document.createElement('div');
        output.classList.add('item_description');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        h3.textContent = sortedGiftData[i].name;
        h4.textContent = sortedGiftData[i].category;

        sortedGiftData[i].category === "For Health" ? h4.classList.add('purple') : null;
        sortedGiftData[i].category === "For Harmony" ? h4.classList.add('green') : null; 
        sortedGiftData[i].category === "For Work" ? h4.classList.add('blue') : null; 
    
        output.appendChild(h4);
        output.appendChild(h3);

        outputCard[i].append(output);
        
    }
    // showGiftsCard();
    outputCard.forEach(card => {
        card.addEventListener('click', () => {
            const cardImgSrc = card.querySelector('.gifts_list_item .item_photo img').getAttribute('src');
            const currentCardData = sortedGiftData.find(item => item.name === card.querySelector('h3').textContent);
            // console.log(currentCard);
            showPopupContent(currentCardData, cardImgSrc);
            swichPopup();
        });
    })
}

showGifts();

function swichPopup() {
    const popup = document.querySelector(".popup");
    const body = document.querySelector("body");
    const closeButton = document.querySelector(".close_modal");

    popup.classList.add("open");
    body.classList.add("hidden");

    closeButton.onclick = () => closePopup(popup, body);

    window.onclick = function(e) {
        if(e.target === popup) closePopup(popup, body);
    }
};

function closePopup(popup, body) {
    popup.classList.remove("open");
    body.classList.remove("hidden");
}

function showPopupContent(currentCard, cardImgSrc) {
    modalImg.innerHTML = '';
    modalImg.style.backgroundImage = `url("${cardImgSrc}")`;

    document.querySelector(".modal_main_info h3").textContent = currentCard.name;
    document.querySelector(".modal_main_info h4").textContent = currentCard.category;
    document.querySelector(".modal_main_info p").textContent = currentCard.description;

    getCategoryStyle(currentCard.category);
    
    const superpowersData = document.querySelector('.superpowers');
    superpowersData.innerHTML = '';

    for(const title in currentCard.superpowers){
        const outBlock = document.createElement('li');
        const outTitle = document.createElement('span');
        const outScore = document.createElement('span');
        const starContainer = document.createElement("div");

        outTitle.textContent = title;
        outScore.textContent = currentCard.superpowers[title];

        outBlock.append(outTitle);
        outBlock.append(outScore);
        outBlock.append(starContainer);
        superpowersData.append(outBlock);

        drawStars(currentCard.superpowers[title], starContainer);
    }
};

function getCategoryStyle(currentCard) {
    const categoryBlock = document.querySelector(".modal_main_info h4");
    categoryBlock.className = '';

    switch (currentCard) {
        case "For Health":
          categoryBlock.classList.add('purple');
          break;
        case "For Work":
          categoryBlock.classList.add('blue');
          break;
        case "For Harmony":
          categoryBlock.classList.add('green');
          break;
        default:
          null;
    }
}


function drawStars(number, starContainer) {
    let calculateNumber = number / 100;
    const maxStar = 5;
    starContainer.classList.add('star_block');

    for (let i = 0; i < maxStar; i++) {
        const star = document.createElement('img');
        star.src = './img/star.png';
        star.alt = `star${i + 1}`;
        starContainer.append(star);

        i < calculateNumber ? star.classList.add('star') : star.classList.add('star_opasity');
    }
}

//// TIMER
function updateCountdown() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1); // 1 січня наступного року
    const timeLeft = nextYear - now; // Залишок часу в мілісекундах

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

// Оновлювати таймер кожну секунду
setInterval(updateCountdown, 1000);

// Викликати функцію одразу, щоб не чекати 1 секунду
updateCountdown();
