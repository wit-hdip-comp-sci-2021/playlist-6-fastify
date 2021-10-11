"use strict";

import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";
import { songController } from "./controllers/song-controller.js";

const SongSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    artist: { type: "string" },
    duration: { type: "integer" }
  }
};

export function routes(app) {
  app.get("/about", aboutController.index);

  app.get("/", accountsController.index);
  app.get("/login", accountsController.login);
  app.get("/signup", accountsController.signup);
  app.get("/logout", accountsController.logout);
  app.post("/register", accountsController.register);
  app.post("/authenticate", accountsController.authenticate);

  app.get("/dashboard", dashboardController.index);
  app.post("/dashboard/addplaylist", dashboardController.addPlaylist);
  app.get("/dashboard/deleteplaylist/:id", dashboardController.deletePlaylist);

  app.get("/playlist/:id", playlistController.index);
  app.get("/playlist/:id/deletesong/:songid", playlistController.deleteSong);
 // app.post("/playlist/:id/addsong", playlist.addSong);

  app.post("/playlist/:id/addsong", {
    schema: {
      body: SongSchema,
    },
    attachValidation: true,
    handler: playlistController.addSong
  });

  app.get("/song/:id/editsong/:songid",   songController.index);
  app.post("/song/:id/updatesong/:songid", songController.update);
}
