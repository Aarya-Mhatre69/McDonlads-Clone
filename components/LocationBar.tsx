"use client";

import { useState, useEffect } from "react";

// Map of rough coordinates → city name (mock reverse geocoding)
const CITY_LOOKUP: { lat: [number, number]; lng: [number, number]; city: string }[] = [
  { lat: [18.8, 19.4], lng: [72.6, 73.1], city: "Mumbai" },
  { lat: [28.4, 28.9], lng: [76.9, 77.4], city: "New Delhi" },
  { lat: [12.8, 13.2], lng: [77.4, 77.8], city: "Bengaluru" },
  { lat: [17.2, 17.7], lng: [78.2, 78.7], city: "Hyderabad" },
  { lat: [22.4, 22.8], lng: [88.2, 88.6], city: "Kolkata" },
  { lat: [13.0, 13.2], lng: [80.1, 80.4], city: "Chennai" },
  { lat: [23.0, 23.2], lng: [72.5, 72.8], city: "Ahmedabad" },
  { lat: [18.4, 18.7], lng: [73.7, 74.0], city: "Pune" },
];

function mockReverseGeocode(lat: number, lng: number): string {
  for (const entry of CITY_LOOKUP) {
    if (
      lat >= entry.lat[0] && lat <= entry.lat[1] &&
      lng >= entry.lng[0] && lng <= entry.lng[1]
    ) {
      return entry.city;
    }
  }
  return `Near (${lat.toFixed(1)}°N, ${lng.toFixed(1)}°E)`;
}

type Status = "idle" | "loading" | "granted" | "denied";

export default function LocationBar() {
  const [status, setStatus] = useState<Status>("idle");
  const [location, setLocation] = useState<string>("");
  const [manualInput, setManualInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Auto-request location on mount
  useEffect(() => {
    detectLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function detectLocation() {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const city = mockReverseGeocode(pos.coords.latitude, pos.coords.longitude);
        setLocation(city);
        setStatus("granted");
      },
      () => {
        setStatus("denied");
      },
      { timeout: 8000 }
    );
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setManualInput(trimmed);
    setLocation(trimmed);
    setStatus("granted");
    setEditing(false);
  }

  const displayLocation = location || manualInput;

  return (
    <div
      id="location-bar"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e4e4e7",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        position: "sticky",
        top: "80px",
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap" as const,
        }}
      >

        {/* Left: pin icon + location text */}
        <div className="location-bar-left">
          {/* Pin SVG */}
          <svg
            className="location-pin-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          {/* Status content */}
          {status === "idle" || status === "loading" ? (
            <span className="location-text location-loading">
              <span className="location-dots">
                <span />
                <span />
                <span />
              </span>
              Detecting location…
            </span>
          ) : status === "granted" && !editing ? (
            <div className="location-granted">
              <span className="location-label">Delivering to</span>
              <span className="location-city" id="detected-location">{displayLocation}</span>
            </div>
          ) : (
            /* Manual input form */
            <form onSubmit={handleManualSubmit} className="location-form" id="location-manual-form">
              <input
                id="location-input"
                className="location-input"
                type="text"
                placeholder="Enter your city (e.g. Mumbai)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                aria-label="Enter your location manually"
              />
              <button
                id="location-submit-btn"
                type="submit"
                className="location-submit-btn"
                aria-label="Set location"
              >
                Set
              </button>
            </form>
          )}
        </div>

        {/* Right: action buttons */}
        <div className="location-bar-right">
          {status === "granted" && !editing && (
            <button
              id="change-location-btn"
              className="location-change-btn"
              onClick={() => {
                setEditing(true);
                setInputValue(displayLocation);
              }}
              aria-label="Change delivery location"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Change
            </button>
          )}
          {(status === "denied" || (status === "granted" && editing)) && (
            <button
              id="use-gps-btn"
              className="location-gps-btn"
              onClick={() => {
                setEditing(false);
                setInputValue("");
                detectLocation();
              }}
              aria-label="Use GPS location"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
              </svg>
              Use GPS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
