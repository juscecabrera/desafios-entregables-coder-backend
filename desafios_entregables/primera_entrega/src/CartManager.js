import fs from "fs";

export class CartManager {
    constructor() {
        this.path = "./Cart.json"
    }

    createCart() {
        const newCart = {
            id: this.#getID(),
            products: []
        }
        const shoppingCart = this.getCart();
        shoppingCart.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(shoppingCart, null, "\t"))
    }

    getCart() {
        let cartFile = fs.readFileSync(this.path, "utf8")
        return JSON.parse(cartFile); 
    }

    #getID() {
        const cart = this.getCart();

        if(cart.length > 0) {
            return parseInt(cart[cart.length -1].id + 1);
        } else {
            return 1;
        }
    }

    getProductById(id) {
        let cartFile = fs.readFileSync(this.path, "utf8")

        if (JSON.parse(cartFile).filter(product => product.id == id ).length === 0) {
            return ("Not found")
        } else {
            return JSON.parse(cartFile).filter(product => product.id == id )
        }
    }

    getCartById(id) {
        let cartFile = fs.readFileSync(this.path, "utf8")

        if(JSON.parse(cartFile).filter(newCart => newCart.id == id).length ===0) {
            return ("Not found")
        } else {
            return JSON.parse(cartFile).filter(newCart => newCart.id == id )
        }
    }

    addProductCart(pid, cid) {
        const newProductCart = {
            product: pid,
            quantity: 1
        };
        const products = this.getCartById(cid)
        products.push(newProductCart)
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
    }

}


