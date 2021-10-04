"use strict";

import { playlistStore } from "../models/playlist-store.js";

export const song = {
  index(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const viewData = {
      title: "Edit Song",
      playlist: playlistStore.getPlaylist(playlistId),
      song: playlistStore.getSong(playlistId, songId)
    };
    response.view("/views/song.hbs", viewData);
  },

  update(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const song = playlistStore.getSong(playlistId, songId);
    const newSong = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    playlistStore.updateSong(song, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};
