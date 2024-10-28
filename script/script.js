import { data } from './data.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.title').innerHTML = item.title;
            document.querySelector('.image').innerHTML = `<img src="${item.image}" alt="${item.title}">`; document.querySelector('.image').src = item.image; 
            document.querySelector('.description').innerHTML = item.desc;
            document.querySelector('.moreInformation').innerHTML = item.moreInfo;
            document.querySelector('.type').innerHTML = item.type === 'buy' ? 'For Sale' : 'For Rent';
        }
    });
}

function loadData() {
    let buyHouse = '';
    let rentHouse = '';
    let buyHouseDesc = '';
    let rentHouseDesc = '';
    data.forEach((item) => {
        const announcement = `
            <div class="list">
                <a href="./desc.html?id=${item.id}">
                    <div class="list-content">
                        <img src="${item.image}" alt="${item.title}" class="list-image">
                        <div class="list-details">
                            <h6>${item.title}</h6>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        if (item.type === 'buy') {
            buyHouse += announcement;
        } else if (item.type === 'rent') {
            rentHouse += announcement;
        }
    });
    data.forEach((item) => {
        const fullDescription = `
            <div class="list">
                <p class="type">${item.type === 'buy' ? 'For Sale' : 'For Rent'}</p>
                <a href="./desc.html?id=${item.id}">
                    <div class="list-content">
                        <img src="${item.image}" alt="${item.title}" class="list-image">
                        <div class="list-details">
                            <h6>${item.title}</h6>
                            <p>${item.desc}</p>
                            <p>${item.moreInfo}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        if (item.type === 'buy') {
            buyHouseDesc += fullDescription;
        } else if (item.type === 'rent') {
            rentHouseDesc += fullDescription;
        }
    });
    const announceBuyElement = document.querySelector('.announceBuy');
    const announceRentElement = document.querySelector('.announceRent');

    if (announceBuyElement) announceBuyElement.innerHTML = buyHouse;
    if (announceRentElement) announceRentElement.innerHTML = rentHouse;

    $(document).ready(() => {
        $('.announceBuy').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            prevArrow: '.prev-buy',
            nextArrow: '.next-buy'
        });    
        $('.announceRent').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            prevArrow: '.prev-rent',
            nextArrow: '.next-rent'
        });
    
        $('.next-buy').on('click', function() {
            $('.announceBuy').slick('slickNext');
        });
        $('.prev-buy').on('click', function() {
            $('.announceBuy').slick('slickPrev');
        });
        $('.next-rent').on('click', function() {
            $('.announceRent').slick('slickNext');
        });
        $('.prev-rent').on('click', function() {
            $('.announceRent').slick('slickPrev');
        });
    });    
}
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    displayProduct();
});
