const express = require("express");
const UserController = require("./controllers/UserController");
const SchedulingController = require("./controllers/SchedulingController");
const login = require('./middlewares/login');
const RoomSchedulingController = require("./controllers/RoomSchedulingController");

const routes = express.Router();

routes.get("/colaboradores", login, UserController.listUsers);
routes.get("/colaboradores/:id", login, UserController.userById);
routes.post("/colaboradores", UserController.userRegistration);
routes.post("/login", UserController.login);
routes.get("/colaboradores/verificacao/:token", UserController.modifyUserWithVerifiedEmail);

routes.get("/agendamentos", login, SchedulingController.listScheduling);
routes.get(
  "/agendamentos/colaborador/:id", login,
  SchedulingController.listSchedulingByUserId,
);
routes.get("/agendamentos/data", login, SchedulingController.schedulingByDate);
routes.post("/agendamentos", login, SchedulingController.registerScheduling);
routes.put("/agendamentos/:id", login, SchedulingController.updateScheduling);
routes.delete("/agendamentos/:id", login, SchedulingController.deleteScheduling);

routes.get("/reunioes", RoomSchedulingController.listRoomScheduling);
routes.post("/reunioes", RoomSchedulingController.registerOfficeScheduling);
routes.put("/reunioes/:id", RoomSchedulingController.updateRoomScheduling);
routes.delete("/reunioes/:id", RoomSchedulingController.deleteRoomScheduling);

module.exports = routes;
