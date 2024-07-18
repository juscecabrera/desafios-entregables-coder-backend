import CartDTO from "../dao/dto/cartDTO.js"

//Terminar
//Creo que no voy a usar el DTO porque ninguna de estas pasa por el DTO
export default class CartRepository {
    constructor (dao) {
        this.dao = dao;
    }

    async createCart(cart) {
        return await this.dao.createCart(cart);
    }

    async getCartByID(id) {
        return await this.dao.getCartByID(id)
    }

    async addProductCart(cid, pid, quantity) {
        return await this.dao.addProductCart(cid,pid,quantity)
    }

    async deleteProductInCart(cid, pid) {
        return await this.dao.deleteProductInCart(cid,pid)
    }

    async updateCart(cid, product, quantity) {
        return await this.dao.updateCart(cid, product, quantity)
    }

    async updateQuantity(cid, pid, quantity) {
        return await this.dao.updateQuantity(cid, pid, quantity)
    }

    async emptyCart(cid) {
        return await this.dao.emptyCart(cid)
    }

    async purchaseCart(cid) {
        return await this.dao.purchaseCart(cid)
    }
}