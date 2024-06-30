document.addEventListener('DOMContentLoaded', function() {
    const questionText = document.getElementById('question-text');
    const userInput = document.getElementById('user-input');

    // Function to fade out the question text
    function fadeOut(element) {
        element.style.opacity = 0;
        setTimeout(() => {
            element.classList.add('hidden');
            userInput.classList.remove('hidden');
            userInput.style.opacity = 1;
            userInput.focus();
        }, 1000); // Time to match the CSS transition
    }

    // Event listener for click to start the fade out
    questionText.addEventListener('click', () => {
        fadeOut(questionText);
    });
});
