"use strict";

export const aboutController = {
  async index(request, response) {
    const viewData = {
      title: "About Playlist 1"
    };
    response.view("/views/about-view", viewData);
  }
};
