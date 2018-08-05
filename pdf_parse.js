var pdfParser = require('pdf-parser');
var fs = require('fs');
var PDF_PATH = 'swd.pdf';

pdfParser.pdf2json(PDF_PATH, function (error, pdf) {
    if(error != null){
        console.log(error);
    }else{
	const texts = pdf.pages.map(page => page.texts);
        // console.log(JSON.stringify(pdf));
	// console.log(texts);
	fs.writeFile('./swd_json.json', JSON.stringify(texts));
    }
});
