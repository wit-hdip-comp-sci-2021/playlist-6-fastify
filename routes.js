"use strict";


import { accounts } from "./controllers/accounts.js";

import { dashboard } from "./controllers/dashboard.js";
import { about } from "./controllers/about.js";
import { playlist } from "./controllers/playlist.js";
import { song } from "./controllers/song.js";

export function register(fastify) {
  fastify.get("/about", about.index);

  fastify.get("/", accounts.index);
  fastify.get("/login", accounts.login);
  fastify.get("/signup", accounts.signup);
  fastify.get("/logout", accounts.logout);
  fastify.post("/register", accounts.register);
  fastify.post("/authenticate", accounts.authenticate);

  fastify.get("/dashboard", dashboard.index);
  fastify.post("/dashboard/addplaylist", dashboard.addPlaylist);
  fastify.get("/dashboard/deleteplaylist/:id", dashboard.deletePlaylist);

  fastify.get("/playlist/:id", playlist.index);
  fastify.get("/playlist/:id/deletesong/:songid", playlist.deleteSong);
  fastify.post("/playlist/:id/addsong", playlist.addSong);

  fastify.get("/song/:id/editsong/:songid", song.index);
  fastify.post("/song/:id/updatesong/:songid", song.update);
}
