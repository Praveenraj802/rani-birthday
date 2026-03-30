// --- Elements ---
const welcomeScreen = document.getElementById('welcome-screen');
const mainScreen = document.getElementById('main-screen');
const startBtn = document.getElementById('start-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const hearts = document.querySelectorAll('.heart-item');
const modal = document.getElementById('message-modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close-btn');
const quizBtns = document.querySelectorAll('.quiz-btn');
const quizResult = document.getElementById('quiz-result');

// --- Screen Transition ---
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    startConfetti();
    // Try to play music automatically if allowed by browser
    bgMusic.play().catch(() => console.log('Autoplay blocked'));
});

// --- Music Player ---
let isPlaying = false;
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Our Song";
    } else {
        bgMusic.play();
        musicBtn.textContent = "⏸ Pause Song";
    }
    isPlaying = !isPlaying;
});

// --- Slideshow ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = n;
    
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

// Auto slideshow
setInterval(() => {
    if(!mainScreen.classList.contains('hidden')) {
        changeSlide(1);
    }
}, 3000);

// --- Hearts Interactive ---
hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        const message = heart.getAttribute('data-message');
        modalText.textContent = message;
        modal.classList.remove('hidden');
        startConfetti(); // tiny burst
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// --- Mini Quiz ---
quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quizBtns.forEach(b => b.style.pointerEvents = 'none'); // disable all
        quizResult.classList.remove('hidden');
        
        if (btn.classList.contains('correct')) {
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = 'white';
            quizResult.textContent = "Exactly! I love you so much! 🎉💖";
            startConfetti();
        } else {
            btn.style.background = '#f44336';
            btn.style.borderColor = '#f44336';
            btn.style.color = 'white';
            quizResult.textContent = "Aww close, but the correct answer is ME! 😊";
        }
    });
});

// --- Confetti Effect ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParts = [];
const colors = ['#ff4d6d', '#ffb3c1', '#ffffff', '#ffd166', '#4ecdc4'];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiParts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParts.forEach((p, index) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
            confettiParts.splice(index, 1);
        }
    });
    
    if (confettiParts.length > 0) {
        requestAnimationFrame(drawConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function startConfetti() {
    createConfetti();
    drawConfetti();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
