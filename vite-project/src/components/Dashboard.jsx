/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSpinner } from "react-icons/fa";
import {
  faPlay,
  faPause,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [playingTrack, setPlayingTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const getTracks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://v1.nocodeapi.com/princekumarsingh/spotify/KmufHUSBCCjoRfsX/search?q=${keyword}&type=track`
      );
      const data = await response.json();
      console.log(data.tracks.items);
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = (track) => {
    const audioElement = document.getElementById("audio-element-" + track.id);
    if (!audioElement) return;

    if (playingTrack === track) {
      audioElement.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack) {
        const currentAudioElement = document.getElementById(
          "audio-element-" + playingTrack.id
        );
        currentAudioElement.pause();
      }
      audioElement.play();
      setPlayingTrack(track);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <div className="a1">
        <>
          <nav className="navbar navbar-dark navbar-expand-lg ">
            <div className="container-fluid w-10">
              <h1 className="navbar-brand" href="#">
                Spot-On
              </h1>

              <div
                className="collapse navbar-collapse d-flex justify-content-center "
                id="navbarSupportedContent"
              >
                <input
                  className="form-control me-2 w-75"
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="b1 mx-3" onClick={getTracks}>
                  Search
                </button>

                <button className="b1 mx-3" onClick={logout}>
                  <Link to="/" className="logou">
                    Logout
                  </Link>
                </button>
              </div>
            </div>
          </nav>
        </>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading-icon">
            <center>
              {" "}
              <FaSpinner className="spinner" size={100} />
              <h1>Loading</h1>
            </center>
          </div>
        ) : setIsPlaying ? (
          <div className="row">
            {tracks.map((track) => (
              <div key={track.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    src={track.album.images[0].url}
                    className=""
                    alt="..."
                    style={{ borderRadius: "3%", padding: "3%" }}
                  />
                  <div className="card-body">
                    <center>
                      {" "}
                      <h5 className="card-title" style={{ color: "aliceblue" }}>
                        {track.name}
                      </h5>
                    </center>
                    <p className="card-text">Artist: {track.artists[0].name}</p>
                    <p className="card-text">
                      Duration: {(track.duration_ms / 60000).toFixed(2)} minutes
                    </p>
                    <p className="card-text">
                      Release Date: {track.album.release_date}
                    </p>
                    <center>
                      <audio
                        id={"audio-element-" + track.id}
                        src={track.preview_url}
                        className="w-100"
                        onPause={() => setPlayingTrack(null)}
                      ></audio>
                      <div onClick={() => togglePlayPause(track)}>
                        {playingTrack === track ? (
                          <FontAwesomeIcon
                            icon={faCirclePause}
                            style={{
                              color: "white",
                              height: "15%",
                              width: "15%",
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            style={{
                              color: "white",
                              height: "15%",
                              width: "15%",
                            }}
                          />
                        )}
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="bg-white">No Results Found!</h3>
        )}
      </div>{" "}
      <div style={{ "margin-top": "80%", height: "20px" }}>
        {" "}
        <center>
          <h4 style={{ backgroundColor: "black" }}>
            Prince Kumar Singh <span style={{ color: "blue" }}> 12106069</span>
          </h4>
        </center>
      </div>
    </div>
  );
}

export default Dashboard;
