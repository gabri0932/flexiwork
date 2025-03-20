        // JavaScript para las preguntas frecuentes
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = answer.style.display === 'block';
                
                answer.style.display = isOpen ? 'none' : 'block';
                
                // Rotate arrow icon
                const arrow = question.querySelector('svg');
                arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
            });
        });
        
        // Ocultar todas las respuestas inicialmente
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.display = 'none';
        });