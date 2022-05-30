import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

export default function MapBike(props) {
    useEffect(() => {
        var local = props.data;
        var xCoor = parseFloat(local.state.item.Koordinat.split(",")[0])
        var yCoor = parseFloat(local.state.item.Koordinat.split(",")[1])
        var container = L.DomUtil.get("map");
        if (container != null) {
            container._leaflet_id = null;
        }
        var map = L.map("map").setView([xCoor, yCoor], 13);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
            }
        ).addTo(map);
        L.Marker.prototype.options.icon = DefaultIcon;
        var marker = L.marker([xCoor, yCoor]).addTo(map);
        marker.bindPopup(local.state.item.IstasyonAdi).openPopup();
    }, [props]);
    return <div id="map" style={{ height: "100vh" }}></div>;
}