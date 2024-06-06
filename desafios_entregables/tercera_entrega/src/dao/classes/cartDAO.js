import cartModel from "../models/cartModel.js";

export default class Cart {

    async createCart (cart) {
        const {products} = cart
        try {
            const result = await cartModel.create({products})
            return result
        } catch (err) {
            console.error(err.message);
            throw new Error("Error al crear el carrito");
        }
    }

    async getCartByID(id) {
        const cart = await cartModel.findOne({_id: id})
        if(!cart) {
            throw new Error(`No existe el carrito ${id}`)
        } else {
            return cart;
        }
    }

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

    async deleteProductInCart(cid, pid) {
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
    
    async updateCart(cid, product, quantity) {
        try {
            const cart = await this.getCartByID(cid)

            if(cart){
                cart.products = {product: product, quantity: quantity}
                await cartModel.updateOne({_id:cid}, cart)
                return console.log(cart.products)
            } else {
                return console.log(`No existe el carrito con id ${cid}`)
            }
        } catch(err) {
            console.error(err.message);
            throw new Error(`Error al actualizar los productos en el carrito ${cid}`)
        }
    }

    async updateQuantity(cid, pid, quantity) {
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
    
    async emptyCart(cid) {
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

    //Terminar esto
    async purchaseCart(cid) {
        //1. Corroborar stock de los productos 
        //1a. Producto tiene suficiente stock = restarlo del stock del producto y continuar
        //1b. Producto NO tiene suficiente stock = no agregar el producto al proceso de compra 
        
        //2. Al final, utilizar el servicio de tickets para poder generar un ticket con los datos de la compra
        //3. En caso de existir una compra no completada, devolver el arreglo de los ids de los productos que no pudieron procesarse
        //4. Una vez finalizada la compra, el carrito deberá contener solo los productos que no pudieron comprarse. Se filtran los comprados y se quedan los que no tenian stock.
        try {
            let amount = 0
            const purchase_datatime = Date.now()
            const cart = await cartModel.findOne({_id: cid});
            cart.products.map(prod => {
                if (prod.quantity < prod.product.stock) {
                    amount += prod.quantity * prod.product.price
                    console.log("Suficiente stock de:", prod.product.title , "Stock:", prod.product.stock, "Quantity:", prod.quantity)
                } else {
                    console.log("No hay suficiente stock de: ", prod.product.title)
                }
            })
            console.log("Precio total: ", amount)
            console.log("Fecha:", purchase_datatime)
            // const purchaser = 
            

        } catch (err) {
            console.error(err.message)
            throw new Error("Error al finalizar compra")
        }
    }
}