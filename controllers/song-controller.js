"use strict";

import { playlistStore } from "../models/playlist-store.js";

export const songController = {
  async index(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const playlist = await playlistStore.getPlaylist(playlistId);
    const song = await playlistStore.getSong(playlistId, songId);
    const viewData = {
      title: "Edit Song",
      playlist: playlist,
      song: song
    };
    response.view("/views/songController.hbs", viewData);
  },

  async update(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const song = await playlistStore.getSong(playlistId, songId);
    const newSong = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    await playlistStore.updateSong(song, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};
