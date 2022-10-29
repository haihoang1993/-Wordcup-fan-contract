const { NFTStorage, File } = require("nft.storage");
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDEwNDgwQ2U3NjNmNDVhQjFCQ0E5YjE3OUYxNzdFOTIwRjNBODM4MjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA0MDIyNzM2OCwibmFtZSI6IkFwcCJ9.PoPZ-SZPMe7JuWD5cmGk4mUwcLjIhUpLFedE-yMbrAU'
const fs = require('fs');
const axios = require('axios')
const JSONdb = require('simple-json-db');
const db = new JSONdb('./data.json');

async function upFile(fileDir, name) {
    console.log('name:',name)
    const client = new NFTStorage({ token: API_KEY });
    const fileRead = await fs.promises.readFile(fileDir)
    const metaData = await client.store({
        name: name.replace('.png', '') + " NFT",
        description: "",
        image: new File([fileRead], name + ".png", {
            type: "image/png",
        }),
    });
    console.log(metaData)
    let obj= {
        ...metaData, ...{
            name: name.replace('.png', ''),
            metadata: 'https://cloudflare-ipfs.com/ipfs/' + metaData.ipnft + '/metadata.json' 
        }
    }
   const res=  await getMetaData(obj.metadata);
   obj.imageUrl=res.image.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/')
   return obj
}

const getMetaData = async (url='https://cloudflare-ipfs.com/ipfs/bafyreievcfyxnedexgeyumzld6fn36rwzhv7kvo5tzttvd5fb6v7r57ucu/metadata.json') => {
    try {
        const response = await axios.get(url);
        return response.data
      } catch (error) {
        console.error(error);
      }
  };

// module.exports = upFile;
const imagesDir = './resize/2'

async function runApp() {
    const files = fs.readdirSync(imagesDir)
    console.log(files);
    let data=[];
    for (let index = 0; index < files.length; index++) {
        const log = await upFile(imagesDir + "/" + files[index], files[index])
        // console.log('log:', log)
        data.push(log)
    }
    db.set('2',data);
   
}
runApp()