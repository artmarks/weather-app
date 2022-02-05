import Head from 'next/head';

import {FaGithub} from 'react-icons/fa'
import { ForecastWeather, HEADER_NAME, Weather } from './generalConstants';


export function Footer(){
    return (
            <footer className="bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center w-full h-[5vh] border-t">
                <a
                    className="flex items-center justify-center"
                    href="https://github.com/artmarks/music-helper"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <div className='text-3xl'><FaGithub/></div>
                </a>
            </footer>
        );
}

export function Header(){
    return ( 
        <Head>
        <title>{HEADER_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://js.arcgis.com/4.21/@arcgis/core/assets/esri/themes/light/main.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://js.arcgis.com/4.11/dijit/themes/claro/claro.css"></link>‍

      </Head>
    );
}

export function interpreteWeather(data: any): Weather | null{
    if(data)
    {
        const weatherArray: Array<any> = data.current.weather
        const descriptionArray: Array<string> = []
        weatherArray.forEach((value)=>{
            descriptionArray.push(value.description)
        })

        const forecastArray: Array<any> = data.daily
        const formattedForecast: Array<ForecastWeather> = []
        forecastArray.forEach((value)=> {
            formattedForecast.push({
                temperatureDay: value.temp.day,
                temperatureMin: value.temp.min,
                temperatureMax: value.temp.max,
                description: "",
                date: format_time(value.dt)
            })
        })

        const weather: Weather = {
            date: format_time(data.current.dt),
            temperature: data.current.temp,
            description: descriptionArray.join(),
            forecast: formattedForecast
        }
        return weather
    }
    return null

}

export function fetchApi(url: string, parameter: string, callback?: Function , callback_error?: Function){
    fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: parameter
      })
      .then((res) => res.json())
      .then((data) => {
        callback ? callback(data.data) : console.log('url:' + url, data.data)
      }).catch((e) => callback_error? callback_error(e) : errorHandler(e)) 
}

export function format_time(s: number): string {
    const dtFormat = new Intl.DateTimeFormat('de-DE', {
      timeStyle: 'medium',
      dateStyle: 'short'
    //   timeZone: 'UTC'
    });
    
    return dtFormat.format(new Date(s * 1e3));
}

//TODO
export function errorHandler(e: any){
    console.log(e)
}

export function round(value: number){
    return Math.round(value * 1000) / 1000;
}

