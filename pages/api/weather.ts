// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../general/generalConstants';



//TODO more from env.Variable
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const fetchUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
    + req.body.lat +
    '&lon=' + req.body.lng +
    '&lang=' + 'de' +
    '&units=metric&appid=' + process.env.OPENWEATHER_API_KEY;

    fetch( fetchUrl ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json()  )
      .then((data) => {
        res.status(200).json({ success: true, data: data })
        res.end
      }).catch((e) => {
        res.status(500).json({ success: false, data: e.response.data.error_message })
        res.end
      });     
     
}





  