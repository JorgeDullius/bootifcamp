const sequelize = require("../server");
const topic = sequelize.import('../models/Topic');
const subject = sequelize.import('../models/Subject');
class SubjectController{
    async getSubjectByName(req,res){
        try{
            const subjectData = await subject.findOne({ where : {name: req.params.subjectName}});
            if(subjectData){
                const subjectTopics = await topic.findAll({ where: {subjectId: subjectData.id}});
                if(subjectTopics != ""){
                    const teste = subjectTopics.map(topic => {
                        return {
                            "name": topic.name,
                            "content": topic.conteudo
                        }
                    });
                    res.json(teste);
                }else{
                    res.send(`Não existem tópicos cadastrados nessa disciplina`);
                }

            }else{
                res.send("Essa disciplina não existe.");
            }
        }catch(e){
            res.status(500).send(e);
        }        
    }
    async create(req,res){
        try{
            const subjectData = await subject.create(req.body);
            res.send(subjectData);
        }catch(e){
            res.status(500).send(e);
        }
    }
    async deleteSubject(req,res){
        try{
            const NumberOfSubjectsDeleted = await subject.destroy({ where: {name: req.body.subjectName}});
            res.send(`${NumberOfSubjectsDeleted}`);
        }catch(e){
            res.status(500).send(e);
        }
    }
}
module.exports = new SubjectController();