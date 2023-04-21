const http = require('http');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

const jsonPath = path.join(__dirname, '..');

const getHTML = () => {
    const templateName = process.argv[2];

    const html = fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-email.html`, 'utf8');
    const data = JSON.parse(fs.readFileSync(`${jsonPath}/Emails/${templateName}/${templateName}-data.json`, 'utf8'));

    const template = Handlebars.compile(html);
    return template(data);
}

const openBrowser = async () => {
    const open = await import('open')
    open.default('http://localhost:8080');
}

http.createServer(function(request, response) {  

    const templateName = process.argv[2];

    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(getHTML());  
    response.end();

    fs.watchFile(`${jsonPath}/Emails/${templateName}/${templateName}-email.html`, () => {
        response.write(getHTML())
    }); 

}).listen('8080');

openBrowser();