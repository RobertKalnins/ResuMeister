const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to read file contents
function readFileContents(path) {
    return fs.readFileSync(path, 'utf8');
}

// Function to add multi-line text with optional bullet points
function addMultilineText(doc, textArray, bullet = false, isBold = false) {
    if (isBold) {
        doc.font('Helvetica-Bold');
    } else {
        doc.font('Helvetica');
    }

    textArray.forEach(line => {
        line = line.trim(); // Trim each line to avoid unwanted whitespace
        if (line.length > 0) { // Only add non-empty lines
            if (bullet) {
                line = `• ${line}`;
            }
            doc.text(line, { align: 'left' });
            doc.moveDown(0.5); // Increase the line spacing
        }
    });
    //doc.moveDown(1);
}

// Create a new PDF document with customized margins and page size
const resumeDoc = new PDFDocument({ margin: 50, size: 'A4' });
resumeDoc.pipe(fs.createWriteStream('resume.pdf'));

// Set a uniform font for the entire document
resumeDoc.font('Helvetica');

// Header with name and contact info, emphasized at the top
resumeDoc.fontSize(15).font('Helvetica-Bold').text('Your Name', { align: 'center' });
resumeDoc.fontSize(10).font('Helvetica').text('Address | Email | Phone', { align: 'center' });
resumeDoc.moveDown(1);

// Add a section header with a colored vector line
const addSectionHeader = (doc, title) => {
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica-Bold').text(title, { continued: false });
    doc.strokeColor('#800020') // Burgundy color hex code
    .lineWidth(1)
    // Move to the starting point of the line (left margin)
    .moveTo(doc.page.margins.left, doc.y)
    // Draw line to the ending point (right margin)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke();
    doc.moveDown(2);
};

// Sections with headers, with emphasis based on heatmap data
const sections = {
    'Professional Summary': readFileContents('./ProfessionalSummary.txt').split('\n'),
    'Experience': readFileContents('./Experience.txt').split('\n'),
    'Education': readFileContents('./Education.txt').split('\n'),
    'Skills': readFileContents('./Skills.txt').split('\n')
};

// Applying bold to titles and company names, as these are often looked at first
Object.keys(sections).forEach(section => {
    addSectionHeader(resumeDoc, section);
    const isBoldSection = section === 'Experience' || section === 'Education';
    const bulletPoints = section === 'Skills' || section === 'Experience';
    addMultilineText(resumeDoc, sections[section], bulletPoints, isBoldSection);
});

// Finalize the PDF and ensure proper closure of the document
resumeDoc.end();

/*
// Create a new PDF document with customized margins and page size for the cover letter
const coverDoc = new PDFDocument({ margin: 50 });
coverDoc.pipe(fs.createWriteStream('coverletter.pdf'));

// Set up fonts and sizes for the cover letter
coverDoc.font('Helvetica');
// Title 'Cover Letter' no longer underlined, adding a line for visual separation
coverDoc.fontSize(16).font('Helvetica-Bold').text('Cover Letter', { align: 'center' });
// Draw a line under the header
coverDoc.strokeColor('#800020').lineWidth(1).moveTo(100, coverDoc.y).lineTo(500, coverDoc.y).stroke();
coverDoc.moveDown(2);

// Setting font back to normal for the body text
coverDoc.fontSize(11).font('Helvetica');

// Read content from the cover letter file
const coverLetterText = readFileContents('./coverletter.txt');
// Adjust multi-line text for the cover letter to match heatmap attention areas
addMultilineText(coverDoc, coverLetterText.split('\n'));

// Enhance the closing signature with bold text
coverDoc.moveDown(1);
coverDoc.fontSize(11).font('Helvetica-Bold').text('Sincerely,', { align: 'left' });
coverDoc.moveDown(0.5);
coverDoc.text('John Doe', { align: 'left' });
// Contact info not bolded, same font size
coverDoc.fontSize(11).font('Helvetica').text('john.doe@example.com', { align: 'left' });

// Finalize Cover Letter PDF
coverDoc.end();
*/