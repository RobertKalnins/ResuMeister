document.addEventListener('DOMContentLoaded', function() {
    const stages = document.querySelectorAll('.stage');
    let currentStageIndex = 0;

    function showStage(index) {
        stages.forEach((stage, i) => {
            stage.classList.toggle('active-stage', i === index);
        });
    }

    function nextStage() {
        if (currentStageIndex < stages.length - 1) {
            currentStageIndex++;
            showStage(currentStageIndex);
        }
    }

    function recordDetails(section, limit, linesPerEntry, isWordLimit) {
        let entries = [];

        function updateEntriesList() {
            const entriesList = document.getElementById(`${section}-list`);
            entriesList.innerHTML = entries.map(entry => `<li>${entry}</li>`).join('');
            const nextButton = document.getElementById(`${section}-next`);
            nextButton.disabled = entries.length < limit;
        }

        document.getElementById(`add-${section}`).addEventListener('click', function() {
            const input = document.getElementById(`${section}-input`).value.trim() || `Default ${section}`;
            const isValid = isWordLimit
                ? input.split(' ').length <= linesPerEntry
                : input.length <= linesPerEntry * 70;

            if (isValid) {
                entries.push(input);
                document.getElementById(`${section}-input`).value = '';
                updateEntriesList();
            } else {
                alert(`Please enter ${isWordLimit ? 'up to' : 'no more than'} ${linesPerEntry} ${isWordLimit ? 'words' : 'characters'} per entry.`);
            }
        });

        document.getElementById(`${section}-next`).addEventListener('click', function() {
            localStorage.setItem(section.charAt(0).toUpperCase() + section.slice(1), JSON.stringify(entries));
            nextStage();
        });

        // Automatically add default values for debugging
        for (let i = 0; i < limit; i++) {
            const input = `Default ${section} ${i + 1}`;
            entries.push(input);
        }
        updateEntriesList();
    }

    recordDetails('skills', 5, 1, false);
    recordDetails('education', 5, 2, false);
    recordDetails('experience', 5, 2, false);
    recordDetails('hobbies', 5, 1, true);

    document.getElementById('skip-intro').addEventListener('click', nextStage);
    document.getElementById('job-ad-next').addEventListener('click', nextStage);
    document.getElementById('processing-next').addEventListener('click', function() {
        nextStage();
        displayResults();
    });

    function displayResults() {
        const skills = JSON.parse(localStorage.getItem('Skills')) || [];
        const education = JSON.parse(localStorage.getItem('Education')) || [];
        const experience = JSON.parse(localStorage.getItem('Experience')) || [];
        const hobbies = JSON.parse(localStorage.getItem('Hobbies')) || [];

        document.getElementById('results-list').innerHTML = `
            <li>Skills: ${skills.join(', ')}</li>
            <li>Education: ${education.join(', ')}</li>
            <li>Experience: ${experience.join(', ')}</li>
            <li>Hobbies: ${hobbies.join(', ')}</li>
        `;
    }

    showStage(currentStageIndex);
});
