document.addEventListener('DOMContentLoaded', function() {


    window.onload = function() {
        // Activate the animations ruled by CSS
        const logoText = document.getElementById("logo_text");
        logoText.animationPlayState = 'running';

        const logo = document.getElementById('logo');
        logo.style.animationPlayState = 'running';

        // On refresh bring page to the top
        window.onbeforeunload = function () {
            window.scrollTo(0,0);
        }
    }

    const letters = document.querySelectorAll('#spray-container span');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1'; // Makes the letter visible
            letter.style.animationDelay = `${index * 0.5}s`; // Stagger the appearance
        }, index * 200); // Stagger by 200ms intervals
    });

});
