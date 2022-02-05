import { interpreteWeather } from "./general"
import { Weather } from "./generalConstants"

export function WeatherInformation(data: any): JSX.Element{
    const weatherInfo = interpreteWeather(data.data)
    if(weatherInfo){
        return (
            <div className="flex flex-col p-2 max-h-36 max-w-md overflow-y-scroll">
                <div className="p-2 border-2 border-green-200 rounded-md">
                    <div>{weatherInfo.date}</div>
                    <div>Temp: {weatherInfo.temperature}°</div>
                    <div>Description: {weatherInfo.description}</div>
                </div>
                <WeatherForecast {...weatherInfo}/>
                
            </div>
        )
    }else{
        return (
            <div>
                <div className="text-lg text-orange-300">No current weather information</div>
            </div>
        )
    }

}

export function WeatherForecast(weatherInfo: Weather){
    if(weatherInfo.forecast.length > 0){
        return (
            <div className="p-2 flex flex-col my-2 border-2 border-blue-200 rounded-md">
                <div>Forecast:</div>
                {weatherInfo.forecast.map((value,key)=> {
                    return(
                        <div key={key}>
                            <div>{value.date}</div>
                            <div>{value.description}</div>
                            <div>day temperature: {value.temperatureDay}</div>
                            <div>temperature from {value.temperatureMin}° to {value.temperatureMax}°</div>
                        </div>
                    )
                })}
            </div>
        )
    }else{
        return (<div>No forecast availabe</div>)
    }
    
}