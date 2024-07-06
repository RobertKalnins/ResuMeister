/* Commenting out old code instead of deleting because I love the style and /
will want to replicate some of it

    const questionText = document.getElementById('question-text');
    const userInput = document.getElementById('user-input');
    const lessIsMore = document.getElementById('less-is-more');
    const nextButton = document.getElementById('next-button');
    const countSpan = document.getElementById('count');
    const clearButton = document.getElementById('clear-button');

    let inputs = JSON.parse(localStorage.getItem('inputs')) || [];

    // Update the count display
    function updateCount() {
        countSpan.textContent = inputs.length;
        if (inputs.length >= 5) {
            nextButton.classList.remove('hidden');
            nextButton.style.display = 'inline-block';
        } else {
            nextButton.classList.add('hidden');
            nextButton.style.display = 'none';
        }
    }

    updateCount();

    // Function to clear input
    function clear() {
        inputs = [];
        localStorage.removeItem('inputs');
        updateCount();
    }

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

    // Event listener for Enter key to save the input
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            inputs.push(userInput.value.trim());
            localStorage.setItem('inputs', JSON.stringify(inputs));
            userInput.value = '';
            updateCount();
        }
    });

    // Event listener for "Next" button click
    nextButton.addEventListener('click', () => {
        localStorage.setItem('Skills', JSON.stringify(inputs));
        clear();
    });

    // Event listener for "Clear" button click
    clearButton.addEventListener('click', () => {
        clear();
    });
}); */