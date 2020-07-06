import React, { useContext, useEffect, useCallback } from "react";
import "./TopTracks.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();

const TopTracks = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  const fetchTopTracks = useCallback(
    async (range) => {
      // console.log(range);
      dispatch({ type: "LOADING", payload: true });
      const res = await spotifyWebApi.getMyTopTracks({
        time_range: `${range}`,
      });

      dispatch({ type: "RANGE", payload: range });
      dispatch({ type: "TOP_TRACKS", payload: res });
      dispatch({ type: "LOADING", payload: false });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTopTracks("long_term");
  }, [fetchTopTracks]);

  const handleClick = (range) => {
    fetchTopTracks(range);
  };

  return (
    <div className="toptracks-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="header">
            <div className="header-toptracks">
              <h1>
                <strong>TopTracks</strong>
              </h1>
            </div>
            <div className="header-timer">
              <button
                onClick={() => handleClick("long_term")}
                className={
                  "header-button " +
                  (state.range === "long_term" ? "header-button-active" : "")
                }
              >
                All Time
              </button>
              <button
                onClick={() => handleClick("medium_term")}
                className={
                  "header-button " +
                  (state.range === "medium_term" ? "header-button-active" : "")
                }
              >
                Last 6 Months
              </button>
              <button
                onClick={() => handleClick("short_term")}
                className={
                  "header-button " +
                  (state.range === "short_term" ? "header-button-active" : "")
                }
              >
                Last 4 Weeks
              </button>
            </div>
          </div>
          {state.topTracks ? (
            <div className="toptracks-lower">
              <div className="toptracks">
                {state.topTracks.items.map((item, i) => {
                  return (
                    <Link
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                        margin: "2rem",
                      }}
                      key={i}
                      to={{ pathname: `/track/${item.id}` }}
                    >
                      <div className="toptracks-div-container">
                        <div className="toptracks-image-container">
                          <img
                            className="toptracks-image"
                            src={item.album.images[0].url}
                            alt="track"
                          />
                        </div>
                        <div className="toptracks-info">
                          <div className="toptracks-name">{item.name}</div>
                          <div className="toptracks-artists-container">
                            {item.artists.map((artist, i) => (
                              <div key={i}>{artist.name} | </div>
                            ))}
                            <div>{item.album.name}</div>
                          </div>
                        </div>
                        <div className="toptracks-time">
                          {(item.duration_ms / (1000 * 60)).toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TopTracks;
