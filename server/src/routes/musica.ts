import * as express from "express";
import {
  addMusica,
  deleteMusica,
  getMusicaById,
  searchMusicas,
  updateMusica,
  getMusicasPaginadas,
} from "../controllers/musica";
import Auth from "../controllers/auth";

const routerMusica = express.Router();

routerMusica.post("/musicas/registrar", addMusica);
routerMusica.get("/musicas/listar", Auth.hasAuthorization, getMusicasPaginadas);
routerMusica.put("/musicas/atualizar/:id", Auth.hasAuthorization, updateMusica);
routerMusica.delete(
  "/musicas/remover/:id",
  Auth.hasAuthorization,
  deleteMusica
);
routerMusica.get(
  "/musicas/buscarPorId/:id",
  Auth.hasAuthorization,
  getMusicaById
);
routerMusica.get(
  "/musicas/buscar/:parametro",
  Auth.hasAuthorization,
  searchMusicas
);

export default routerMusica;
