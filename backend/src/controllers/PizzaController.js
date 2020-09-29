const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('pizza').count();
        

        const pizza = await connection('pizza')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
             
             'ongs.size', 
             'ongs.border',
             'ongs.coverager', 
             'ongs.value']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(pizza);
    },


    async create(request, response){
        const { title, description, value } = request.body;
        const id = request.headers.authorization;

      const [id] =   await connection('pizza').insert({
            
            size,
            border,
            coverage,
            value
    
        });    
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
      

        const pizza = await connection('pizza')
            .where('id', id)
            .select('id')
            .first();

     await connection('pizza').where('id', id).delete();

     return response.status(204).send();

    }
};