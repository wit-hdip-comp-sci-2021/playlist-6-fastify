"use strict";

import { playlistStore } from "../models/playlist-store.js";
import { playlistAnalytics } from "../utils/playlist-analytics.js";
import { v4 as uuidv4 } from "uuid";

export const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary: {
        shortestSong: playlistAnalytics.getShortestSong(playlist),
        duration: playlistAnalytics.getPlaylistDuration(playlist)
      }
    };
    response.view("/views/playlist.hbs", viewData);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    playlistStore.removeSong(playlistId, songId);
    response.redirect("/playlist/" + playlistId);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuidv4(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};

