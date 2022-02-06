import { Coordinates } from "./generalConstants";

export function PopUpText(props: Coordinates): JSX.Element{
    return (
      <div className="flex flex-col">
        <p>WGS84 Coordinates:</p>
        <p>Lat: {props.lat}, Lon: {props.lon}</p>
        { props.address &&
          <p> {props.address} </p>
        }
      </div>
    );
  }
  