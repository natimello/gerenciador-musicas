import axios from "axios";
const baseUrl = "http://localhost:3001/autores";

class AutorService {
  async getAutors(token: string | null, page: number) {
    return await axios
      .get(`${baseUrl}/listar?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  getAutor(id: any, token: any) {
    return axios
      .get(`${baseUrl}/buscar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  addAutor(data: any, token: any) {
    return axios
      .post(`${baseUrl}/registrar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  deleteAutor(id: any, token: any) {
    return axios
      .delete(`${baseUrl}/remover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Erro ao remover autor", error);
      });
  }

  updateAutor(id: any, data: any, token: any) {
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

export default new AutorService();
