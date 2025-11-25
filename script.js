let currentTimer = 'gessing';
let animationTriggered = {
    tommy: false,
    gessing: false,
    steve: false,
    saratov: false
};

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }
});

function updateTimer() {
    let targetDate;
    let isCountdown = false;
    
    switch (currentTimer) {
        case 'tommy':
            targetDate = new Date('2025-02-15T23:26:00+04:00');
            document.getElementById('timerLabel').innerText = 'СУДЬБА ПИЛОТОВ МОЛОДЁЖНЫХ ФОРМУЛ ЗАКРЫТА УЖЕ:';
            break;
        case 'steve':
            targetDate = new Date('2025-11-21T19:35:00+07:00');
            document.getElementById('timerLabel').innerText = 'ЗАКРЫТИЕ ФОРМУЛЫ ХУ УЖЕ:';
            break;
        case 'saratov':
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 365);
            targetDate.setHours(8, 0, 0, 0);
            targetDate.setTime(targetDate.getTime() + (4 * 60 * 60 * 1000));
            document.getElementById('timerLabel').innerText = 'ДО ДЕМБЕЛЯ ИЛЬИ \"БРИТАЯ ЖОПА\" АРНДТА ОСТАЛОСЬ:';
            isCountdown = true;
            break;
        default:
            targetDate = new Date('2024-12-29T17:00:00+03:00');
            document.getElementById('timerLabel').innerText = 'ГЕССИНГ ЗАКРЫТ УЖЕ:';
    }

    const now = new Date();
    let difference = isCountdown ? targetDate - now : now - targetDate;

    if (difference < 0) {
        difference = Math.abs(difference);
        if (currentTimer === 'saratov') {
            document.getElementById('timerLabel').innerText = '8 УТРА ПО САРАТОВУ УЖЕ БЫЛО:';
        }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * 1000 * 60;
    const seconds = Math.floor(difference / 1000);

    document.getElementById('timer').innerText = `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;

    if (days >= 365 && !animationTriggered[currentTimer]) {
        triggerFireworks();
        animationTriggered[currentTimer] = true;
    }
}

function setTimerTommy() {
    currentTimer = 'tommy';
    updateTimer();
}

function setTimerGessing() {
    currentTimer = 'gessing';
    updateTimer();
}

function setTimerSteve() {
    currentTimer = 'steve';
    updateTimer();
}

function setTimerSaratov() {
    currentTimer = 'saratov';
    updateTimer();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeToggle.checked = true;
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.checked = false;
    }
}

function triggerFireworks() {
    const container = document.getElementById('fireworks-container');
    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', 
        '#00ffff', '#ff8000', '#8000ff', '#ff0080', '#80ff00',
        '#0080ff', '#ff80ff', '#80ffff', '#ffff80', '#ff8080'
    ];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createFirework(container, colors);
            if (i % 5 === 0) {
                setTimeout(() => createFirework(container, colors), 200);
            }
        }, i * 150);
    }
}

function createFirework(container, colors) {
    const particles = 80 + Math.floor(Math.random() * 40);
    const centerX = Math.random() * window.innerWidth;
    const centerY = Math.random() * window.innerHeight;
    
    createRocket(container, centerX, centerY, colors);
    
    for (let i = 0; i < particles; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'firework';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 15px 3px ${color}`;
            
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 80 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            const size = 4 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const duration = 2 + Math.random() * 1.5;
            particle.style.animationDuration = `${duration}s`;
            
            container.appendChild(particle);
            
            if (Math.random() > 0.7) {
                createTrail(container, centerX, centerY, tx, ty, color);
            }
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration * 1000);
        }, Math.random() * 300);
    }
}

function createRocket(container, startX, startY, colors) {
    const rocket = document.createElement('div');
    rocket.className = 'firework';
    rocket.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    rocket.style.width = '3px';
    rocket.style.height = '3px';
    rocket.style.left = `${startX}px`;
    rocket.style.top = `${window.innerHeight}px`;
    rocket.style.animation = 'none';
    
    container.appendChild(rocket);
    
    const targetY = startY - 100;
    const rocketAnimation = rocket.animate([
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(0, ${targetY - window.innerHeight}px)`, opacity: 0.8 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    rocketAnimation.onfinish = () => {
        if (rocket.parentNode) {
            rocket.parentNode.removeChild(rocket);
        }
    };
}

function createTrail(container, startX, startY, endX, endY, color) {
    const trailParticles = 5 + Math.floor(Math.random() * 8);
    
    for (let i = 0; i < trailParticles; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.backgroundColor = color;
        
        trail.style.left = `${startX}px`;
        trail.style.top = `${startY}px`;
        
        const trailTx = endX * (0.3 + Math.random() * 0.4);
        const trailTy = endY * (0.3 + Math.random() * 0.4);
        
        trail.style.setProperty('--trail-tx', `${trailTx}px`);
        trail.style.setProperty('--trail-ty', `${trailTy}px`);
        
        container.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000); //
    }
}

setInterval(updateTimer, 1000);
updateTimer(); 