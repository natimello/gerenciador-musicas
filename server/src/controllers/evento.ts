import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Evento } from "../models/evento";

export const getEventos = async (req: Request, res: Response) => {
  try {
    const eventos: Evento[] = await AppDataSource.getRepository(Evento).find();
    res.status(200).json(eventos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar eventos" });
  }
};

export const getEvento = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results: Evento = await AppDataSource.getRepository(Evento).findOneBy({
    id: id,
  });
  if (results == null)
    return res.status(500).json({ message: "Evento não encontrado" });

  return res.status(200).send(results);
};

export const addEvento = async (req: Request, res: Response) => {
  const evento: Evento[] = AppDataSource.getRepository(Evento).create(req.body);
  const results: Evento[] = await AppDataSource.getRepository(Evento).save(
    evento
  );
  return res.send(results);
};

export const updateEvento = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const evento: Evento = await AppDataSource.getRepository(Evento).findOneBy({
    id: id,
  });

  AppDataSource.getRepository(Evento).merge(evento, req.body);
  const results: Evento = await AppDataSource.getRepository(Evento).save(
    evento
  );
  return res.send(results);
};

export const deleteEvento = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results = await AppDataSource.getRepository(Evento).delete(id);
  return res.send(results);
};
