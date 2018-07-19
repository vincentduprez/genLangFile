const FileSystem = require('fs');
const Path = require('path');
const colors = require('colors');


function readDirR(dir) {
    return FileSystem.statSync(dir).isDirectory()
        ? Array.prototype.concat(...FileSystem.readdirSync(dir).map(f => readDirR(Path.join(dir, f))))
        : dir;
}


path = process.cwd();
CSV = "";
antiDuplicateKeys = []

console.log('Starting GenLangFile');



    answer = "english,french,spanish,italian,german";
    console.log(answer);
    var languages = answer.toString().split(',');
    var csvline = Array(languages.length+1).fill('""');

    //headerline
    line = '""';
    for(let lang of languages) line +=',"'+lang+'"';
    CSV += line+`
`;

    //search all compatible files
    console.log('Searching for files inside '+path);
    allFiles = readDirR(path);

    for(let file of  allFiles)
    {
        if( file.split('.').pop() == "html")
        {

            filename = file.split('/').pop();
            console.log('');console.log(('+++++++  Searching in file : '+filename+' +++++++').white.bgBlack);console.log('');
            csvline.fill('""'); csvline[1] = '"----- '+filename+' -----"'; 
            CSV += csvline.join(',')+`
`;
            csvline.fill('""');


            //search inside file all occurences of {{lang._('chateaglecar')}}
            var result = FileSystem.readFileSync(file).toString().match(/{{lang(.*?)}}/g);
            if(result) for(let match of result)
            {
                var key = match.replace("{{lang._('","").replace("')}}","") ;

                //check for duplicates
                if(antiDuplicateKeys.indexOf(key) == -1)
                {
                    antiDuplicateKeys.push(key);
                    //check spaces
                    if(key.indexOf(' ') == -1)
                    {
                        console.log(("➡ "+key).grey);
                        csvline[0] = '"'+key+'"';
                        CSV += csvline.join(',')+`
`;
                    }
                    else console.log(("➡ "+key).bgRed.white);

                }
                else console.log(("➡ "+key).blue);
                
            }

            

        }
    }


//write to file
FileSystem.writeFile("genlangfileout.csv", CSV, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Finished, csv file genlangfileout.csv saved");
}); 








