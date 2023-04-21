var http = require('http');
var fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');



const main = async () => {
    const open= await import('open');
    const PORT=8080; 
    const templateName = process.argv[2];

    const jsonPath = path.join(__dirname, '..');
    const html = fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-email.html`, 'utf8');
    const data = JSON.parse(fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-data.json`, 'utf8'));

    const template = Handlebars.compile(html);
    const htmlToSend = template(data);

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(htmlToSend);  
        response.end();
    }).listen(PORT);

    open.default('http://localhost:8080');
}

main()