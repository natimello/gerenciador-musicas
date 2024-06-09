import * as express from "express";
import {
  addGenero,
  deleteGenero,
  getGenero,
  getGeneros,
  updateGenero,
} from "../controllers/genero";
import Auth from "../controllers/auth";

const routerGenero = express.Router();

routerGenero.post("/generos/registrar", addGenero);
routerGenero.get("/generos/listar", Auth.hasAuthorization, getGeneros);
routerGenero.put("/generos/atualizar/:id", Auth.hasAuthorization, updateGenero);
routerGenero.delete(
  "/generos/remover/:id",
  Auth.hasAuthorization,
  deleteGenero
);
routerGenero.get("/generos/buscar/:id", Auth.hasAuthorization, getGenero);

export default routerGenero;
