import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Autor } from "../models/autor";

export const getAutores = async (req: Request, res: Response) => {
  try {
    const autors: Autor[] = await AppDataSource.getRepository(Autor).find();
    res.status(200).json(autors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar autores" });
  }
};

export const getAutor = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results: Autor = await AppDataSource.getRepository(Autor).findOneBy({
    id: id,
  });
  if (results == null)
    return res.status(500).json({ message: "Autor não encontrado" });

  return res.status(200).send(results);
};

export const addAutor = async (req: Request, res: Response) => {
  const autor: Autor[] = AppDataSource.getRepository(Autor).create(req.body);
  const results: Autor[] = await AppDataSource.getRepository(Autor).save(autor);
  return res.send(results);
};

export const updateAutor = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const autor: Autor = await AppDataSource.getRepository(Autor).findOneBy({
    id: id,
  });

  AppDataSource.getRepository(Autor).merge(autor, req.body);
  const results: Autor = await AppDataSource.getRepository(Autor).save(autor);
  return res.send(results);
};

export const deleteAutor = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results = await AppDataSource.getRepository(Autor).delete(id);
  return res.send(results);
};
