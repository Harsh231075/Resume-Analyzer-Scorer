const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Is pdf a function?', typeof pdf === 'function');
console.log('Keys if object:', typeof pdf === 'object' ? Object.keys(pdf) : 'N/A');

if (typeof pdf === 'function') {
    console.log('Usage test: pdf is a function');
} else if (typeof pdf.default === 'function') {
    console.log('Usage test: pdf.default is a function');
} else {
    console.log('Usage test: Unclear structure');
}
