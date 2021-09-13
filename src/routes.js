const express = require("express");
const UserController = require("./controllers/UserController");
const SchedulingController = require("./controllers/SchedulingController");
const login = require('./middlewares/login');
const RoomSchedulingController = require("./controllers/RoomSchedulingController");

const routes = express.Router();

routes.get("/colaboradores", login, UserController.listUsers);
routes.get("/colaboradores/:id", login, UserController.userById);
routes.post("/colaboradores", UserController.userRegistration);
routes.put("/login/firstaccess/:id", UserController.updateRegister);
routes.post("/login", UserController.login);
routes.get("/colaboradores/verificacao/:token", UserController.modifyUserWithVerifiedEmail);

routes.get("/agendamentos", login, SchedulingController.listScheduling);
routes.get("/agendamentos/:id", login, SchedulingController.listSchedulingById);
routes.get(
  "/agendamentos/colaborador/:id", login,
  SchedulingController.listSchedulingByUserId,
);
routes.get("/agendamentos/data", login, SchedulingController.schedulingByDate);
routes.post("/agendamentos", login, SchedulingController.registerScheduling);
routes.put("/agendamentos/:id", login, SchedulingController.updateScheduling);
routes.delete("/agendamentos/:id", login, SchedulingController.deleteScheduling);

routes.get("/reunioes", login, RoomSchedulingController.listRoomScheduling);
routes.get("/reunioes/:id", login, RoomSchedulingController.getRoomBydId);
routes.get("/reunioes/user/:id", login, RoomSchedulingController.getRoomByUserId);
routes.post("/reunioes", login, RoomSchedulingController.registerOfficeScheduling);
routes.put("/reunioes/:id", login, RoomSchedulingController.updateRoomScheduling);
routes.delete("/reunioes/:id", login, RoomSchedulingController.deleteRoomScheduling);

module.exports = routes;
