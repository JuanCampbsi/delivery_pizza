const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('pizza').count();
        

        const pizza = await connection('pizza')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
             'pizza.id',
             'pizza.size', 
             'pizza.border',
             'pizza.coverage', 
             'pizza.value']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(pizza);
    },


    async create(request, response){
        const { id, size, border, coverage, value } = request.body;
       
      const [pizza] =   await connection('pizza').insert({
            id,
            size,
            border,
            coverage,
            value,
    
        });    
        return response.json({ pizza });
    },

    async delete(request, response){
        const { id } = request.params;
      

        const pizza = await connection('pizza')
            .where('id', id)
            .select('id')
            .first();

            if (pizza.id != id) {
                return response.status(401).json({ error: 'Operation not permitted.'});
            }
            await connection('pizza').where('id', id).delete();
       
            return response.status(204).send();
    }
};