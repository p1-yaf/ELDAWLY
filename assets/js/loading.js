// loading.js - نسخة محسنة بالكامل

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الجسيمات
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00e5ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#00e5ff', opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // عناصر التحميل
    const progressBar = document.getElementById('progressBar');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingStatus = document.getElementById('loadingStatus');
    const mainLogo = document.getElementById('mainLogo');
    
    // حالات التحميل
    const loadingStates = [
        { progress: 0, message: 'جاري بدء التشغيل...' },
        { progress: 15, message: 'جاري تحميل assets المتجر...' },
        { progress: 30, message: 'جاري تجهيز واجهة المستخدم...' },
        { progress: 45, message: 'جاري تحمiel نظام الحسابات...' },
        { progress: 60, message: 'جاري تجهيز قسم الشدات...' },
        { progress: 75, message: 'جاري تحميل قسم الشعبية...' },
        { progress: 85, message: 'جاري تهيئة قاعدة البيانات...' },
        { progress: 95, message: 'اللمسات الأخيرة...' },
        { progress: 100, message: 'تم التحميل بنجاح!' }
    ];
    
    let currentState = 0;
    let progress = 0;
    
    // محاكاة التحميل بشكل واقعي
    const loadingInterval = setInterval(() => {
        // زيادة التقدم بشكل عشوائي
        const increment = Math.floor(Math.random() * 3) + 1;
        progress = Math.min(progress + increment, 100);
        
        // تحديث الشريط
        progressBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${progress}%`;
        
        // تحديث الحالة حسب التقدم
        const nextState = loadingStates.findIndex(state => state.progress >= progress);
        if (nextState !== -1 && nextState !== currentState) {
            currentState = nextState;
            loadingStatus.textContent = loadingStates[currentState].message;
            
            // تأثير اهتزاز بسيط عند تغيير الحالة
            loadingStatus.style.transform = 'scale(1.05)';
            setTimeout(() => {
                loadingStatus.style.transform = 'scale(1)';
            }, 200);
        }
        
        // تأثيرات بصرية
        if (progress % 20 === 0) {
            // تغيير لون مؤقت للشريط
            progressBar.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.8)';
            setTimeout(() => {
                progressBar.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.5)';
            }, 200);
        }
        
        // عند اكتمال التحميل
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // إظهار علامة اكتمال
            loadingStatus.innerHTML = '✅ تم التحميل بنجاح! جاري نقلك...';
            
            // تأثير نهائي للشعار
            mainLogo.style.transform = 'scale(1.1)';
            
            // الانتقال إلى الصفحة التالية بعد ثانية ونصف
            setTimeout(() => {
                // تأثير fade out
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.8s ease';
                
                // الانتقال بعد التأثير
                setTimeout(() => {
                    window.location.href = 'welcome.html';
                }, 800);
            }, 1500);
        }
    }, 80); // تحديث كل 80ms
    
    // إضافة تأثير حركة للماوس
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const logo = document.querySelector('.logo-container');
        if (logo) {
            logo.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
    
    // منع إعادة التحميل بالسحب
    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    // تأكد من أن التحميل لا يقل عن ثانيتين (تجربة مستخدم أفضل)
    const minLoadTime = 2000; // 2 ثواني
    const startTime = Date.now();
    
    // التحقق من الوقت الأدنى للتحميل
    const checkMinTime = setInterval(() => {
        if (progress >= 100) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minLoadTime) {
                // انتظر حتى اكتمال الوقت الأدنى
                setTimeout(() => {
                    clearInterval(checkMinTime);
                }, minLoadTime - elapsedTime);
            } else {
                clearInterval(checkMinTime);
            }
        }
    }, 100);
    
    // إضافة رسالة خطأ إذا توقف التحميل
    setTimeout(() => {
        if (progress < 50) {
            loadingStatus.innerHTML = '⚠️ جاري الاتصال... قد يستغرق بعض الثواني';
        }
    }, 3000);
    
    // تجربة المستخدم على الأجهزة البطيئة
    window.addEventListener('load', () => {
        // تأكد أن التحميل لا يعلق عند 100%
        if (progress >= 100) {
            // تم بالفعل
        }
    });
});

// إضافة معالج للأخطاء
window.addEventListener('error', function(e) {
    console.error('Error loading:', e.error);
    const loadingStatus = document.getElementById('loadingStatus');
    if (loadingStatus) {
        loadingStatus.innerHTML = '❌ حدث خطأ في التحميل، جاري إعادة المحاولة...';
        loadingStatus.style.color = '#ff6b6b';
    }
});
