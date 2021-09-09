import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as https from 'https';

export default async (request: VercelRequest, response: VercelResponse) => {
  // https://vercel.com/support/articles/how-can-i-use-files-in-serverless-functions?query=serverless%20locally
  const { readFileSync } = require('fs');
  const { join } = require('path');
  
  const certFile = readFileSync(join(__dirname, 'assets', 'merchant.io.ionic.ionifits.applepay.pem'), 'utf8');
  const keyFile = readFileSync(join(__dirname, 'assets', 'applepay.key'), 'utf8');
  console.log('parsed files');

  try {
    const { validationUrl, body } = request.body;
    const res = await axios.post(validationUrl, body, {
      httpsAgent: new https.Agent({
        cert: certFile,
        key: keyFile,
      }),
    });
    console.log(validationUrl);
    console.log("called apple");
    response.status(200).send(res.data);
  }
  catch (e) {
    console.log(e);
    response.status(200).send(e);
  }
};
