// loading.js

document.addEventListener('DOMContentLoaded', function() {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingText = document.querySelector('.loading-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loadingProgress.style.width = `${progress}%`;
        loadingPercentage.textContent = `${progress}%`;
        
        // تغيير النص عند نقاط معينة
        if (progress === 30) {
            loadingText.textContent = 'جاري تحميل الملفات...';
        } else if (progress === 60) {
            loadingText.textContent = 'جاري تهيئة النظام...';
        } else if (progress === 85) {
            loadingText.textContent = 'جاري تحميل الواجهة...';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            loadingText.textContent = 'اكتمل التحميل!';
            
            // الانتقال إلى صفحة الترحيب بعد ثانيتين
            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 2000);
        }
    }, 50); // كل 50ms تزيد 1%
    
    // إضافة تأثيرات عشوائية للجسيمات
    const particlesContainer = document.querySelector('.background-effects');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 20;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.1 + 0.05;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
        
        // إزالة الجسيم بعد انتهاء الحركة
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }
    
    // إنشاء جسيمات بشكل دوري
    setInterval(createParticle, 1000);
    createParticle(); // جسيم أولي
});
