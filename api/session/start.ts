import { VercelRequest, VercelResponse } from '@vercel/node';
import * as path from 'path';
import * as fs from 'fs';

export default (request: VercelRequest, response: VercelResponse) => {
  const { name = 'World' } = request.query;
  response.status(200).send(`Hello ${name}!`);

  // https://vercel.com/support/articles/how-can-i-use-files-in-serverless-functions?query=serverless%20locally
  const certLocation = path.resolve(__dirname, './assets/merchant.io.ionic.ionifits.applepay.pem');
  const cert = fs.readFileSync(certLocation, 'utf-8');

  const keyLocation = path.resolve(__dirname, './assets/applepay.key');
  const key = fs.readFileSync(keyLocation, 'utf-8');
};
