// Carousel functionality
let currentIndex = 0;
let products = [];

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        
        if (products.length === 0) {
            displayEmptyState();
            return;
        }
        
        renderCarousel();
        updateIndicators();
    } catch (error) {
        console.error('Error loading products:', error);
        displayErrorState();
    }
}

// Display empty state when no products
function displayEmptyState() {
    const wrapper = document.getElementById('carouselWrapper');
    wrapper.innerHTML = `
        <div class="carousel-loading">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎮</div>
            <p style="font-size: 1.2rem;">No games available yet!</p>
            <p style="margin-top: 0.5rem;">Check back soon for exciting educational games.</p>
        </div>
    `;
    document.querySelector('.carousel-controls').style.display = 'none';
}

// Display error state
function displayErrorState() {
    const wrapper = document.getElementById('carouselWrapper');
    wrapper.innerHTML = `
        <div class="carousel-loading">
            <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
            <p style="font-size: 1.2rem;">Unable to load games</p>
            <p style="margin-top: 0.5rem;">Please try again later.</p>
        </div>
    `;
}

// Render carousel cards
function renderCarousel() {
    const wrapper = document.getElementById('carouselWrapper');
    wrapper.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = createCard(product, index);
        wrapper.appendChild(card);
    });
    
    updateCardPositions();
}

// Create a single card element
function createCard(product, index) {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.dataset.index = index;
    
    const imageElement = product.screenshot 
        ? `<img src="${product.screenshot}" alt="${product.name} screenshot">`
        : `🎮`;
    
    card.innerHTML = `
        <div class="card-image">
            ${imageElement}
        </div>
        <div class="card-content">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-description">${product.description || 'An educational game from Edu Games Academy'}</p>
            <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                Play Now →
            </a>
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (index !== currentIndex) {
            goToSlide(index);
        }
    });
    
    return card;
}

// Update card positions based on current index
function updateCardPositions() {
    const cards = document.querySelectorAll('.carousel-card');
    
    cards.forEach((card, index) => {
        card.classList.remove('active', 'next', 'prev', 'hidden');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex + 1) % products.length) {
            card.classList.add('next');
        } else if (index === (currentIndex - 1 + products.length) % products.length) {
            card.classList.add('prev');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Navigate to next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % products.length;
    updateCardPositions();
    updateIndicators();
}

// Navigate to previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateCardPositions();
    updateIndicators();
}

// Go to specific slide
function goToSlide(index) {
    currentIndex = index;
    updateCardPositions();
    updateIndicators();
}

// Update indicator dots
function updateIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    indicatorsContainer.innerHTML = '';
    
    products.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
}

// Auto-play carousel
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Setup controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        }
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    const carouselWrapper = document.getElementById('carouselWrapper');
    carouselWrapper.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper.addEventListener('mouseleave', startAutoplay);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
