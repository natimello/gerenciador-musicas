import React, {useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate, useParams} from 'react-router-dom'
import UsuarioService from "@/services/usuarioService";
import AuthContext from "@/components/authContext";

const Registrar = () => {
    const { itemId } = useParams()
    const [itemData, setItemData] = useState<any>(null)
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: '',
        nome: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        console.log(itemId)
        UsuarioService.getUsuario(itemId, token).then((data: any) => {
            setItemData(data)
        }).catch()
    }, [itemId])

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission

        UsuarioService.updateUsuario(itemId, formData, token).then( (data) => {
            console.log('Usuario adicionado:')
             if(data === 204) {
                 navigate('/listar')
             }
            setFormData({
                username: '',
                nome: '',
                email: '',
                password: '',
            })
        }).catch( (error: { data: any; }) => {
            console.log('Erro ao adicionar o usuario:', error)
        })
    }

    if (!itemData) {
        return (
            <h4>Carregando</h4>
        )
    }

    return (
        <div className={"formulario"}>
            <h2>Atualizar Usuario</h2>
            <Form onSubmit={handleSubmit} className={"formulario"}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        id="nome"
                        name="nome"
                        value={formData.nome || itemData.nome}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="email"
                        id="email"
                        name="email"
                        value={formData.email || itemData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="usuário"
                                id="username"
                                name="username"
                                value={formData.username || itemData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="senha"
                                id="password"
                                name="password"
                                value={formData.password || itemData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registrar;