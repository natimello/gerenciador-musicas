import * as express from "express";
import {
  addEvento,
  deleteEvento,
  getEvento,
  getEventos,
  updateEvento,
} from "../controllers/evento";
import Auth from "../controllers/auth";

const routerEvento = express.Router();

routerEvento.post("/eventos/registrar", addEvento);
routerEvento.get("/eventos/listar", Auth.hasAuthorization, getEventos);
routerEvento.put("/eventos/atualizar/:id", Auth.hasAuthorization, updateEvento);
routerEvento.delete(
  "/eventos/remover/:id",
  Auth.hasAuthorization,
  deleteEvento
);
routerEvento.get("/eventos/buscar/:id", Auth.hasAuthorization, getEvento);

export default routerEvento;
