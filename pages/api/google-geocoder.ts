// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, } from "@googlemaps/google-maps-services-js";

type Data = {
    success: boolean,
    data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const client = new Client({config:{}});
    client.reverseGeocode({
        params: {
          latlng: {lat: Number(req.body.lat), lng:Number(req.body.lng) },
          key: process.env.GEOCODER_API_KEY! ,
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        res.status(200).json({ success: true, data: [req.body,r.data] })
      })
      .catch((e) => {
        res.status(500).json({ success: false, data: e.response.data.error_message })
      });
     
}





  