const FileSystem = require('fs');
const Path = require('path');
const colors = require('colors');


//var extensions = process.arg[2] || "ts"; 

path = process.cwd();

console.log('Strating GenLangFile');
console.log('Searching for files inside '+path);


csvData = "";

function readDirR(dir) {
    return FileSystem.statSync(dir).isDirectory()
        ? Array.prototype.concat(...FileSystem.readdirSync(dir).map(f => readDirR(Path.join(dir, f))))
        : dir;
}

allFiles = readDirR(path);
for(let file of  allFiles)
{
    if( file.split('.').pop() == "html")
    {

        filename = file.split('/').pop();
        console.log('');
        console.log(('+++++++  Searching in file : '+filename+' +++++++').white.bgBlack);
        console.log('');

        //search inside file all occurences of {{lang._('chateaglecar')}}
        var result = FileSystem.readFileSync(file).toString().match(/{{lang(.*?)}}/g);
        if(result) for(let word of result)
        {
            console.log( word.replace("{{lang._('","").replace("')}}","") );
        }
       
        

    }
}
