import dynamic from "next/dynamic";
import { useLayoutEffect, useState } from "react";
import { Footer, Header } from "../general/general";
import styles from "../styles/Home.module.css";


// The ArcGIS JSAPI does not currently work with SSR, so we need to disable it for the map component
const EsriMapWithNoSSR = dynamic(() => import("../general/EsriMap"), {
  ssr: false,
});



function Home() {

  
  const [size, setSize] = useState([0, 0]);

  //rerender example if window size changes 
  // useLayoutEffect(() => {
  //   function updateSize() {
  //     setSize([window.innerWidth, window.innerHeight]);
  //   }
  //   window.addEventListener('resize', updateSize);
  //   updateSize();
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);
     

  return (
    <div className={styles.container}>
      <Header/>

      <div data-cy="header" className="text-center text-2xl">
        Weather App
      </div>

      <div className="mb-4">
        <EsriMapWithNoSSR width={size}/>
      </div> 

      <Footer/>
    </div>
  );
}

export default Home;