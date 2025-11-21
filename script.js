let currentTimer = 'gessing';

function updateTimer() {
    let targetDate;
    switch (currentTimer) {
        case 'tommy':
            targetDate = new Date('2025-02-15T23:26:00+04:00');
            document.getElementById('timerLabel').innerText = 'СУДЬБА ПИЛОТОВ МОЛОДЁЖНЫХ ФОРМУЛ ЗАКРЫТА УЖЕ';
            break;
        case 'steve':
            targetDate = new Date('2025-11-21T19:35:00+07:00');
            document.getElementById('timerLabel').innerText = 'ФОРМУЛА ХУ ЗАКРЫТА УЖЕ:';
            break;
        default:
            targetDate = new Date('2024-12-29T17:00:00+03:00');
            document.getElementById('timerLabel').innerText = 'ГЕССИНГ ЗАКРЫТ УЖЕ';
    }

    const now = new Date();
    let difference = now - targetDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * 1000 * 60;
    const seconds = Math.floor(difference / 1000);

    document.getElementById('timer').innerText = `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;
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

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

setInterval(updateTimer, 1000);
updateTimer();