function generatePDF() {
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());

    const skills = JSON.parse(localStorage.getItem('Skills')) || [];
    const education = JSON.parse(localStorage.getItem('Education')) || [];
    const experience = JSON.parse(localStorage.getItem('Experience')) || [];
    const hobbies = JSON.parse(localStorage.getItem('Hobbies')) || [];

    doc.fontSize(20).text('Resume', { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text('Skills');
    doc.fontSize(12).text(skills.join(', '), { indent: 20 });
    doc.moveDown();

    doc.fontSize(16).text('Education');
    education.forEach(item => {
        doc.fontSize(12).text(item, { indent: 20 });
        doc.moveDown();
    });

    doc.fontSize(16).text('Experience');
    experience.forEach(item => {
        doc.fontSize(12).text(item, { indent: 20 });
        doc.moveDown();
    });

    doc.fontSize(16).text('Hobbies');
    doc.fontSize(12).text(hobbies.join(', '), { indent: 20 });
    doc.moveDown();

    doc.end();

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
