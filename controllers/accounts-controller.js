"use strict";
import { v4 as uuidv4 } from "uuid";
import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.view("/views/index.hbs", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.view("/views/login-view", viewData);
  },

  logout(request, response) {
    response.cookie("playlist", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.view("/views/signup-view", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuidv4();
    userStore.addUser(user);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.setCookie("playlist", user.email);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login-view");
    }
  },

  async getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return await userStore.getUserByEmail(userEmail);
  }
};
