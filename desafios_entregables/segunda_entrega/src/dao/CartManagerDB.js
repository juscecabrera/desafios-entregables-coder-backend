import cartModel from "./models/cartModel.js";
import productModel from './models/productModel.js';

class CartManagerDB {
    //FUNCIONA
    async createCart (cart) {
        //el id es auto generado por mongo
        const {products} = cart
        try {
            const result = await cartModel.create({products})
            return result
        } catch (err) {
            console.error(err.message);
            throw new Error("Error al crear el carrito");
        }
    }

    //FUNCIONA
    async getCartByID(id) {
        //Este id es el de mongo
        const cart = await cartModel.findOne({_id: id})
        if(!cart) {
            throw new Error(`No existe el carrito ${id}`)
        } else {
            return cart;
        }
    }

    //FUNCIONA
    // faltaria buscar si el producto existe y aumentar la quantity en uno si lo encuentra
    async addProductCart(cid, pid, quantity) {
        try {           
            const cart = await cartModel.findOne({_id: cid});

            for (let i = 0; i < cart.products.length; i++) {
                const existProd = cart.products[0].product.id
        
                if (existProd) {
                    //Falta el codigo que agregue uno a quantity y sacar los console.log
                  console.log(`Existe el producto con id: ${existProd}`)  
                  console.log("Aqui agregar 1 a quantity")
                } else {
                    console.log(`No existe el producton con id: ${existProd}`)
                    cart.products.push({product: pid, quantity: quantity})
                    await cartModel.updateOne({_id:cid}, cart)
                    console.log(JSON.stringify(cart, null, "\t"))
                }
            }
        } catch (err) {
            console.error(err.message);
            throw new Error("Error al agregar el producto al carrito")
        }
    }

    //FALTA
    async deleteProductInCart(cid, pid) {
        //deberá eliminar del carrito el producto seleccionado.
        //Buscar el carrito con id == cid y eliminar el producto con id == pid dentro de ese carrito
        try {
            const cart = await this.getCartByID(cid)
        } catch (err) {
            console.error(err.message)
            throw new Error("Error al eliminar el producto en el carrito")
        }
    }
    
    //FALTA
    async updateCart(cid) {
        //Tiene que actualizar los productos Y cantidades de un carrito
        //Usar el updateOne
        try {
            const result = await cartModel.updateOne({_id: cid}, products)
            return result;
        } catch(err) {
            console.error(err.message);
            throw new Error("Error al actualizar el producto en el carrito")
        }
    }

    //FALTA
    async updateQuantity(cid, pid) {
        //Tiene que actualizar SOLO las cantidades de un producto en un carrito especifico
        //1. Encontrar el carrito con id == cid con funcion getCartById
        //2. Encontrar el producto con id == pid dentro del carrito
        //3. Actualizar solo la cantidad segun el req.body
        try {
            // const result = await cartModel.updateOne({_id: cid}, products);
            // return result;
        } catch (err) {

        }
    }
    
    //FALTA
    async emptyCart(cid) {
        //Vaciara el carrito, pero no lo eliminará
        //1. Encontrar el carrito con id == cid con funcion getCartById
        //2. Igualar el array de productos a []
        try {
            const result = await cartModel.deleteOne({_id: cid}, {$set: {"products": []}})
            return result;
        } catch (err) {
            console.error(err.message)
            throw new Error("Error al vaciar el carrito")
        }
    }
}

export { CartManagerDB }