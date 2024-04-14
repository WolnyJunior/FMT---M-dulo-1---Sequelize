const { Router } = require('express');
const Professor = require('../models/Professor');

const routes = new Router();

//Rota para listar professores de uma escola
routes.get('/professores', async (req, res) => {
    const professores = await Professor.findAll()
    if (professores.length === 0) {
        return res.status(404).json({ error: 'Nenhum Professor encontrado' });
    }
    res.json(professores)
})

//Rota para buscar professor por nome
routes.get('/professor', async (req, res) => {
    try {
        let params = {}

        if (req.query.nome) {
            params = { ...params, nome: req.query.nome }
        }

        //busca no Banco de Dados, caso o parâmetro de busca esteja correto
        const professores = await Professor.findAll({
            where: params
        })

        //Retorna uma mensagem se o parâmetro de busca estiver errado.
        if (professores.length === 0) {
            return res.status(404).json({ error: 'Nenhum Professor encontrado' });
        }
        res.json(professores)
    } catch (error) { }
})

//Rota para adicionar um(a) novo(a) professor(a)
routes.post('/professores', async (req, res) => {

    try {
        const nome = req.body.nome
        const nivel = req.body.nivel
        const aniversario = req.body.aniversario


        if (!nome || !nivel || !aniversario) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
        }

        const professor = await Professor.create({
            nome: nome,
            nivel: nivel,
            aniversario: aniversario
        })
        res.status(201).json(professor)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível cadastrar o(a) professor(a).' })
    }
})

//Rota para atualizar dados de um(a) professor(a) do banco de dados
routes.put('/professores/:id', async (req, res) => {

    const id = req.params.id
    const professor = await Professor.findByPk(id)

    if (!professor) {
        return res.status(404).json({ mensagem: 'Professor não encontraddo' })
    }
    professor.update(req.body)

    await professor.save()

    res.json(professor)
})

//Rota para deletar um(a) professor(a) do banco de dados
routes.delete('/professores/:id', async (req, res) => {
    const id = req.params.id

    professor = await Professor.findByPk(id);
    if (!professor) {
        return res.status(404).json({ error: 'ID não encontrado.' })
    }
    await Professor.destroy({
        where: {
            id: id
        }
    })
    res.status(204).json({ message: 'Professor deletado.' })
})

module.exports = routes;