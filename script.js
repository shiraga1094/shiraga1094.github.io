// 語言文本內容
const translations = {
    zh: {
        title: 'Shiraga1094的網站',
        navAbout: '關於我',
        navPortfolio: '作品集',
        navContact: '聯絡方式',
        heroDesc: '熱衷學習，更愛資訊領域。<br>持續在程式設計與演算法的道路上精進。',
        footerText: '© 2024 Shiraga1094. 版權所有。'
    },
    en: {
        title: "Shiraga1094's Website",
        navAbout: 'About',
        navPortfolio: 'Portfolio',
        navContact: 'Contact',
        heroDesc: 'Passionate about learning, especially in the field of computer science.<br>Continuously improving in programming and algorithms.',
        footerText: '© 2024 Shiraga1094. All rights reserved.'
    },
    ja: {
        title: 'Shiraga1094のウェブサイト',
        navAbout: '私について',
        navPortfolio: 'ポートフォリオ',
        navContact: 'お問い合わせ',
        heroDesc: '学習に情熱を持ち、特に情報分野が大好きです。<br>プログラミングとアルゴリズムの道を歩み続けています。',
        footerText: '© 2024 Shiraga1094. 全著作権所有。'
    },
    id: {
        title: 'Website Shiraga1094',
        navAbout: 'Tentang',
        navPortfolio: 'Portofolio',
        navContact: 'Kontak',
        heroDesc: 'Passionate belajar, khususnya ilmu komputer.<br>Terus berkembang dalam programming dan algoritma.',
        footerText: '© 2024 Shiraga1094. Hak cipta dilindungi.'
    }
};

let currentLang = 'zh';

// 語言切換功能
function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // 更新按鈕狀態
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
    
    // 切換內容組
    document.querySelectorAll('.content-group').forEach(group => {
        group.classList.remove('active');
    });
    document.querySelectorAll(`.content-group.${lang}`).forEach(group => {
        group.classList.add('active');
    });
    
    // 更新單獨的文本元素
    const texts = translations[lang];
    document.title = texts.title;
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : lang;
    
    document.getElementById('nav-about').textContent = texts.navAbout;
    document.getElementById('nav-portfolio').textContent = texts.navPortfolio;
    document.getElementById('nav-contact').textContent = texts.navContact;
    document.getElementById('hero-desc').innerHTML = texts.heroDesc;
    document.getElementById('footer-text').textContent = texts.footerText;
}

// 載入動畫控制
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 3000);
});

// 滾動觸發動畫
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // 觸發子元素動畫
            const cards = entry.target.querySelectorAll('.ability-card');
            const infoItems = entry.target.querySelectorAll('.info-item');
            const portfolioItems = entry.target.querySelectorAll('.portfolio-item');
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 600);
            });
            
            infoItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
            
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// 觀察所有區段
document.querySelectorAll('.about-section, .portfolio-section, .contact-section').forEach(section => {
    sectionObserver.observe(section);
});

// 平滑滾動
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

// 導航欄滾動效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(241, 217, 195, 0.98)';
    } else {
        navbar.style.background = 'rgba(241, 217, 195, 0.95)';
    }
});

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch(e.key) {
            case '1':
                switchLanguage('zh');
                break;
            case '2':
                switchLanguage('en');
                break;
            case '3':
                switchLanguage('ja');
                break;
            case '4':
                switchLanguage('id');
                break;
        }
    }
});