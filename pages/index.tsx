import { count } from "console";
import dynamic from "next/dynamic";
import { useRef,useEffect, useState } from "react";
import { Footer, Header } from "../general/general";
import styles from "../styles/Home.module.css";


// The ArcGIS JSAPI does not currently work with SSR, so we need to disable it for the map component
const EsriMapWithNoSSR = dynamic(() => import("../general/EsriMap"), {
  ssr: false,
});



function Home() {

  const [counter, setCount] = useState(0);

     

  return (
    <div className={styles.container}>
      <Header/>

      <h1 className={styles.title}>
        Welcome to Weather App
      </h1>

      <div className="my-4">
        <button onClick={()=>setCount }>Count</button>
      </div>

      <div className="my-4">
        <p>Content: {counter}</p>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </div>

      <div className="my-4">
        <EsriMapWithNoSSR content={"NR.:" + counter} />
      </div> 

      <Footer/>
    </div>
  );
}

export default Home;