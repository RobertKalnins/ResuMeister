document.addEventListener('DOMContentLoaded', function() {
    const questionText = document.getElementById('question-text');
    const userInput = document.getElementById('user-input');
    const lessIsMore = document.getElementById('less-is-more');
    
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

    // Function to show "less is more" message temporarily
    function showLessIsMore() {
        lessIsMore.classList.remove('hidden');
        lessIsMore.style.opacity = 1;
        setTimeout(() => {
            lessIsMore.style.opacity = 0;
            setTimeout(() => {
                lessIsMore.classList.add('hidden');
            }, 1000); // Time to match the CSS transition
        }, 2000); // Show for 2 seconds
    }

        
    // Event listener for input to limit characters and shake on overflow
    userInput.addEventListener('input', () => {
        if (userInput.value.length > 70) {
            userInput.value = userInput.value.substring(0, 70);
            userInput.classList.add('shake');
            showLessIsMore();
            setTimeout(() => {
                userInput.classList.remove('shake');
            }, 500); // Duration of the shake animation
        }
    });

});
