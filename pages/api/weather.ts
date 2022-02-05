// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    success: boolean,
    data: any
}

//TODO de as env.Variable
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    let dataParam = null;
    console.log('testi weather')

    // const text = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    //  req.body.lat +
    // '&lon=' + req.body.lng +
    // '&lang=' + 'de' +
    // '&units=metric&appid=' + process.env.OPENWEATHER_API_KEY;
    // console.log('mmh', text)

    // fetch('http://api.openweathermap.org/data/2.5/weather?lat='
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
      + req.body.lat +
      '&lon=' + req.body.lng +
      '&lang=' + 'de' +
      '&units=metric&appid=' + process.env.OPENWEATHER_API_KEY ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json()  )
      .then((data) => {
        console.log('testiWeather',data)
        // dataParam = data
      res.status(200).json({ success: true, data: data })

      })     
      // res.status(200).json({ success: true, data: ['test',dataParam] })
     
}





  