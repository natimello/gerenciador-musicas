import * as express from "express";
import {
  addAutor,
  deleteAutor,
  getAutor,
  getAutores,
  updateAutor,
} from "../controllers/autor";
import Auth from "../controllers/auth";

const routerAutor = express.Router();

routerAutor.post("/autores/registrar", addAutor);
routerAutor.get("/autores/listar", Auth.hasAuthorization, getAutores);
routerAutor.put("/autores/atualizar/:id", Auth.hasAuthorization, updateAutor);
routerAutor.delete("/autores/remover/:id", Auth.hasAuthorization, deleteAutor);
routerAutor.get("/autores/buscar/:id", Auth.hasAuthorization, getAutor);

export default routerAutor;
