import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {  
  response.status(200).send({
    processed: true,
    transactionId: 1337
  });
};
