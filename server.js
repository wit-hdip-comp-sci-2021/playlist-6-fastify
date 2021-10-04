"use strict";

//const fastify = require("fastify")();
import fastify from "fastify";
import pointOfView from "point-of-view";
import formBody from "fastify-formbody";
import cookie from "fastify-cookie";
import handlebars from "handlebars";

import { register } from "./routes.js";

const app = fastify();

app.register(pointOfView, {
  engine: {
    handlebars: handlebars
  },
  layout: "./views/layouts/main.hbs",
  includeViewExtension: true,
  options: {
    partials: {
      welcomemenu: "/views/partials/welcomemenu.hbs",
      menu: "/views/partials/menu.hbs",
      listplaylists: "/views/partials/listplaylists.hbs",
      addplaylist: "/views/partials/addplaylist.hbs",
      listsongs: "/views/partials/listsongs.hbs",
      addsong: "/views/partials/addsong.hbs"
    }
  }
});

app.register(formBody);

app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}     // options for parsing cookies
});

//const register = require("./routes");

register(app);
app.listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on ${app.server.address().port}`);
});
