"use strict";

import { accounts } from "./controllers/accounts.js";
import { dashboard } from "./controllers/dashboard.js";
import { about } from "./controllers/about.js";
import { playlistController } from "./controllers/playlist.js";
import { song } from "./controllers/song.js";

const SongSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    artist: { type: "string" },
    duration: { type: "integer" }
  }
};

export function routes(app) {
  app.get("/about", about.index);

  app.get("/", accounts.index);
  app.get("/login", accounts.login);
  app.get("/signup", accounts.signup);
  app.get("/logout", accounts.logout);
  app.post("/register", accounts.register);
  app.post("/authenticate", accounts.authenticate);

  app.get("/dashboard", dashboard.index);
  app.post("/dashboard/addplaylist", dashboard.addPlaylist);
  app.get("/dashboard/deleteplaylist/:id", dashboard.deletePlaylist);

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


  app.get("/song/:id/editsong/:songid",   song.index);
  app.post("/song/:id/updatesong/:songid", song.update);
}
