import React from 'react';
import { FaChevronUp, FaTimes, FaPlay, FaPause } from 'react-icons/fa';

function BottomPanel({
  showConfigure, showPlayback,
  onShowConfigure, onShowPlayback, onClose,
  playing, onPlayPause,
  speed, onSpeedChange,
  progress, onProgressChange,
  vehicleOptions = [],      
  dateOptions = [],         
  selectedVehicle, onVehicleChange,
  selectedDate, onDateChange,
  onShowRouteClick
}) {
  return (
    <>
      {showConfigure && (
        <div style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          background: "#fff",
          boxShadow: "0 -2px 10px #0001",
          padding: 16,
          zIndex: 1000,
          transition: "0.3s"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <b>Configure</b>
            <div>
              <button
                onClick={onShowPlayback}
                style={{
                  background: "#1976d2",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  marginLeft: 4
                }}
                title="Open playback panel"
              >
                <FaChevronUp color="white" size={20} />
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "#1976d2",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  marginLeft: 4
                }}
                title="Close configure panel"
              >
                <FaTimes color="white" size={20} />
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
            <select value={selectedVehicle || ''} onChange={onVehicleChange}>
              {vehicleOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select value={selectedDate || ''} onChange={onDateChange}>
              {dateOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "6px 18px",
                fontWeight: "bold",
              }}
              onClick={onShowRouteClick}
            >
              SHOW
            </button>
          </div>
        </div>
      )}

      {showPlayback && (
        <div style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100vw",
          background: "#fff",
          boxShadow: "0 -2px 10px #0001",
          padding: 16,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <button
              onClick={onPlayPause}
              style={{ border: "none", background: "transparent", marginRight: 8 }}
              title="Play/Pause"
            >
              {playing ? <FaPause size={26} /> : <FaPlay size={26} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={onProgressChange}
              style={{ flex: 1, marginRight: 12 }}
            />
          </div>
          <div>
            <select value={speed} onChange={onSpeedChange}>
              {[0, 1, 2, 3, 4, 5].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            onClick={onShowConfigure}
            style={{
              background: "#1976d2",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              marginLeft: 10,
              marginRight: 8
            }}
            title="Back to configure"
          >
            <FaTimes color="white" size={20} />
          </button>
        </div>
      )}
    </>
  );
}

export default BottomPanel;