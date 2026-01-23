// welcome.js

document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات تفاعلية للبطاقات
    const features = document.querySelectorAll('.feature');
    const services = document.querySelectorAll('.service');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    services.forEach(service => {
        service.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        service.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // تأثير الكتابة للنص الترحيبي
    const welcomeMessage = document.querySelector('.welcome-message');
    const originalText = welcomeMessage.textContent;
    
    // إضافة تأثيرات للخلفية
    const bgAnimation = document.querySelector('.background-animation');
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.width = Math.random() * 30 + 10 + 'px';
        element.style.height = element.style.width;
        element.style.background = `radial-gradient(circle, 
            rgba(${Math.random() * 100}, ${Math.random() * 255}, 255, 0.1), 
            transparent)`;
        element.style.borderRadius = '50%';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = '100%';
        element.style.zIndex = '-1';
        element.style.pointerEvents = 'none';
        
        document.body.appendChild(element);
        
        // حركة عائمة
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        element.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: `translateY(-100vh) rotate(${Math.random() * 360}deg)`, opacity: 0.3 },
            { transform: `translateY(-100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'linear'
        });
        
        // إزالة العنصر بعد الانتهاء
        setTimeout(() => {
            element.remove();
        }, (duration + delay) * 1000);
    }
    
    // إنشاء عناصر عائمة بشكل دوري
    setInterval(createFloatingElement, 1000);
    
    // تأثيرات دخول عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة جميع العناصر المهمة
    document.querySelectorAll('.feature, .service, .welcome-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
