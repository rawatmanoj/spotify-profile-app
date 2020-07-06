import React, { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";
import "./Playlist.scss";
import ChartPlaylist from "./ChartPlaylist/ChartPlaylist";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const spotifyWebApi = new Spotify();

const Playlist = () => {
  const [state, dispatch] = useContext(Context);

  spotifyWebApi.setAccessToken(token);

  const params = new useParams();

  const fetchPlaylistTracks = useCallback(async () => {
    dispatch({ type: "LOADING", payload: true });
    const res = await spotifyWebApi.getPlaylistTracks(params.playlistId);
    const res2 = await spotifyWebApi.getPlaylist(params.playlistId);

    dispatch({ type: "PLAYLIST_TRACKS", payload: res });
    dispatch({ type: "PLAYLIST", payload: res2 });
    dispatch({ type: "LOADING", payload: false });
  }, [dispatch, params.playlistId]);

  const fetchRecommendations = useCallback(async () => {
    dispatch({ type: "LOADING", payload: true });
    const res = await spotifyWebApi.getPlaylistTracks(params.playlistId);

    const recTracks = res.items.map((item) => {
      return item.track.id;
    });

    const res2 = await spotifyWebApi.getRecommendations({
      seed_tracks: recTracks.slice(0, 5).join(","),
    });

    dispatch({ type: "RECOMMENDATIONS", payload: res2 });

    //  console.log(recTracks);

    const res3 = await spotifyWebApi.getAudioFeaturesForTracks(recTracks);
    //  console.log(res3);

    let [
      acousticness,
      danceability,
      energy,
      instrumentalness,
      liveness,
      speechiness,
      valence,
    ] = [0, 0, 0, 0, 0, 0, 0];

    // console.log(acousticness);

    for (let i = 0; i < res3.audio_features.length; i++) {
      acousticness = acousticness + res3.audio_features[i].acousticness;
      danceability = danceability + res3.audio_features[i].danceability;
      energy = energy + res3.audio_features[i].energy;
      instrumentalness =
        instrumentalness + res3.audio_features[i].instrumentalness;
      liveness = liveness + res3.audio_features[i].liveness;
      speechiness = speechiness + res3.audio_features[i].speechiness;
      valence = valence + res3.audio_features[i].valence;
      // console.log(res3.audio_features[i].acousticness);
    }

    // console.log(acousticness / res3.audio_features.length);

    const arr = [
      acousticness / res3.audio_features.length,
      danceability / res3.audio_features.length,
      energy / res3.audio_features.length,
      instrumentalness / res3.audio_features.length,
      liveness / res3.audio_features.length,
      speechiness / res3.audio_features.length,
      valence / res3.audio_features.length,
    ];

    // console.log(arr);

    dispatch({ type: "PLAYLIST_CHART", payload: arr });
    dispatch({ type: "LOADING", payload: false });
  }, [dispatch, params.playlistId]);

  useEffect(() => {
    fetchPlaylistTracks();
    fetchRecommendations();
  }, [fetchPlaylistTracks, fetchRecommendations]);

  return (
    <div className="innerplaylist-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="innerplaylist">
            {state.playlist ? (
              <div className="innerplaylist-left-container">
                <div className="innerplaylist-left-div-container">
                  <img
                    className="innerplaylist-image"
                    src={state.playlist.images[0].url}
                    alt="playlist"
                  />
                </div>
                <div className="innerplaylist-left-name">
                  {state.playlist.name}
                </div>
                <div className="innerplaylist-left-description">
                  {state.playlist.description}
                </div>
                <div className="innerplaylist-left-total-tracks">
                  {state.playlist.tracks.total} tracks
                </div>
                <Link
                  className="get-recommendations-button"
                  to={{ pathname: `/Recommendations/${params.playlistId}` }}
                >
                  <div>GET RECOMMENDATIONS</div>
                </Link>
                <div className="audio-features-heading">Audio Features</div>
                <ChartPlaylist />
              </div>
            ) : null}
            <div className="innerplaylist-right-conatiner">
              <div className="innerplaylist-right-lower">
                {state.playlistTracks ? (
                  <div className="innerplaylist-right">
                    {state.playlistTracks.items.map((item, i) => {
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
                          <div className="innerplaylist-right-div-container">
                            <div className="innerplaylist-right-image-container">
                              <img
                                className="innerplaylist-right-image"
                                src={item.track.album.images[0].url}
                                alt="album"
                              />
                            </div>
                            <div className="innerplaylist-right-info">
                              <div className="innerplaylist-right-name">
                                {item.track.name}
                              </div>
                              <div className="innerplaylist-right-artists-container">
                                {item.track.artists.map((artist, i) => (
                                  <div key={i}>{artist.name} | </div>
                                ))}
                                <div>{item.track.album.name}</div>
                              </div>
                            </div>
                            <div className="innerplaylist-right-time">
                              {(item.track.duration_ms / (1000 * 60)).toFixed(
                                2
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Playlist;
