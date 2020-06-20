const fs = require('fs');
const path = require('path');

    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => (
            //require(path.resolve(__dirname, file)),
            console.log(file+" - Modulo Carregado!!!")
        ))