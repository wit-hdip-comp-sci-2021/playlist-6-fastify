"use strict";

import { accountsController } from "./accounts-controller.js";
import { playlistStore } from "../models/playlist-store.js";
import { v4 as uuidv4 } from "uuid";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getCurrentUser(request);
    const playlists = await playlistStore.getUserPlaylists(loggedInUser.id)
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlists
    };
    response.view("/views/dashboard-view.hbs", viewData);
  },

  async deletePlaylist(request, response) {
    const playlistId = request.params.id;
    await playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  async addPlaylist(request, response) {
    const loggedInUser = await accountsController.getCurrentUser(request);
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
