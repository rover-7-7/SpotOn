/* eslint-disable no-unused-vars */
import { useState } from "react";
import React, { useEffect } from "react";
import Glowing from "./Glowing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSpinner } from "react-icons/fa";
import {
  faPlay,
  faPause,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Searchbar.css";

const SearchBar = () => {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [playingTrack, setPlayingTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getTracks = async () => {
    if (!keyword) return; // Don't search if keyword is empty
    try {
      setLoading(true);
      const response = await fetch(
        `https://v1.nocodeapi.com/princekumarsingh/spotify/KmufHUSBCCjoRfsX/search?q=${keyword}&type=track`
      );
      const data = await response.json();
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

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getTracks();
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.search(isExpanded)}
        id="search-bar"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="search"
          placeholder="Search Your Song"
          name="q"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          aria-label="Search"
          style={styles.searchInput(isExpanded)}
          className="search__input"
        />
        <div
          style={styles.searchButton}
          onClick={toggleSearch}
          id="search-button"
        >
          <i
            className="ri-search-2-line"
            style={{ ...styles.icon, opacity: isExpanded ? 0 : 1 }}
          ></i>
          <i
            className="ri-close-line"
            style={{ ...styles.icon, opacity: isExpanded ? 1 : 0 }}
          ></i>
        </div>
      </form>
      <Link to="/">
        <Glowing name="Logout" />
      </Link>
      <div className="container">
        {loading ? (
          <div className="loading-icon">
            <center>
              <FaSpinner className="spinner" size={100} />
              <h1>Loading</h1>
            </center>
          </div>
        ) : tracks.length > 0 ? (
          <div style={styles.cardContainer}>
            {tracks.map((track) => (
              <div key={track.id} style={styles.card}>
                <div>
                  <img
                    src={track.album.images[0].url}
                    alt="..."
                    style={styles.image}
                  />
                  <div>
                    <center>
                      <h5 style={styles.trackTitle}>{track.name}</h5>
                    </center>
                    <p>Artist: {track.artists[0].name}</p>
                    <p>
                      Duration: {(track.duration_ms / 60000).toFixed(2)} minutes
                    </p>
                    <p>Release Date: {track.album.release_date}</p>
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
                            className="bg-white h-20 w-20"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="bg-white h-20 w-20"
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
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "50vh",
    display: "grid",
    placeItems: "center",
    padding: "1.5rem",
  },
  search: (isExpanded) => ({
    position: "relative",
    width: isExpanded ? "400px" : "76px",
    height: "76px",
    background:
      "linear-gradient(90deg, rgba(124,61,191,1) 13%, rgba(88,151,251,1) 100%)",
    boxShadow: "0 4px 24px hsla(222, 68%, 12%, 0.1)",
    borderRadius: "4rem",
    padding: "10px",
    overflow: "hidden",
    transition: "width 0.5s cubic-bezier(0.9, 0, 0.3, 0.9)",
  }),
  searchInput: (isExpanded) => ({
    border: "none",
    outline: "none",
    width: "calc(100% - 32px)",
    height: "100%",
    borderRadius: "4rem",
    paddingLeft: "14px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.813rem",
    fontWeight: 500,
    opacity: isExpanded ? 1 : 0,
    pointerEvents: isExpanded ? "initial" : "none",
    transition: "opacity 1.5s",
    boxShadow: "0 0 0 100px #fff inset",
  }),
  searchButton: {
    width: "56px",
    height: "56px",
    backgroundColor: "hsl(222, 24%, 8%)",
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: "10px",
    margin: "auto",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "transform 0.6s cubic-bezier(0.9, 0, 0.3, 0.9)",
  },
  icon: {
    color: "#fff",
    fontSize: "1.5rem",
    position: "absolute",
    transition: "opacity 0.5s cubic-bezier(0.9, 0, 0.3, 0.9)",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#282c34",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "1rem",
    padding: "1rem",
    width: "200px",
    textAlign: "center",
    color: "aliceblue",
  },
  image: {
    borderRadius: "3%",
    padding: "3%",
    width: "100%",
    height: "auto",
  },
  trackTitle: {
    color: "aliceblue",
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
};

export default SearchBar;
