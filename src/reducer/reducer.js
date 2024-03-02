import initialState from "./initialState"

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.payload }
    case "SET_FILTER":
      return { ...state, filter: action.payload.toLowerCase() }
    case "SET_CATEGORIES":
      return { ...state, genres: action.payload, isLoading: false }
    case "SET_LIKED":
      return { ...state, liked: action.payload, isLoading: false }
    case "SET_LOADER":
      return { ...state, isLoading: action.payload }
    case "SET_HISTORY":
      return { ...state, history: action.payload, isLoading: false }
    case "ADD_VIDEO_TO_HISTORY":
      return { ...state, history: action.payload, isLoading: false }
    case "REMOVE_VIDEO_FROM_HISTORY":
      return { ...state, history: action.payload, isLoading: false }
    case "CLEAR_HISTORY":
      return { ...state, history: action.payload }
    case "VIDEO_SELECTED":
      return { ...state, selectedVideo: action.payload }
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.payload, isLoading: false }
    case "CREATED_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
        isLoading: false
      }
    case "GET_PLAYLIST_VIDEOS":
      return { ...state, playlistVideos: action.payload, isLoading: false }
    case "DELETE_PLAYLIST":
      return { ...state, playlists: action.payload, isLoading: false }
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return { ...state, playlistVideos: action.payload, isLoading: false }
    case "GET_WATCHLATER":
      return { ...state, watchLater: action.payload, isLoading: false }
    case "ADD_VIDEO_TO_WATCHLATER":
      return { ...state, watchLater: action.payload, isLoading: false }
    case "REMOVE_VIDEO_FROM_WATCHLATER":
      return { ...state, watchLater: action.payload, isLoading: false }
    case "OPEN_MODAL":
      return { ...state, showModal: true, selectedVid: action.payload }
    case "CLOSE_MODAL":
      return { ...state, showModal: false }
    case "SET_MODAL_TYPE":
      return { ...state, modalType: action.payload }
    case "LOGOUT":
      return { ...initialState }
    default:
      return { ...state }
  }
}
