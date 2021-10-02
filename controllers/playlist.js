"use strict";

const playlistStore = require("../models/playlist-store");
const playlistAnalytics = require("../utils/playlist-analytics");
const uuid = require("uuid");

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary : {
        shortestSong : playlistAnalytics.getShortestSong(playlist),
        duration : playlistAnalytics.getPlaylistDuration(playlist)
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
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};

module.exports = playlist;
