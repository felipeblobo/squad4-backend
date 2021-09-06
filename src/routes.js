const express = require("express");
const UserController = require("./controllers/UserController");
const SchedulingController = require("./controllers/SchedulingController");

const routes = express.Router();

routes.get("/colaboradores", UserController.listUsers);
routes.get("/colaboradores/:id", UserController.userById);
routes.post("/colaboradores", UserController.userRegistration);

routes.get("/agendamentos", SchedulingController.listScheduling);
routes.get(
  "/agendamentos/colaborador/:id",
  SchedulingController.listSchedulingByUserId,
);
routes.get("/agendamentos/data", SchedulingController.schedulingByDate);
routes.post("/agendamentos", SchedulingController.registerScheduling);
routes.put("/agendamentos/:id", SchedulingController.updateScheduling);
routes.delete("/agendamentos/:id", SchedulingController.deleteScheduling);

module.exports = routes;
