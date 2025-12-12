document.addEventListener('DOMContentLoaded', function() {
    // Элементы экранов
    const screens = {
        intro: document.querySelector('.intro-screen'),
        main: document.querySelector('.main-menu'),
        projects: document.querySelector('.projects-screen'),
        social: document.querySelector('.social-screen'),
        telegram: document.querySelector('.telegram-screen'),
        team: document.querySelector('.team-screen'),
        services: document.querySelector('.services-screen')
    };

    // История навигации
    let history = ['intro'];

    // Функция переключения экрана
    function showScreen(screenName) {
        // Скрыть все экраны
        Object.values(screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });

        // Показать нужный экран
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }

        // Добавить в историю
        if (history[history.length - 1] !== screenName) {
            history.push(screenName);
        }
    }

    // Функция возврата назад
    function goBack() {
        if (history.length > 1) {
            history.pop(); // Удалить текущий экран
            const prevScreen = history[history.length - 1];
            showScreen(prevScreen);
        }
    }

    // Запуск вступительной анимации
    setTimeout(() => {
        showScreen('main');
    }, 5000); // 5 секунд для вступительной анимации

    // Обработчики для кнопок главного меню
    document.querySelectorAll('.menu-btn[data-target]').forEach(button => {
        button.addEventListener('click', function() {
            const targetScreen = this.getAttribute('data-target');
            showScreen(targetScreen);
        });
    });

    // Обработчики для кнопок "Назад"
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', goBack);
    });

    // Обработчик для кнопок-ссылок (чтобы они открывались в новой вкладке)
    document.querySelectorAll('a.menu-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            // Для внешних ссылок не добавляем в историю
            if (this.getAttribute('href').startsWith('http')) {
                e.stopPropagation();
            }
        });
    });

    // Пропускаем вступительную анимацию по клику
    screens.intro.addEventListener('click', function() {
        if (history[history.length - 1] === 'intro') {
            showScreen('main');
        }
    });

    // Добавляем анимацию при наведении на кнопки
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Анимация появления кнопок в главном меню
    setTimeout(() => {
        const menuButtons = document.querySelectorAll('.main-menu .menu-btn');
        menuButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
                btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }, 500);
});
