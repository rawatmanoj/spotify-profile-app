import React, { useContext } from "react";
import "./Recommendations.scss";
import { Link } from "react-router-dom";

import { Context } from "../../store/store";
const Recommendations = () => {
  const [state] = useContext(Context);

  return (
    <div className="recommendations-conatiner">
      {state.recommendations ? (
        <div className="recommendations-lower">
          <div className="recommendations">
            {state.recommendations.tracks.map((item) => {
              return (
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit",
                    margin: "2rem",
                  }}
                  to={{ pathname: `/track/${item.id}` }}
                >
                  <div className="recommendations-div-container">
                    <div className="recommendations-image-container">
                      <img
                        className="recommendations-image"
                        src={item.album.images[0].url}
                        alt="album"
                      />
                    </div>
                    <div className="recommendations-info">
                      <div className="recommendations-name">{item.name}</div>
                      <div className="recommendations-artists-container">
                        {item.artists.map((artist) => (
                          <div>{artist.name} | </div>
                        ))}
                        <div>{item.album.name}</div>
                      </div>
                    </div>
                    <div className="recommendations-time">
                      {(item.duration_ms / (1000 * 60)).toFixed(2)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Recommendations;
