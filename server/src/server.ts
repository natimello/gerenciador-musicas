import express from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import routerUsuario from "./routes/usuario";
import routerLogin from "./routes/login";
import { seedUsers } from "./seeders/usuario";
import routerAutor from "./routes/autor";
import routerMusica from "./routes/musica";
import routerEvento from "./routes/evento";
import routerGenero from "./routes/genero";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    /*seedUsers().then(
      r => console.log("feito")
  ).catch(
      err => console.log(err)
  )*/
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.use("/", routerUsuario);
app.use("/", routerLogin);
app.use("/", routerAutor);
app.use("/", routerMusica);
app.use("/", routerEvento);
app.use("/", routerGenero);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
