'use strict';
const https = require('https');

function getBase64ImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = [];
      
      // Collect chunks of data
      response.on('data', (chunk) => {
        data.push(chunk);
      });
      
      // Once data is fully received
      response.on('end', () => {
        // Combine all the chunks into a Buffer
        const buffer = Buffer.concat(data);
        
        resolve(buffer);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

module.exports.handle = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      time: Date.now() 
    }),
  };
  let queryString = event.queryStringParameters
  let url = queryString.url
  const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");
  const client = new TextractClient({
  region: "eu-west-1",
  }),

  console.log(client)
  console.log(event.queryStringParameters)
  url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJOpBYrGMw7848pqUEFBTkJVcyvFIZufGgNQ&s"
  getBase64ImageFromUrl(url).then(async base64 => {
    const input = { // AnalyzeDocumentRequest
      Document: { // Document
        Bytes: Buffer.from(base64), // e.g. Buffer.from("") or new TextEncoder().encode("")
      },
      FeatureTypes: [ // FeatureTypes // required
        "FORMS",
      ],
    };
    const command = new AnalyzeDocumentCommand(input);
    console.log(command)
    try{
      const response = await client.send(command);
      const blocks = response.Blocks
      let string = ""
      blocks.forEach(block =>{
        let type = block.BlockType
        if(type == "WORD"){
          string += block.Text
        }
      })
      console.log(string)
      return {
        statusCode: 400,
        body: JSON.stringify({
          text: string
        }),
      };

    }
    catch (error){
      console.log(error)
    }

  }).catch(err => {
    console.error('Error:', err);
  });
};

