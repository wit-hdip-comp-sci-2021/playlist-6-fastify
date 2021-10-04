"use strict";

import { accounts } from "./accounts.js";
import { playlistStore } from "../models/playlist-store.js";
import { v4 as uuidv4 } from "uuid";

export const dashboard = {
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
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  }
};
