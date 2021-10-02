"use strict";

const about = {
  async index(request, response) {
    const viewData = {
      title: "About Playlist 1"
    };
    response.view("/views/about", viewData);
  }
};

module.exports = about;
