
const express = require('express');
const servidor = express();

/* Permite o envio de JSON no corpo do BODY pelo metodo POST */
servidor.use(express.json());

const usuarios = ['Gabriel Ruiz','Aline Lins', 'Luana Lins', 'Angela Lins', 'Rogerio Lins'];

/* Middlawares */
function verificaCodigo(req,res,next) {
    if(!usuarios[req.params.codigo]) {
        return res.status(400).json({"codigo": `Codigo ${req.params.codigo} não encontrado, por favor verifique...`});
    }
    next();
}

function verificaNome(req,res,next){
    if(!req.body.nome){
        return res.status(400).json({"nome": "Nome não informado"})
    }
    next();
}

/* Rota GET para listar UM usuario */
servidor.get('/usuarios/:codigo', verificaCodigo, (req,res,next)=>{
    console.log(`Listando UM usuario...`);
    const { codigo } = req.params;
    return res.json(usuarios[codigo]);
});

/* Rota GET para listar os usuarios */
servidor.get('/usuarios',(req,res)=>{
    console.log(`Listando TODOS os usuarios...`);
    return res.json(usuarios);
});

/* Rota POST para adicionar UM usuario */
servidor.post('/usuarios',verificaNome, (req,res,next)=>{
    console.log(`Adicionando um novo usuario...`);
    const { nome } = req.body;
    usuarios.push(nome);
    /* Retorna OK */
    return res.status(200).send();
});

/* Rota PUT para modificar um usuario */
servidor.put('/usuarios/:codigo', verificaCodigo, verificaNome, (req,res, next)=>{
    console.log(`Modificando usuario...`);
    const { nome } = req.body;
    const { codigo } = req.params;
    usuarios[codigo] = nome;
    return res.status(200).send();
});

/* Rota DELETE para deletar um usuario */
servidor.delete('/usuarios/:codigo',(req,res)=>{
    console.log(`Eliminando usuario...`);
    const { codigo } = req.params;
    usuarios.splice(codigo,1);
    return res.status(200).send();
});

console.log(`Executando o primeiroScript na porta: 2222`);
servidor.listen(2222);

