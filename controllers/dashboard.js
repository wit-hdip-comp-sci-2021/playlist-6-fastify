"use strict";

const accounts = require("./accounts.js");
const playlistStore = require("../models/playlist-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlistStore.getUserPlaylists(loggedInUser.id)
    };
    response.view("/views/dashboard.hbs", viewData);
  },

  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
