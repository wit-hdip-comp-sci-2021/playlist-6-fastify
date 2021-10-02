"use strict";

const fastify = require("fastify")();

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  },
  layout: "./views/layouts/main.hbs",
  includeViewExtension: true,
  options: {
    partials: {
      welcomemenu: "/views/partials/welcomemenu.hbs",
      menu: "/views/partials/menu.hbs",
      listplaylists: "/views/partials/listplaylists.hbs",
      addplaylist: "/views/partials/addplaylist.hbs",
      listsongs:"/views/partials/listsongs.hbs",
      addsong: "/views/partials/addsong.hbs",
    }
  }
});

fastify.register(require("fastify-formbody"));

fastify.register(require("fastify-cookie"), {
  secret: "my-secret", // for cookies signature
  parseOptions: {}     // options for parsing cookies
});

const register = require("./routes");

register(fastify);
fastify.listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
