let path = require('path');
let fs = require('fs');
let docs = require('react-docgen');

let config = require(path.resolve(process.cwd(), 'docgen.config.js'));

function run() {

    let inputPath = config && config.input && config.input.path ?
        path.resolve(process.cwd(), config.input.path) : process.cwd();
    console.log('Input path: ' + inputPath);

    let outputPath = config && config.output && config.output.path ?
        path.resolve(process.cwd(), config.output.path) : process.cwd();
    console.log('Output path: ' + outputPath);

    let data = {
        title: config.title,
        components: {}
    };

    console.log('Start processing components:');

    let count = 0;
    if (config && config.components && config.components instanceof Array) {
        config.components.forEach((v) => {
            let compName = v.name;
            let compPath = path.resolve(inputPath, v.path);
            let compSource = fs.readFileSync(compPath, 'utf8');
            let compInfo = docs.parse(compSource);
            if (compInfo) {
                data.components[compName] = compInfo;
                console.log('    ' + compName);
                count++;
            }
        });
        let docPath = path.resolve(outputPath, 'index.json');
        fs.writeFileSync(docPath, JSON.stringify(data),  'utf8');
    }

    if (count > 0) {
        console.log('Job completed!');
    } else {
        console.log('Components not found!');
    }

}

run();