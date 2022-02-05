import React, { useRef, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import webMercatorUtils from "@arcgis/core/widgets/Locate"
import Locate from "@arcgis/core/widgets/Locate";

import { locationToAddress } from "@arcgis/core/rest/locator";
import { VIEW_MAP } from "./generalConstants";
import Search from "@arcgis/core/widgets/Search"
// import Widget from "@arcgis/core/widgets/Widget";
// import  from "@arcgis/core/widgets/Widget";
import Feature from "@arcgis/core/widgets/Feature";
import { PopUpText } from "./pop-up-content";

// esri/geometry/webMercatorUtils
// import styles from "../../styles/globals.css";

let myLocation = true

let view: MapView = new MapView()
// let widget = new Widget()
let locate = new Locate()
let basemap = "gray-vector"
let address = ""

let feature = new Feature()

const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
// const locatorUrl = "https://maps.googleapis.com/maps/api/geocode";

function EsriMap(props: any) {
  const mapDiv = useRef(null);
  // const mapWidget = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {

      const map = new ArcGISMap({
        basemap: basemap,

      });

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

      setMyLocation()

      const search = new Search({
        view: view
      })

      view.ui.add(search, "top-right"); //Add to the map

      // if(mapWidget.current){
      //   widget = new Widget({
      //     container: mapWidget.current,
      //     id:'infoWidget',
      //     label: "Info",
      //     visible: false,
      //   })
      //   view.ui.add(widget,'bottom-right')
      // }
      
      // if(mapWidget.current){

        const graphic = {
          popupTemplate: {
            content: "Weather details"
          }
        };

        feature = new Feature({
          // container: mapWidget.current,
          id:'infoWidget',
          label: "Info",
          visible: true,
          map: view.map,
          graphic: graphic,
          spatialReference: view.spatialReference
        });
        view.ui.add(feature, "bottom-left");
      // }


    const worldCities = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/"
    });
    map.add(worldCities, 0);

    view.popup.autoOpenEnabled = false

    view.on("click", function(event) {
      console.log('Test', event)

      const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
      const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
  
      const title = ReactDOMServer.renderToStaticMarkup(<PopUpText lat={lat} lon={lon} />)

      view.popup.open({
        // Set the popup's title to the coordinates of the location
        title: title,
        location: event.mapPoint, // Set the location of the popup to the clicked location

      });
  
      const params = {
        location: event.mapPoint
      };
      // const params = {
      //   latlng: [40.714224,-73.961452],
      //   key: ""
      // };
  

      // Display the popup
      // Execute a reverse geocode using the clicked location
      locationToAddress(locatorUrl, params).then((response: any) => {
          // If an address is successfully found, show it in the popup's content
          address = response.address
          view.popup.content = address;
        }).catch(() => {
          // If the promise fails and no result is found, show a generic message
          view.popup.content = "No address was found for this location";
        });


      fetch('api/google-geocoder',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: lat,
          lng: lon
       })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('testi',data)
      }).catch((e)=> console.log(e))      
    
      //weather
      fetch('api/weather',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: lat,
          lng: lon
       })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('weather!',data);
        // widget.graphic.popupTemplate.content = "<div>"+ data.data.main.temp_max + "</div>"
        // widget.graphic.popupTemplate.content = "Success";
        setWeatherData(data.data)
      }).catch((e)=> console.log(e))       

      // const wid = new Widget()
      // widget.visible = true;

    })

    }
  }, [props]);


  let style = { "--esri-pop-up-color": "azure" } as React.CSSProperties;
  return (
    
    <div className="flex flex-col" style={style}>
      <div className="flex flex-row m-2">
        <button onClick={(e) => changeButton(e)}>Add "my location"</button>
      </div>
      <div>
          { FillOption(VIEW_MAP)}
      </div>
      <div className="flex flex-row">
        <div className="mapDiv h-[512px] w-[1024px] p-0 ml-10" ref={mapDiv} >
           {/* <div id="infoWidget" ref={mapWidget} className="infoWidget flex flex-col bg-slate-50 w-[128px]"> 
            <p>Hey</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>  */}
        </div>
      </div>
    </div>
  );
}

function setWeatherData(data: any){
  console.log('intern weather',data);
  console.log('feature',feature);
  //@ts-ignore
  feature.graphic.popupTemplate = {content: '<div>' + data.main.temp_max + '</div>'}
  // feature.graphic.popupTemplate.content = 'test'
  
}

//TODO check values
function setMap(e: React.ChangeEvent<HTMLSelectElement>){  
  view.map.set('basemap',e.target.value) 
}

function FillOption(option: Array<string>){
  return (
    <div>
      <p>Selection</p>
      <select onChange={(e)=> setMap(e)}>
        { option.map((value, key)=> {
            return <option key={key} value={value}>{value}</option>
          }) 
        }
      </select>
    </div>
  );
}

function setMyLocation(){
  if(myLocation){
    locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function(view, options) {
        options.target.scale = 1;
        return view.goTo(options.target);
      },
    });
    view.ui.add(locate, "bottom-right");
  }else{
    view.ui.remove(locate)
  }
  
}


function changeButton(e: React.FormEvent<HTMLButtonElement>){
  const but = e.target as HTMLButtonElement;

  myLocation = !myLocation
  setMyLocation()
  if( myLocation ){
    but.innerText = "add \"My Location\"";
  }else{
    but.innerText = "remove \"My Location\"";
  }
}

export default EsriMap;
