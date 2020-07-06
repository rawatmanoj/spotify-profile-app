const Reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "PLAYLIST_CHART":
      return {
        ...state,
        playlistChart: action.payload,
      };
    case "FOLLOWED_ARTISTS":
      return {
        ...state,
        followedArtists: action.payload,
      };
    case "PLAYLIST_TRACKS":
      return {
        ...state,
        playlistTracks: action.payload,
      };
    case "PLAYLIST":
      return {
        ...state,
        playlist: action.payload,
      };
    case "RECOMMENDATIONS":
      return {
        ...state,
        recommendations: action.payload,
      };
    case "IS_FOLLOWING_ARTIST":
      return {
        ...state,
        isFollowingArtist: action.payload,
      };
    case "AUDIOANALYSIS":
      return {
        ...state,
        audioAnalysis: action.payload,
      };
    case "AUDIOFEATURES":
      return {
        ...state,
        audioFeatures: action.payload,
      };
    case "ARTIST":
      return {
        ...state,
        artist: action.payload,
      };
    case "TRACK":
      return {
        ...state,
        track: action.payload,
      };
    case "RECENT":
      return {
        ...state,
        recent: action.payload,
      };
    case "TOP_TRACKS":
      return {
        ...state,
        topTracks: action.payload,
      };
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "TOP_ARTISTS":
      return {
        ...state,
        topArtists: action.payload,
      };
    case "USER_PLAYLIST":
      return {
        ...state,
        userPlaylists: action.payload,
      };

    case "RANGE":
      return {
        ...state,
        range: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
