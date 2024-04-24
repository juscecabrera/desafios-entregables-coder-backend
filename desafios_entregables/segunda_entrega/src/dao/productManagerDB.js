import productModel from './models/productModel.js';

class productManagerDB {

    async addProduct(product) {
        const {title, description, price, stock} = product
        if (!title || !description || !price || !stock) {
            throw new Error('Error al crear el producto');
        }
        try {
            const result = await productModel.create({title, description, price, stock})
            return result
        } catch (err) {
            console.error(err.message);
            throw new Error('Error al crear producto');
        }
        
    }

    async getProducts() {
        return await productModel.find().lean();
    }

    async updateProduct(id, product) {
            const result = await productModel.updateOne({_id: id}, product);
            return result;
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.deleteOne({_id: id});

            if (result.deletedCount === 0) throw new Error(`El producto ${pid} no existe!`);

            return result;
        } catch(error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }
    
    async getProductByID(id) {
        const product = await productModel.findOne({_id: id});

        if (!product) {
            throw new Error(`No existe el producto ${id}`);
        } else {
            return product;
        }        
    }
}

export { productManagerDB };