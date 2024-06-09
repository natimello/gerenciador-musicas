import { Musica } from "@/models/musica";
import axios from "axios";

const baseUrl = "http://localhost:3001/musicas";
const localBaseUrl = "http://localhost:3001/musicas";
const vagalumeBaseUrl = "https://api.vagalume.com.br";
const apiKey = process.env.VAGALUME_API_KEY;

require("dotenv").config();

class MusicaService {
  async getMusicas(token: string | null, page: number) {
    return await axios
      .get(`${baseUrl}/listar?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async getMusicaById(
    id: string | number,
    token: string | null
  ): Promise<Musica | null> {
    try {
      const localResponse = await axios.get<Musica>(
        `${localBaseUrl}/buscar/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (localResponse.data) {
        return localResponse.data;
      }

      const vagalumeResponse = await axios.get(
        `${vagalumeBaseUrl}/search.excerpt`,
        {
          params: {
            apiKey: apiKey,
            q: id,
          },
        }
      );

      if (vagalumeResponse.data.response.docs.length > 0) {
        const musicaExterna = vagalumeResponse.data.response.docs[0];
        const musica: Musica = {
          id: musicaExterna.id,
          nome: musicaExterna.title,
          id_autor: null,
          id_genero: null,
          duracao: null,
          descricao: null,
          link_cifra: null,
          link_video: null,
          album: null,
          link_letra: `${vagalumeBaseUrl}${musicaExterna.url}`,
        };
        return musica;
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar música:", error);
      return null;
    }
  }

  async searchMusicas(
    parametro: string,
    token: string | null
  ): Promise<Musica[]> {
    try {
      // buscar na API local
      const localResponse = await axios.get<Musica[]>(
        `${localBaseUrl}/buscar/${parametro}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (localResponse.data) {
        return localResponse.data;
      }

      // busca na API externa
      const vagalumeResponse = await axios.get(
        `${vagalumeBaseUrl}/search.artmus`,
        {
          params: {
            apiKey: apiKey,
            q: parametro,
          },
        }
      );

      if (vagalumeResponse.data.response.docs.length > 0) {
        const musicasExternas = vagalumeResponse.data.response.docs.map(
          (doc: any) => ({
            id: doc.id,
            nome: doc.title,
            id_autor: null,
            id_genero: null,
            duracao: null,
            descricao: null,
            link_cifra: null,
            link_video: null,
            album: null,
            link_letra: null,
          })
        );

        return musicasExternas;
      }

      return [];
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      return [];
    }
  }

  async addMusica(data: any, token: any) {
    return await axios
      .post(`${baseUrl}/registrar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  }

  async deleteMusica(id: any, token: any) {
    return await axios
      .delete(`${baseUrl}/remover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  }

  async updateMusica(id: any, data: any, token: any) {
    return await axios
      .put(`${baseUrl}/atualizar/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  }
}

export default new MusicaService();
