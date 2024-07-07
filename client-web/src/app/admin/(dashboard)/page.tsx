"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { Map } from "mapbox-gl/dist/mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const AdminPage = () => {
    const mapRef = useRef<Map>();

    useEffect(() => {
        mapboxgl.accessToken = String(
            process.env.NEXT_PUBLIC_ACCESSTOKEN_MAPBOX
        );

        mapRef.current = new mapboxgl.Map({
            container: "map-container",
            center: [106.67065066578655, 10.800786882304118],
            zoom: 12,
            style: "mapbox://styles/gioimtg2003/cly3bplv3007k01qp87hradf3",
            language: "vi",
            locale: {
                "LogoControl.Title": "Trang chủ",
                "Map.Title": "Bản đồ",
                "NavigationControl.ZoomIn": "Phóng to",
                "NavigationControl.ZoomOut": "Thu nhỏ",
            },
        });
    });

    return (
        <div
            style={{ height: "100%" }}
            id="map-container"
            className="map-container"
        />
    );
};

export default AdminPage;
