import React, {useState, useEffect, useContext} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {FaEdit, FaTrash} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import AuthContext from "@/components/authContext";
import Pagination from "@/components/pagination";

const ListarUsuarios = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [usuarios, setUsuarios] = useState<any>(null)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        UsuarioService.getUsuarios(token, currentPage).then((data) => {
            setUsuarios(data.items)
            setTotalPages(data.totalPages)
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error)
            setError(error)
        })
    }, [currentPage])

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    }

    const handleRemove = async (id: any) => {
        UsuarioService.deleteUsuario(id, token).then((data) => {
            setUsuarios(usuarios.filter((usuario: { id: any }) => usuario.id !== id))
        }).catch((error) => {
            console.error('Erro ao deletar usuario:', error)
            setError(error)
        })
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!usuarios) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={handlePageChange}
            />
            <h3>Lista de Usuarios</h3>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {usuarios.map((usuario: any) => (
                    <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.username}</td>
                        <td>
                            <Button onClick={() => navigate(`/atualizar/${usuario.id}`)}>
                                <FaEdit />
                            </Button>
                            <Button onClick={() => handleRemove(usuario.id)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ListarUsuarios