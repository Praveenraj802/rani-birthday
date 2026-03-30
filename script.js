const contentData = {
    parents: {
        images: [
            { url: 'assets/images/parents/parents_real.jpg', caption: 'Thank you for everything, Mom & Dad ❤️' }
        ]
    },
    rani: {
        images: [
            { url: 'assets/images/rani/rani_1.jpg', caption: 'The most beautiful girl in the world ❤️' },
            { url: 'assets/images/rani/rani_2.jpg', caption: 'Shining brighter than the stars' },
            { url: 'assets/images/rani/rani_3.jpg', caption: 'My everything, my love' },
            { url: 'assets/images/rani/rani_4.jpg', caption: 'Every moment with you is magic' },
            { url: 'assets/images/rani/rani_5.jpg', caption: 'I promise to love you forever Rani' }
        ]
    },
    teadys: {
        images: [
            { url: 'assets/images/teadys/teady_1.png', caption: 'A sweet gift for a sweet soul 🧸' },
            { url: 'assets/images/teadys/teady_2.png', caption: 'Sending you soft hugs and love' },
            { url: 'assets/images/teadys/teady_3.png', caption: 'Always here to cheer you up!' }
        ]
    }
};

let currentCategory = '';
let currentSlideIndex = 0;
let slideshowInterval;

// Initialize Background Animations
function initAnimations() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartCount = 40;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
        
        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 8;
        const delay = Math.random() * 5;
        const opacity = 0.3 + Math.random() * 0.5;
        const size = 0.8 + Math.random() * 1.5;

        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}rem`;
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.setProperty('--opacity', opacity);
        heart.style.animationDelay = `${delay}s`;

        heartsContainer.appendChild(heart);
    }
}

// Modal & Slideshow Logic
function openSlideshow(category) {
    currentCategory = category;
    currentSlideIndex = 0;
    
    renderSlides();
    updateSlideDisplay();
    
    const modal = document.getElementById('slideshow-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling
    
    // Auto-advance slideshow
    startSlideshowTimer();
}

function closeSlideshow() {
    const modal = document.getElementById('slideshow-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    clearInterval(slideshowInterval);
}

function renderSlides() {
    const wrapper = document.getElementById('slides-wrapper');
    const dotsContainer = document.getElementById('dots-container');
    const categoryData = contentData[currentCategory];
    
    wrapper.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    categoryData.images.forEach((img, index) => {
        // Create Slide
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        if (index === 0) slideDiv.classList.add('active');
        
        const image = document.createElement('img');
        image.src = img.url;
        image.alt = `Slide ${index + 1}`;
        
        slideDiv.appendChild(image);
        wrapper.appendChild(slideDiv);
        
        // Create Dot
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function updateSlideDisplay() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const caption = document.getElementById('slide-caption');
    const categoryData = contentData[currentCategory];
    
    slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentSlideIndex);
    });
    
    dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentSlideIndex);
    });
    
    // Smooth text transition
    caption.style.opacity = 0;
    setTimeout(() => {
        caption.innerText = categoryData.images[currentSlideIndex].caption;
        caption.style.opacity = 1;
    }, 400);
}

function nextSlide() {
    const categoryData = contentData[currentCategory];
    currentSlideIndex = (currentSlideIndex + 1) % categoryData.images.length;
    updateSlideDisplay();
    resetSlideshowTimer();
}

function prevSlide() {
    const categoryData = contentData[currentCategory];
    currentSlideIndex = (currentSlideIndex - 1 + categoryData.images.length) % categoryData.images.length;
    updateSlideDisplay();
    resetSlideshowTimer();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlideDisplay();
    resetSlideshowTimer();
}

function startSlideshowTimer() {
    slideshowInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
}

function resetSlideshowTimer() {
    clearInterval(slideshowInterval);
    startSlideshowTimer();
}

// Click outside modal to close
window.onclick = function(event) {
    const modal = document.getElementById('slideshow-modal');
    if (event.target == modal) {
        closeSlideshow();
    }
};

// Key controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSlideshow();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});
