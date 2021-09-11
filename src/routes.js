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

routes.get("/api/v1/agendamentos", login, cors(), SchedulingController.listScheduling);
routes.get("/api/v1/agendamentos/:id", login, cors(), SchedulingController.listSchedulingById);
routes.get(
  "/api/v1/agendamentos/colaboradores/:id", login, cors(),
  SchedulingController.listSchedulingByUserId,
);
routes.get("/api/v1/agendamentos/data", login, cors(), SchedulingController.schedulingByDate);
routes.post("/api/v1/agendamentos", cors(), login, SchedulingController.registerScheduling);
routes.put("/api/v1/agendamentos/:id", login, cors(), SchedulingController.updateScheduling);
routes.delete("/api/v1/agendamentos/:id", login, cors(), SchedulingController.deleteScheduling);

routes.get("/api/v1/reunioes", login, cors(), RoomSchedulingController.listRoomScheduling);
routes.get("/api/v1/reunioes/:id", login, cors(), RoomSchedulingController.getRoomBydId);
routes.get("/api/v1/reunioes/colaboradores/:id", login, cors(), RoomSchedulingController.getRoomByUserId);
routes.post("/api/v1/reunioes", login, cors(), RoomSchedulingController.registerOfficeScheduling);
routes.put("/api/v1/reunioes/:id", login, cors(), RoomSchedulingController.updateRoomScheduling);
routes.delete("/api/v1/reunioes/:id", login, cors(), RoomSchedulingController.deleteRoomScheduling);

module.exports = routes;
