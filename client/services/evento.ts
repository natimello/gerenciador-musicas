import axios from "axios";
const baseUrl = "http://localhost:3001/eventos";

class EventoService {
  async getEventos(token: string | null, page: number) {
    return await axios
      .get(`${baseUrl}/listar?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  getEvento(id: any, token: any) {
    return axios
      .get(`${baseUrl}/buscar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  addEvento(data: any, token: any) {
    return axios
      .post(`${baseUrl}/registrar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  deleteEvento(id: any, token: any) {
    return axios
      .delete(`${baseUrl}/remover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.status)
      .catch((error) => {
        console.error("Erro ao remover evento", error);
      });
  }

  updateEvento(id: any, data: any, token: any) {
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

export default new EventoService();
