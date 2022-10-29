// const IPFS = require('ipfs-core');
const fs = require('fs');
const imagesDir = './images'
var sizeOf = require('image-size');
const resizeImg = require('resize-img');

async function run() {
    const files = fs.readdirSync(imagesDir)
    console.log(files);
    files.forEach (async element => {
        var dimensions = sizeOf(imagesDir+'/'+element);

        const image = await resizeImg(fs.readFileSync(imagesDir+'/'+element), {
            width: 800,
        });

        const name = element.replace('@4x','')
        fs.writeFileSync('./resize/1/'+name, image);
    });

    // const ipfs =await IPFS.create();
}


run();