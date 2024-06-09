import axios from "axios";
const baseUrl = "http://localhost:3001/generos";

class GeneroService {
  async getGeneros(token: string | null, page: number) {
    return await axios
      .get(`${baseUrl}/listar?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  getGenero(id: any, token: any) {
    return axios
      .get(`${baseUrl}/buscar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  addGenero(data: any, token: any) {
    return axios
      .post(`${baseUrl}/registrar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  deleteGenero(id: any, token: any) {
    return axios
      .delete(`${baseUrl}/remover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Erro ao remover gênero", error);
      });
  }

  updateGenero(id: any, data: any, token: any) {
    return axios
      .put(`${baseUrl}/atualizar/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

export default new GeneroService();
