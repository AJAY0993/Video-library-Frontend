export default (playlists) => {
  return playlists.filter(
    (playlist) =>
      playlist.name.toLowerCase() !== "liked" &&
      playlist.name.toLowerCase() !== "watchlater" &&
      playlist.name.toLowerCase() !== "disliked"
  )
}
