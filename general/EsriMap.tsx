import React, { useRef, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Locate from "@arcgis/core/widgets/Locate";

import { locationToAddress } from "@arcgis/core/rest/locator";
import { ADD_LOCATION_BUTTON_TEXT, COLORS, COLOR_STANDARD, ESRI_POP_UP, GEOCODE_URL, MAP_SELECTION_NAME, REMOVE_LOCATION_BUTTON_TEXT, VIEW_MAP, VIEW_MAP_STANDARD, WORLD_CITIES } from "./generalConstants";
import Search from "@arcgis/core/widgets/Search"
import Feature from "@arcgis/core/widgets/Feature";
import { PopUpText } from "./pop-up-content";
import { WeatherInformation } from "./weather";
import { fetchApi, round } from "./general";


let myLocation = true
let view: MapView = new MapView()
let map: ArcGISMap = new ArcGISMap()
let locate = new Locate()
let basemap = VIEW_MAP_STANDARD
let address = ''
let feature = new Feature()


function EsriMap(props: any): JSX.Element {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {

      initMap(map,view,basemap,mapDiv).then((viewElement) => {
          //assure that view and map are the same in every thread 
          view = viewElement
          map = viewElement.map

          setMyLocation()
          setSearchBar()
          setFeatureWidget()
          setFeatureLayer(WORLD_CITIES,0)
          setAddressPopUp()
        })  
    }
  }, [props]);

  setPopUpColor(COLOR_STANDARD)  


  return (
    
    <div className="flex flex-col  justify-center content-center align-middle">
      <div className="p-2 flex flex-wrap space-y-2 w-fit self-center text-center m-2 border-2 rounded-md border-green-300">
        <button className="px-2 mx-2 border-2 border-green-200 rounded" onClick={(e) => changeButton(e)}>{ADD_LOCATION_BUTTON_TEXT}</button>
        <div className="px-2 mx-2 ">
          { FillOption(MAP_SELECTION_NAME, VIEW_MAP, setMap)}
        </div>
        <div className="px-2 mx-2 ">
          { FillOption('PopUp-Color', COLORS, setColor)}
        </div>
      </div>
      <div className="flex flex-row">
        {/* Main map Element */}
        <div className=" h-[79vh] w-full  p-0" ref={mapDiv}/>
      </div>
    </div>
  );
}


function setPopUpColor(color: string): void{
  document.documentElement.style.setProperty(ESRI_POP_UP, color);
}

function setAddressPopUp(): void{
  view.popup.autoOpenEnabled = false
  view.on('click', (event) => {

    const lat = round(event.mapPoint.latitude);
    const lon = round(event.mapPoint.longitude);

    view.popup.open({
      title: 'Coordinates / Street information',
      content: '',
      location: event.mapPoint, // Set the location of the popup to the clicked location

    });

    const params = {
      location: event.mapPoint
    };

    // Execute a reverse geocode using the clicked location
    locationToAddress(GEOCODE_URL, params).then((response: any) => {
        address = response.address
        const content = ReactDOMServer.renderToStaticMarkup(<PopUpText lat={lat} lon={lon} address={address} />)
        view.popup.content = content
      }).catch(() => {
        view.popup.content = 'No address was found for this location';
      });


    //TODO use data and not just print it
    //google
    fetchApi('api/google-geocoder', JSON.stringify({ lat: lat, lng: lon}));

    //weather
    callWeatherApi(JSON.stringify({ lat: lat, lng: lon}))

  })
}

function callWeatherApi(parameter: string): void{
  fetchApi('api/weather', parameter , setWeatherData);
}

function setFeatureLayer(url: string, index: number): void{
  const layer = new FeatureLayer({
    url: url
  });
  map.add(layer, index);
}

function setFeatureWidget(): void{
  const graphic = {
    popupTemplate: {
      content: 'Weather details'
    }
  };

  feature = new Feature({
    id:'infoWidget',
    label: 'Info',
    visible: false,
    map: view.map,
    graphic: graphic,
    spatialReference: view.spatialReference
  });
  view.ui.add(feature, 'bottom-right');
}

function setSearchBar(): void{
  const search = new Search({
    view: view
  })

  search.on('search-complete',(event) =>{
    //TODO use type and check if values exists
    const geom = event.results[0].results[0].feature.geometry ;
    //@ts-ignore
    callWeatherApi(JSON.stringify({ lat: geom.latitude, lng: geom.longitude}))
  })

  view.ui.add(search, 'top-right'); //Add to the map
}

function setWeatherData(data: any): void{
  const content = ReactDOMServer.renderToStaticMarkup(<WeatherInformation data={data} />)
  //@ts-ignore
  feature.graphic.popupTemplate = {content: content}
  feature.visible = true
}

function setMap(e: React.ChangeEvent<HTMLSelectElement>): void{
  if(view.map && VIEW_MAP.includes(e.target.value)){
    view.map.set('basemap',e.target.value) 
  }
}

function setColor(e: React.ChangeEvent<HTMLSelectElement>): void{
  if(COLORS.includes(e.target.value)){
    document.documentElement.style.setProperty(ESRI_POP_UP, e.target.value);
  }else{
    console.log('The color doesn\'t exists')
  }
}

function FillOption(name: string, option: Array<string>, onChange: Function): JSX.Element{
  return (
    <div>
      <label htmlFor="mapSelection" >{name}</label>
      <select className="ml-2 px-2 border-2 border-green-200 rounded" id="mapSelection" onChange={ (e) => onChange(e) }>
        { option.map((value, key)=> {
            return <option key={key} value={value}>{value}</option>
          }) 
        }
      </select>
    </div>
  );
}

function setMyLocation(): void{
    locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      visible: myLocation
    });
    locate.on('locate',(event)=>{
      callWeatherApi(JSON.stringify({ lat: event.position.coords.latitude, lng: event.position.coords.longitude}))
    })
    view.ui.add(locate, 'bottom-left');
}

function updateMyLocation(){
  myLocation ? locate.visible = true : locate.visible = false
}

function changeButton(e: React.FormEvent<HTMLButtonElement>): void{
  const but = e.target as HTMLButtonElement;

  myLocation = !myLocation
  updateMyLocation()
  if( myLocation ){
    but.innerText = ADD_LOCATION_BUTTON_TEXT;
  }else{
    but.innerText = REMOVE_LOCATION_BUTTON_TEXT;
  }
}

async function initMap(map: ArcGISMap, view: MapView, basemap: string, mapDiv: any): Promise<MapView>{
    map = new ArcGISMap({
        basemap: basemap,
      });

    //TODO into constants
    view = new MapView({
      map,
      container: mapDiv.current,
      extent: {
        spatialReference: {
          wkid: 102100,
        },
        xmax: 88920,
        xmin: 890000,
        ymax: 6991080,
        ymin: 6092000,
      }
    });
    return new Promise((resolve) => {
        waitFor(view.map,()=>{resolve(view)})
    });
}

function waitFor(variable: any, callback: Function, wait: number = 50): void {
  var interval = setInterval(function() {
    if (variable) {
      clearInterval(interval);
      callback();
    }
  }, wait);
}

export default EsriMap;
