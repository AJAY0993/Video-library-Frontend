export default function reducer(state, action) {
    switch (action.type) {
        case "GET_VIDEOS":
            return { ...state, videos: action.payload };
        case "SET_FILTER":
            return { ...state, filter: action.payload.toLowerCase() };
        case "GET_CATEGORIES":
            return { ...state, genres: action.payload, isLoading: false };
        case "GET_LIKED":
            return { ...state, liked: action.payload, isLoading: false }
        case "SET_LOADER":
            return { ...state, isLoading: action.payload };
        case "GET_HISTORY":
            return { ...state, history: action.payload, isLoading: false };
        case "UPDATE_HISTORY":
            return { ...state, history: action.payload, isLoading: false };
        case "REMOVE_HISTORY":
            return { ...state, history: action.payload, isLoading: false };
        case "CLEAR_HISTORY":
            return { ...state, history: action.payload };
        case "VIDEO_SELECTED":
            return { ...state, selectedVideo: action.payload };
        case "GET_PLAYLISTS":
            return { ...state, playlists: action.payload, isLoading: false };
        case "CREATED_PLAYLIST":
            return {
                ...state,
                playlists: [...state.playlists, action.payload],
                isLoading: false,
            };
        case "GET_PLAYLIST_VIDEOS":
            return { ...state, playlistVideos: action.payload, isLoading: false };
        case "DELETE_PLAYLIST":
            return { ...state, playlists: action.payload, isLoading: false };
        case "REMOVE_VIDEO_FROM_PLAYLIST":
            return { ...state, playlistVideos: action.payload, isLoading: false };
        case "GET_WATCHLATER":
            return { ...state, watchLater: action.payload, isLoading: false }
        case "ADD_VIDEO_TO_WATCHLATER":
            return { ...state, watchLater: action.payload, isLoading: false };
        case "REMOVE_VIDEO_FROM_WATCHLATER":
            return { ...state, watchLater: action.payload, isLoading: false };
        case "OPEN_MODAL":
            return { ...state, showModal: true, selectedVid: action.payload };
        case "CLOSE_MODAL":
            return { ...state, showModal: false };
        case "SET_MODAL_TYPE":
            return { ...state, modalType: action.payload };
        default:
            return { ...state };
    }
}