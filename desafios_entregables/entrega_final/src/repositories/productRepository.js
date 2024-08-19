

export default class ProductRepository {
    constructor (dao) {
        this.dao = dao;
    }

    async addProduct(product) {
        return await this.dao.addProduct(product)
    }

    async getProducts() {
        return await this.dao.getProducts();
    }

    async updateProduct(id, product) {
        return await this.dao.updateProduct(id, product);
    }

    async deleteProduct(id) {
        return await this.dao.deleteProduct(id);
    }

    async getProductByID(id) {
        return await this.dao.getProductByID(id)
    }
}