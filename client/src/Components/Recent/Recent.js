import React, { useContext, useEffect, useCallback } from "react";
import "./Recent.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();

const Recent = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  const fetchTopTracks = useCallback(async () => {
    // console.log(range);
    dispatch({ type: "LOADING", payload: true });

    const res = await spotifyWebApi.getMyRecentlyPlayedTracks({});

    dispatch({ type: "RECENT", payload: res });
    dispatch({ type: "LOADING", payload: false });
  }, [dispatch]);

  useEffect(() => {
    fetchTopTracks();
  }, [fetchTopTracks]);
  //console.log(state);

  return (
    <div className="recent-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="recent-heading">
            <h1>
              <strong>Recently Played Tracks</strong>
            </h1>
          </div>
          {state.recent ? (
            <div className="recent-lower">
              <div className="recent">
                {state.recent.items.map((item, i) => {
                  return (
                    <Link
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                        margin: "2rem",
                      }}
                      key={i}
                      to={{ pathname: `/track/${item.track.id}` }}
                    >
                      <div className="recent-div-container">
                        <div className="recent-image-container">
                          <img
                            className="recent-image"
                            src={item.track.album.images[0].url}
                            alt="recent_image"
                          />
                        </div>
                        <div className="recent-info">
                          <div className="recent-name">{item.track.name}</div>
                          <div className="recent-artists-container">
                            {item.track.artists.map((artist, i) => (
                              <div key={i}>{artist.name} | </div>
                            ))}
                            <div>{item.track.album.name}</div>
                          </div>
                        </div>
                        <div className="recent-time">
                          {(item.track.duration_ms / (1000 * 60)).toFixed(2)}
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

export default Recent;
