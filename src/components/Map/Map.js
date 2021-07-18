import React from "react";
import { Map as LeafletMap, TileLayer ,Circle } from "react-leaflet";
import './Map.css'
import {showDataOnMap} from '../../util'
function Map({center, zoom, mapCountries}) {
  // const casesType = "cases"
  // const casesTypeColors = {
  //   cases: {
  //     hex: "#CC1034",
  //     rgb: "rgb(204, 16, 52)",
  //     half_op: "rgba(204, 16, 52, 0.5)",
  //     multiplier: 400,
  //   },
  //   recovered: {
  //     hex: "#7dd71d",
  //     rgb: "rgb(125, 215, 29)",
  //     half_op: "rgba(125, 215, 29, 0.5)",
  //     multiplier: 1200,
  //   },
  //   deaths: {
  //     hex: "#fb4443",
  //     rgb: "rgb(251, 68, 67)",
  //     half_op: "rgba(251, 68, 67, 0.5)",
  //     multiplier: 2000,
  //   },
  // };
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {showDataOnMap(mapCountries, "cases")}
        {/* {
          mapCountries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillColor={casesTypeColors[casesType].hex}
              color={casesTypeColors[casesType].hex}
              fillOpacity={0.4}
              radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
              }
            />
    
        ))
        } */}
      </LeafletMap>
    </div>
  );
}

export default Map;