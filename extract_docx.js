const fs = require('fs');
const mammoth = require('mammoth');

const filePath = 'C:/Users/neoar/Downloads/vibecodingstart_cleaned.docx';

mammoth.extractRawText({path: filePath})
    .then(function(result){
        const text = result.value;
        console.log(text);
    })
    .catch(function(err){
        console.error(err);
    });
