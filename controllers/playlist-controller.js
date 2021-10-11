"use strict";

import { playlistStore } from "../models/playlist-store.js";
import { playlistAnalytics } from "../utils/playlist-analytics.js";
import { v4 as uuidv4 } from "uuid";

export const playlistController = {
  async index(request, response) {
    const playlistId = request.params.id;
    const playlist = await playlistStore.getPlaylist(playlistId);
    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary: {
        shortestSong: playlistAnalytics.getShortestSong(playlist),
        duration: playlistAnalytics.getPlaylistDuration(playlist)
      }
    };
    response.view("/views/playlist-view.hbs", viewData);
  },

  async deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    await playlistStore.removeSong(playlistId, songId);
    response.redirect("/playlist/" + playlistId);
  },

  async addSong(request, response) {
    const playlistId = request.params.id;
    if (request.validationError) {
      response.redirect("/playlist/" + playlistId);
    } else {
      const playlist = await playlistStore.getPlaylist(playlistId);
      const newSong = {
        id: uuidv4(),
        title: request.body.title,
        artist: request.body.artist,
        duration: Number(request.body.duration)
      };
      await playlistStore.addSong(playlistId, newSong);
      response.redirect("/playlist/" + playlistId);
    }
  }
};

