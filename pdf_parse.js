var pdfParser = require('pdf-parser');
var fs = require('fs');

var PDF_PATH = process.argv[2];

pdfParser.pdf2json(PDF_PATH, function (error, pdf) {
  if(error != null){
    console.log(error);
  }else{
    const texts = pdf.pages
      .sort((a, b) => a.pageId - b.pageId)
      .reduce((acc, page, i) => {
        const updatedTexts = page.texts.slice(0);
        // Update each text entry with its page number
        return [...acc, { page: page.pageId }, ...updatedTexts];
      }, [])
      .map(({ black, bold, color, fontSize, italic, text, page }) =>
        page
          ? { page }
          : {
            highlight: italic || black || bold || color !== "[0,0,0]",
            fontSize,
            text,
          }
      );
    fs.writeFile('./parsed_book.json', JSON.stringify(texts));
  }

});
