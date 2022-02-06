import { type } from "os"

export type Data = {
    success: boolean,
    data: any
}

export const HEADER_NAME: string = "Weather App"

export const ADD_LOCATION_BUTTON_TEXT = "Show My location"
export const REMOVE_LOCATION_BUTTON_TEXT = "Hide My location"
export const MAP_SELECTION_NAME = "Map selection"

export const VIEW_MAP: Array<string> = [
    "gray-vector","satellite", "hybrid", "terrain", "oceans", "osm", "dark-gray-vector" , "streets-vector", "topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
]

export const VIEW_MAP_STANDARD = 'gray-vector'

export const COLORS: Array<string> = [
    'azure', 'antiquewhite', 'aquamarine', 'gold', 'ghostwhite', 'palegreen'
]

export const COLOR_STANDARD = 'azure'

export const ESRI_POP_UP = '--esri-pop-up-color'

export type Coordinates = {
    lat: number,
    lon: number,
    address?: string
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

export const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
export const WORLD_CITIES = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/";
