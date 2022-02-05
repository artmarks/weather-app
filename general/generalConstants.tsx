import { type } from "os"

export const HEADER_NAME: string = "Weather App"

export const VIEW_MAP: Array<string> = [
    "satellite", "hybrid", "terrain", "oceans", "osm", "dark-gray-vector", "gray-vector", "streets-vector", "topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
]

export type Coordinates = {
    lat: number,
    lon: number
}

//TODO add more
export type Weather = {
    temperature: number,
    date: string,
    description: string
    forecast: Array<ForecastWeather>
}

export type ForecastWeather = {
    temperatureDay: number,
    temperatureMin: number,
    temperatureMax: number,
    description: string,
    date:string
}