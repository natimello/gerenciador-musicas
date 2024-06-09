import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Musica } from "../models/musica";
import { Autor } from "../models/autor";
import { Genero } from "../models/genero";
import { In } from "typeorm";

export const getMusicas = async (req: Request, res: Response) => {
  try {
    const musicas: Musica[] = await AppDataSource.getRepository(Musica).find({
      relations: ["autores", "genero"],
    });
    res.status(200).json(musicas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mpusicas" });
  }
};

export const getMusicasPaginadas = async (req: Request, res: Response) => {
  try {
    const ITEMS_PER_PAGE = 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const musicaRepository = AppDataSource.getRepository(Musica);

    const [entities, total] = await musicaRepository.findAndCount({
      skip,
      take: ITEMS_PER_PAGE,
      relations: ["autores", "genero"],
    });

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const response = {
      items: entities,
      page,
      totalPages,
      totalItems: total,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar músicas" });
  }
};

export const getMusicaById = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results: Musica = await AppDataSource.getRepository(Musica).findOne({
    where: { id },
    relations: ["autores", "genero"],
  });
  if (results == null)
    return res.status(500).json({ message: "Música não encontrada" });

  return res.status(200).send(results);
};

export const searchMusicas = async (req: Request, res: Response) => {
  const parametro: string = req.params.parametro;
  try {
    const musicasEncontradas = await AppDataSource.getRepository(Musica)
      .createQueryBuilder("musica")
      .leftJoinAndSelect("musica.autores", "autor")
      .leftJoinAndSelect("musica.genero", "genero")
      .where("musica.nome LIKE :parametro", { parametro: `%${parametro}%` })
      .orWhere("autor.nome_autor LIKE :parametro", {
        parametro: `%${parametro}%`,
      })
      .getMany();
    res.status(200).json(musicasEncontradas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar músicas" });
  }
};

export const addMusica = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      autores,
      generoId,
      duracao,
      descricao,
      link_cifra,
      link_video,
      album,
      link_letra,
    } = req.body;

    if (!nome || !duracao) {
      return res
        .status(400)
        .json({ message: "Nome e duração são campos obrigatórios." });
    }

    let autoresExistentes: Autor[] = [];
    if (autores && autores.length > 0) {
      const autorRepository = AppDataSource.getRepository(Autor);
      autoresExistentes = await autorRepository.find({
        where: {
          id: In(autores),
        },
      });

      if (autoresExistentes.length !== autores.length) {
        return res.status(400).json({
          message: "Pelo menos um dos autores especificados não existe.",
        });
      }
    }

    let generoExistente: Genero | undefined = undefined;
    if (generoId) {
      const generoRepository = AppDataSource.getRepository(Genero);
      generoExistente = await generoRepository.findOneBy({
        id: generoId,
      });
      if (!generoExistente) {
        return res
          .status(400)
          .json({ message: "O gênero especificado não existe." });
      }
    }

    const musica = new Musica();
    musica.nome = nome;
    musica.autores = autoresExistentes;
    musica.genero = generoExistente;
    musica.duracao = duracao;
    musica.descricao = descricao;
    musica.link_cifra = link_cifra;
    musica.link_video = link_video;
    musica.album = album;
    musica.link_letra = link_letra;

    const musicaSalva = await AppDataSource.getRepository(Musica).save(musica);

    res.status(201).json(musicaSalva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar música." });
  }
};

export const updateMusica = async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    const musicaRepository = AppDataSource.getRepository(Musica);

    const musica = await musicaRepository.findOne({
      where: { id: id },
      relations: ["autores", "genero"],
    });

    if (!musica) {
      return res.status(404).json({ message: "Música não encontrada" });
    }

    const {
      nome,
      autores,
      genero,
      duracao,
      descricao,
      link_cifra,
      link_video,
      album,
      link_letra,
    } = req.body;

    let autoresExistentes: Autor[] = [];
    if (autores && autores.length > 0) {
      autoresExistentes = await AppDataSource.getRepository(Autor).find({
        where: {
          id: In(autores),
        },
      });
      if (autoresExistentes.length !== autores.length) {
        return res.status(400).json({
          message: "Pelo menos um dos autores especificados não existe.",
        });
      }
    }

    let generoExistente: Genero | undefined = undefined;
    if (genero) {
      generoExistente = await AppDataSource.getRepository(Genero).findOne({
        where: { id: genero },
      });
      if (!generoExistente) {
        return res
          .status(400)
          .json({ message: "O gênero especificado não existe." });
      }
    }

    musica.nome = nome ?? musica.nome;
    musica.autores =
      autoresExistentes.length > 0 ? autoresExistentes : musica.autores;
    musica.genero = generoExistente ?? musica.genero;
    musica.duracao = duracao ?? musica.duracao;
    musica.descricao = descricao ?? musica.descricao;
    musica.link_cifra = link_cifra ?? musica.link_cifra;
    musica.link_video = link_video ?? musica.link_video;
    musica.album = album ?? musica.album;
    musica.link_letra = link_letra ?? musica.link_letra;

    const musicaAtualizada = await musicaRepository.save(musica);

    return res.status(200).json(musicaAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar música" });
  }
};

export const deleteMusica = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const results = await AppDataSource.getRepository(Musica).delete(id);
  return res.send(results);
};
