// Function to add multi-line text with optional bullet points
function addMultilineText(doc, textArray, bullet = false, isBold = false) {
    if (isBold) {
        doc.font('Helvetica-Bold');
    } else {
        doc.font('Helvetica');
    }
    doc.fontSize(12);
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
}

// Function to create and download PDF document
function generatePdf() {

    const skills = JSON.parse(localStorage.getItem('Skills')) || [];
    const education = JSON.parse(localStorage.getItem('Education')) || [];
    const experience = JSON.parse(localStorage.getItem('Experience')) || [];
    const hobbies = JSON.parse(localStorage.getItem('Hobbies')) || [];

    // Create a new PDF document with customized margins and page size
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = doc.pipe(blobStream());

    // Set a uniform font for the entire document
    doc.font('Helvetica');

    // Header with name and contact info, emphasized at the top
    doc.fontSize(15).font('Helvetica-Bold').text('Your Name', { align: 'center' });
    doc.fontSize(10).font('Helvetica').text('Address | Email | Phone', { align: 'center' });
    doc.moveDown(1);

    // Add a section header with a colored vector line
    const addSectionHeader = (doc, title) => {
        doc.moveDown(0.5);
        doc.fontSize(13).font('Helvetica-Bold').text(title, { continued: false });
        doc.strokeColor('#800020') // Burgundy color hex code
            .lineWidth(1)
            .moveTo(doc.page.margins.left, doc.y)
            .lineTo(doc.page.width - doc.page.margins.right, doc.y)
            .stroke();
        doc.moveDown(2);
    };

    // Sections with headers, with emphasis based on heatmap data
    const sections = {
        'Professional Summary': ["Trail data","Trial data"],
        'Experience': experience,
        'Education': education,
        'Skills': skills,
        'Hobbies': hobbies
    };

    // Applying bold to titles and company names, as these are often looked at first
    Object.keys(sections).forEach(section => {
        addSectionHeader(doc, section);
        const isBoldSection = section === 'Experience' || section === 'Education';
        const bulletPoints = section === 'Skills' || section === 'Experience';
        addMultilineText(doc, sections[section], bulletPoints, isBoldSection);
    });

    // Finalize the PDF and ensure proper closure of the document
    doc.end();

    // Handle the stream and download the PDF
    stream.on('finish', function() {
        const url = stream.toBlobURL('application/pdf');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}