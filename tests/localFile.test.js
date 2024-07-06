const { test, expect } = require('@playwright/test');
const path = require('path');

test('run local file', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../docs/index.html');
  const fileUrl = `file://${filePath}`;

  // Navigate to the local file
  await page.goto(fileUrl);

  // Perform your test actions here
  // For example, check if the page title is correct
  await expect(page).toHaveTitle('Resumeister');

  // Add more assertions and interactions as needed
});

test('run local file and interact with form', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../docs/index.html');
  const fileUrl = `file://${filePath}`;

  await page.goto(fileUrl);

  // Ensure the page is loaded by checking the title or any other element
  await expect(page).toHaveTitle('Resumeister');

  // Skip the introduction
  await page.click('#skip-intro');

  // Input skills
  const skills = ['JavaScript', 'Python', 'CSS', 'HTML', 'Node.js'];
  for (const skill of skills) {
    await page.fill('#skills-input', skill);
    await page.click('#add-skills');
  }
  await page.click('#skills-next');

  // Input education
  const educationEntries = [
    'Bachelor of Science in Computer Science',
    'Master of Science in Software Engineering',
    'Certified Web Developer',
    'Diploma in Information Technology',
    'Online Course in AI and Machine Learning'
  ];
  for (const entry of educationEntries) {
    await page.fill('#education-input', entry);
    await page.click('#add-education');
  }
  await page.click('#education-next');

  // Input experience
  const experiences = [
    'Software Developer at XYZ Corp',
    'Frontend Developer at ABC Inc',
    'Backend Developer at DEF Ltd',
    'Full Stack Developer at GHI LLC',
    'Intern at JKL Startup'
  ];
  for (const experience of experiences) {
    await page.fill('#experience-input', experience);
    await page.click('#add-experience');
  }
  await page.click('#experience-next');

  // Input hobbies
  const hobbies = ['Reading', 'Gaming', 'Hiking'];
  for (const hobby of hobbies) {
    await page.fill('#hobbies-input', hobby);
    await page.click('#add-hobbies');
  }
  await page.click('#hobbies-next');

  // Skip the job ad section
  await page.click('#job-ad-next');

  // Wait for the processing stage to complete
  await page.waitForSelector('#processing-next');
  await page.click('#processing-next');

  // Download the resume
  await page.click('#download-resume');
});