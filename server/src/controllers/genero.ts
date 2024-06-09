import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Genero } from "../models/genero";

export const getGeneros = async (req: Request, res: Response) => {
  try {
    const generos: Genero[] = await AppDataSource.getRepository(Genero).find();
    res.status(200).json(generos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar generos" });
  }
};

export const getGenero = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results: Genero = await AppDataSource.getRepository(Genero).findOneBy({
    id: id,
  });
  if (results == null)
    return res.status(500).json({ message: "Genero não encontrado" });

  return res.status(200).send(results);
};

export const addGenero = async (req: Request, res: Response) => {
  const genero: Genero[] = AppDataSource.getRepository(Genero).create(req.body);
  const results: Genero[] = await AppDataSource.getRepository(Genero).save(
    genero
  );
  return res.send(results);
};

export const updateGenero = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const genero: Genero = await AppDataSource.getRepository(Genero).findOneBy({
    id: id,
  });

  AppDataSource.getRepository(Genero).merge(genero, req.body);
  const results: Genero = await AppDataSource.getRepository(Genero).save(
    genero
  );
  return res.send(results);
};

export const deleteGenero = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results = await AppDataSource.getRepository(Genero).delete(id);
  return res.send(results);
};
