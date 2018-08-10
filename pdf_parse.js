var pdfParser = require('pdf-parser');
var fs = require('fs');
var PDF_PATH = '50f.pdf';

pdfParser.pdf2json(PDF_PATH, function (error, pdf) {
  if(error != null){
    console.log(error);
  }else{
    const texts = pdf.pages
      .sort((a, b) => a.pageId - b.pageId)
      .reduce((acc, page) => [...acc, ...page.texts], [])
      .map(({ black, bold, color, fontSize, italic, text }) => ({
        black,
        bold,
        color,
        fontSize,
        italic,
        text,
     }));
    fs.writeFile('./50f_json.json', JSON.stringify(texts));
  }

});
