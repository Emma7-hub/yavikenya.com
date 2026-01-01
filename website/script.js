
        function trackEvent(category, action, label) {
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    'event_category': category,
                    'event_label': label
                });
            }
        }

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            document.getElementById(pageId).classList.add('active');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', {
                    'page_title': pageId,
                    'page_location': window.location.href + '#' + pageId
                });
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }

        function showLesson(lessonId) {
            // Map lesson IDs to page IDs
            const lessonMap = {
                'scratch-1-1': 'lesson-scratch-1-1',
                'scratch-1-2': 'learn', // Will add more lesson pages
                'scratch-1-3': 'learn',
                'web-1-1': 'learn',
                'web-1-2': 'learn',
                'web-1-3': 'learn'
            };
            
            const pageId = lessonMap[lessonId] || 'learn';
            showPage(pageId);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'lesson_view', {
                    'event_category': 'learning',
                    'event_label': lessonId
                });
            }
        }

        function showPaymentModal(planType) {
            const amounts = {
                'monthly': 'KES 3,500',
                'yearly': 'KES 35,000'
            };
            
            const message = `Great choice! You selected the ${planType} plan (${amounts[planType]}).

PAYMENT INSTRUCTIONS:

1. Open M-PESA on your phone
2. Select "Lipa na M-PESA"
3. Select "Buy Goods and Services"
3. Enter: 7249416
4. Amount: ${amounts[planType].replace('KES ', '')}
5. Enter your M-PESA PIN
// 6. Confirm transaction

After payment:
📸 Screenshot your confirmation
💬 WhatsApp to: +254 113 505 651
✉️ Or email: yavi.kenya@gmail.com

We'll activate your account within 1 hour!

Click OK to send payment confirmation via WhatsApp now.`;

            if (confirm(message)) {
                window.open(`https://wa.me/254723720027?text=Hi%20Yavi%20Kenya!%20I%20just%20paid%20${amounts[planType]}%20for%20the%20${planType}%20plan.%20Here's%20my%20confirmation.`, '_blank');
            }
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'payment_initiated', {
                    'event_category': 'conversion',
                    'event_label': planType,
                    'value': planType === 'monthly' ? 3500 : 35000
                });
            }
        }

        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
            trackEvent('navigation', 'mobile_menu_toggle', 'menu');
        }

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const service = document.getElementById('serviceSelect').value;
            trackEvent('form', 'submit', 'contact_form_' + service);
            
            alert('Thank you for your interest! We will contact you within 24 hours.');
            this.reset();
        });

        document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                trackEvent('cta', 'click', buttonText);
            });
        });

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.gallery-overlay p').textContent;
                trackEvent('gallery', 'view', title);
            });
        });
