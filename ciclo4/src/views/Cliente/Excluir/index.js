import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ExcluirCliente = (props) => {   

    const [id, setid] = useState(props.match.params.id);
    
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listarclientes")
            .then((response) => {
                //console.log(response.data);
                setData(response.data);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com API.'
                })
            });
    };
    const excluiCliente = async() =>{
        console.log(id);
        const headers={
            'Content-Type' : 'application/json'
        }
        await axios.get(api + "/excluircliente/" + id, {headers})
        .then((response)=>{
            console.log(response.data.error);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possivel conectar a API.'
            })
        })
    }

    useEffect(() => {
        getClientes();
        excluiCliente();
    }, []);

    return (
        <div>
            <Container>
                <div className='d-flex'>
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações dos Clientes</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrar-cliente"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                <Table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Data de Nascimento</th>
                            <th>Cliente Desde</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.clienteDesde}</td>
                                <td className="text-center/">
                                    <div className="d-flex">
                                        <Link to={"/listar-pedidos-cli/" + item.id}
                                            className="btn btn-outline-primary btn-sm m-auto">
                                            Consultar Pedidos
                                        </Link>
                                        <Link to={"/editar-Cliente/" + item.id}
                                            className="btn btn-outline-warning btn-sm">
                                            Editar
                                        </Link>
                                        <Link to={"/excluircliente/" + item.id}
                                            className="btn btn-outline-danger btn-sm m-auto">
                                            Excluir
                                        </Link>
                                    </div>                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};