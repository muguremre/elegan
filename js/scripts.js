document.addEventListener('DOMContentLoaded', function() {
    // Sayfa her yüklendiğinde en üste kaydır
    window.scrollTo(0, 0);

    const header = document.getElementById('main-header');
    const mobileNav = document.getElementById('mobile-nav');

    mobileNav.style.width = "0";

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('small');
        } else {
            header.classList.remove('small');
        }
    });

    const productsContainer = document.querySelector('.products');
    const carouselInner = document.querySelector('.carousel-inner');
    const productGrid = document.querySelector('.product-grid');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentPosition = 0;

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const popularProducts = data.popular;
            const allProducts = data.all;

            // Ürünlerin sadece bir kez basılması için mevcut içeriği temizleyelim
            carouselInner.innerHTML = '';
            productGrid.innerHTML = '';

            popularProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                `;
                carouselInner.appendChild(productElement);
            });

            allProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <a href="https://wa.me/905393718906?text=${encodeURIComponent("Bu ürün hakkında bilgi almak istiyorum: " + product.name + " " + window.location.origin + "/" + product.image)}" class="whatsapp-link">Detaylı bilgi için WhatsApp hattı</a>
                `;
                productGrid.appendChild(productElement);
            });

            const totalItems = popularProducts.length;
            const itemsToShow = 3;

            function updateCarousel() {
                const itemWidth = carouselInner.children[0].offsetWidth;
                const totalWidth = itemWidth * totalItems;
                const visibleWidth = itemWidth * itemsToShow;
                const maxOffset = totalWidth - visibleWidth;

                if (currentPosition > maxOffset) {
                    currentPosition = 0;
                } else if (currentPosition < 0) {
                    currentPosition = maxOffset;
                }

                carouselInner.style.transform = `translateX(-${currentPosition}px)`;
            }

            prevButton.addEventListener('click', () => {
                currentPosition -= carouselInner.children[0].offsetWidth;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentPosition += carouselInner.children[0].offsetWidth;
                updateCarousel();
            });

            setInterval(() => {
                nextButton.click();
            }, 3000);
        });

    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        mobileNav.style.width = "50%";
    });

    document.querySelector('.closebtn').addEventListener('click', () => {
        mobileNav.style.width = "0";
    });

    document.querySelectorAll('.mobile-nav a, nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
                mobileNav.style.width = "0";
            }
        });
    });

    ScrollReveal().reveal('#home, #products, #about, #contact', {
        duration: 1000,
        distance: '50px',
        easing: 'ease-in-out',
        origin: 'bottom'
    });

    document.getElementById('logo-link').addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const whatsappLink = document.getElementById('whatsapp-link');
    const whatsappMessage = document.getElementById('whatsapp-message');
    let whatsappClicked = false;

    whatsappLink.addEventListener('click', function(event) {
        event.preventDefault();
        whatsappMessage.classList.add('show');
    });

    whatsappMessage.querySelector('.text').addEventListener('click', function() {
        window.location.href = "https://wa.me/905393718906";
    });

    whatsappMessage.querySelector('.closebtn').addEventListener('click', function() {
        whatsappMessage.classList.remove('show');
    });
});