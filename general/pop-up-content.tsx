import { COORDINATES } from "./generalConstants";

export function PopUpText(props: COORDINATES): JSX.Element{
    return (
      <div className="flex flex-col">
        <p>WGS84 Coordinates:</p>
        <p>Lat: {props.lat}, Lon: {props.lon}</p>
      </div>
    );
  }
  