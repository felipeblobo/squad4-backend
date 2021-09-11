const express = require("express");
const UserController = require("./controllers/UserController");
const SchedulingController = require("./controllers/SchedulingController");
const login = require('./middlewares/login');
const RoomSchedulingController = require("./controllers/RoomSchedulingController");
const cors = require('cors');

const routes = express.Router();

routes.get("/api/v1/colaboradores", login, cors(), UserController.listUsers);
routes.get("/api/v1/colaboradores/:id", login, cors(), UserController.userById);
routes.post("/api/v1/colaboradores", cors(), UserController.userRegistration);
routes.post("/api/v1/login", cors(), UserController.login);
routes.get("/api/v1/colaboradores/verificacao/:token", cors(), UserController.modifyUserWithVerifiedEmail);

routes.get("/api/v1/agendamentos", login, SchedulingController.listScheduling);
routes.get("/api/v1/agendamentos/:id", login, SchedulingController.listSchedulingById);
routes.get(
  "/api/v1/agendamentos/colaboradores/:id", login,
  SchedulingController.listSchedulingByUserId,
);
routes.get("/api/v1/agendamentos/data", login, SchedulingController.schedulingByDate);
routes.post("/api/v1/agendamentos", cors(), login, SchedulingController.registerScheduling);
routes.put("/api/v1/agendamentos/:id", login, SchedulingController.updateScheduling);
routes.delete("/api/v1/agendamentos/:id", login, SchedulingController.deleteScheduling);

routes.get("/api/v1/reunioes", login, RoomSchedulingController.listRoomScheduling);
routes.get("/api/v1/reunioes/:id", login, RoomSchedulingController.getRoomBydId);
routes.get("/api/v1/reunioes/colaboradores/:id", login, RoomSchedulingController.getRoomByUserId);
routes.post("/api/v1/reunioes", login, RoomSchedulingController.registerOfficeScheduling);
routes.put("/api/v1/reunioes/:id", login, RoomSchedulingController.updateRoomScheduling);
routes.delete("/api/v1/reunioes/:id", login, RoomSchedulingController.deleteRoomScheduling);

module.exports = routes;
