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
    async addProductCart(cid, pid, quantity) {
        try {           
            const cart = await cartModel.findOne({_id: cid});
            
            for (let i = 0; i <= cart.products.length; i++) {
                
                const existeProd = cart.products[i]
                
                if (existeProd && cart.products[i].product.id == pid) {
                  cart.products[i].quantity++
                  await cartModel.updateOne({_id: cid}, cart)
                  return console.log(`Se actualizo la quantity del producto ${pid}`)
                } else {
                    cart.products.push({product: pid, quantity: quantity})
                    await cartModel.updateOne({_id:cid}, cart)
                    return console.log(JSON.stringify(cart, null, "\t"))
                }
            }
        } catch (err) {
            console.error(err.message);
            throw new Error("Error al agregar el producto al carrito")
        }
    }

    //FUNCIONA
    async deleteProductInCart(cid, pid) {
        //deberá eliminar del carrito el producto seleccionado.
        try {
            const cart = await this.getCartByID(cid)

            for (let i = 0; i < cart.products.length; i++) {
                const existeProd = cart.products[i]
                
                if (existeProd && cart.products[i].product.id == pid){
                    cart.products.splice(i,1)
                    await cartModel.updateOne({_id: cid}, cart)
                    return console.log(`Se elimino el producto con id ${pid} del carrito`)
                } else {
                    return console.log(`No existe el producto con id ${pid}`)
                }
            }
            console.log(cart.products)

        } catch (err) {
            console.error(err.message)
            throw new Error("Error al eliminar el producto en el carrito")
        }
    }
    
    //FALTA
    async updateCart(cid) {
        //Tiene que actualizar los productos Y cantidades de un carrito
        try {
            const cart = await this.getCartByID(cid)

            for (let i = 0; i < cart.products.length; i++) {
                const existeProd = cart.products[i].product.id

                if(existeProd == pid){
                    // cart.products.splice(i,1)
                    await cartModel.updateOne({_id: cid}, cart)
                    return console.log(`Se elimino el producto con id ${pid} del carrito`)
                } else {
                    return console.log(`No existe el producto con id ${pid}`)
                }
            }
            console.log(cart.products)
        } catch(err) {
            console.error(err.message);
            throw new Error("Error al actualizar el producto en el carrito")
        }
    }

    //FUNCIONA
    async updateQuantity(cid, pid, quantity) {
        //Tiene que actualizar SOLO las cantidades de un producto en un carrito especifico
        try {
            const cart = await cartModel.findOne({_id: cid});

            for (let i = 0; i < cart.products.length; i++) {
                const existeProd = cart.products[i]
                
                if (existeProd && cart.products[i].product.id == pid) {
                  cart.products[i].quantity = quantity
                  return await cartModel.updateOne({_id: cid}, cart)
                } else {
                    return console.log(`No existe el producto ${pid}`)
                }
            }
        } catch (err) {
            console.error(err.message);
            throw new Error("Error al actualizar la cantidad del producto en el carrito")
        }
    }
    
    //FUNCIONA
    async emptyCart(cid) {
        //Vaciara el carrito, pero no lo eliminará
        try {
            const cart = await cartModel.findOne({_id: cid});
            cart.products = []
            await cartModel.updateOne({_id: cid}, cart)
            return console.log(cart.products)
        } catch (err) {
            console.error(err.message)
            throw new Error("Error al vaciar el carrito")
        }
    }
}

export { CartManagerDB }