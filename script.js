document.addEventListener("DOMContentLoaded", () => {
    // رابط إعدادات التطبيق من Google Sheets (نفس المستخدم في التطبيق)
    const CONFIG_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFXODpEcV8pGALaLJH331w85kz8fiDiHm1kQ6qoAItcB04zdCgUIOI1n6d1nK92f2q_Dh-VXO9PoGL/pub?gid=1615039886&single=true&output=csv';

    // استخدام مكتبة PapaParse لقراءة البيانات
    Papa.parse(CONFIG_CSV, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            const config = {};
            // تحويل الجدول إلى كائن (Object)
            results.data.forEach(row => {
                if (row.Key && row.Value) {
                    config[row.Key] = row.Value;
                }
            });

            // تطبيق البيانات على صفحة الهبوط
            applyConfigToDOM(config);
        },
        error: function(err) {
            console.error("حدث خطأ أثناء جلب البيانات من Google Sheets:", err);
        }
    });

    function applyConfigToDOM(config) {
        // تحديث النصوص
        if (config.headerTitle) document.getElementById('site-title').textContent = config.headerTitle;
        if (config.heroTitle) document.getElementById('hero-title').textContent = config.heroTitle;
        if (config.heroSubtitle) document.getElementById('hero-subtitle').textContent = config.heroSubtitle;
        if (config.heroBadge) document.getElementById('hero-badge').textContent = config.heroBadge;
        
        // تحديث صورة الأستاذ
        if (config.heroImage) {
            document.getElementById('hero-image').src = config.heroImage;
        }

        // تحديث أزرار التواصل
        if (config.phone) {
            const waBtn = document.getElementById('whatsapp-btn');
            waBtn.href = `https://wa.me/${config.phone}?text=${encodeURIComponent("مرحباً، أود الاستفسار بخصوص منصة الفيزياء.")}`;
        }
        
        if (config.email) {
            const emailBtn = document.getElementById('email-btn');
            emailBtn.href = `mailto:${config.email}`;
        }
    }
});