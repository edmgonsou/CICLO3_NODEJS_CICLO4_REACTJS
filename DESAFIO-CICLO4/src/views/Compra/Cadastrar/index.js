import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarComp = ()=>{

    const [compra, setCompra] = useState({
        dataCompra: '',
        ClienteId: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra,[e.target.name]: e.target.value
    });

    const cadCompra = async e =>{
        e.preventDefault();
        console.log(compra);

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api+"/CadCompraCli",compra,{headers})
        .then((response)=>{            
            if (response.data.erro){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            }
        })
        .catch(()=>{
            console.log("Erro: sem conexão com a API.")
        });
    };
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listarcompra"
                        className="btn btn-outline-success">Voltar</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === "error" ? 
            <Alert color="danger">{status.message}</Alert>: ""}

            {status.type === 'success' ? <Alert color='success'>{status.message}</Alert>: ""}

            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>Data do Compra</Label>
                    <Input type="date" name="dataCompra" placeholder="Data da compra" 
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Id do Cliente</Label>
                    <Input type="text" name="ClienteId" placeholder="Id do cliente" 
                    onChange={valorInput}/>
                </FormGroup>                
                <Button className="separaBot p-2" type="submit" outline color="success">Cadastrar</Button>
                <Button className="p-2" type="reset" outline color="success">Limpar</Button>
            </Form>
        </Container>

    )
}