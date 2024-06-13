import fs from "fs";

export class CartManager {
    constructor() {
        this.path = "../src/Cart.json"
    }

    createCart(products) {
        const newCart = {
            id: this.#getID(),
            products: products
        }
        const shoppingCart = this.getCart();
        shoppingCart.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(shoppingCart, null, "\t"))
    }

    getCart() {
        return JSON.parse(fs.readFileSync(this.path, "utf8"))
    }

    #getID() {
        const cart = this.getCart();

        if(cart.length > 0) {
            return parseInt(cart[cart.length -1].id + 1);
        } else {
            return 1;
        }
    }

    getCartById(id) {
        let cartFile = fs.readFileSync(this.path, "utf8")

        if(JSON.parse(cartFile).filter(cart => cart.id == id).length ===0) {
            return ("Not found")
        } else {
            return JSON.parse(cartFile).filter(cart => cart.id == id )
        }
    }

    addProductCart(pid, cid, quantity = 1) {
        const newProductCart = {
            product: pid,
            quantity: 1
        };
        const carts = this.getCart();
        const indexCart = carts.findIndex(cart => cart.id == cid)
        const cartProducts = this.getCartById(cid)[0]["products"]; 
        cartProducts.push(newProductCart)
        let cartFile = fs.readFileSync("../src/Cart.json", "utf8")

        const existProd = carts[indexCart].products.find(prod => prod.pid == pid)

        if (existProd) {
            existProd.quantity += quantity
        } else {
            carts[indexCart].products = [...carts[indexCart].products, {pid, quantity}]
        }

        console.log({
            carts,
            cart: carts.find(cart => cart.id == cid),
            cart_id: carts.findIndex(cart => cart.id == cid)
        })

        fs.writeFileSync("../src/Cart.json", JSON.stringify(carts, null, "\t"))
        
        return carts
       
        function createNewCart() {
            const newCart = {
                id: parseInt(cid),
                products: cartProducts
            }
            const shoppingCart = JSON.parse(fs.readFileSync("../src/Cart.json", "utf8"));
            shoppingCart.push(newCart)
            fs.writeFileSync("../src/Cart.json", JSON.stringify(shoppingCart, null, "\t"))
        }

        function getCartById(cid) {
            let cartFile = fs.readFileSync("../src/Cart.json", "utf8")
    
            if(JSON.parse(cartFile).filter(cart => cart.id == cid).length ===0) {
                return ("Not found")
            } else {
                return JSON.parse(cartFile).filter(cart => cart.id == cid )
            }
        }

        if (JSON.parse(cartFile).filter(cart => cart.id == cid )) {
            const shoppingCart = JSON.parse(cartFile);
            shoppingCart.splice(shoppingCart.indexOf(getCartById(cid))[0], shoppingCart.indexOf(getCartById(cid)) + 1)
            createNewCart();
        } else {
            createNewCart();
        }
    }

}