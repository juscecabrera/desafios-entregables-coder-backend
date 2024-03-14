import fs from "fs";

export class ProductManager {
    constructor() {
        this.path = "./Products.json"
    }

    addProduct(product) {
        const newProduct = {
            id: this.#getID(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock
        };
        const products = this.getProducts();
        products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));

    }

    getProducts() {
        let productsFile = fs.readFileSync(this.path, "utf8")
        return JSON.parse(productsFile); 
    }

    #getID() {
        const products = this.getProducts();

        if(products.length > 0) {
            return parseInt(products[products.length -1].id + 1);
        } else {
            return 1;
        }
    }

    async updateProduct(id, product) {
        const products = await this.getProducts();
        let productUpdated = {};

        for (let key in products) {
            if (products[key].id == id) {
                products[key].title = product.title ? product.title : products[key].title;
                products[key].description = product.description ? product.description : products[key].description;
                products[key].price = product.price ? product.price : products[key].price;
                products[key].thumbnail = product.thumbnail ? product.thumbnail : products[key].thumbnail;
                products[key].stock = product.stock ? product.stock : products[key].stock;

                productUpdated = products[key];
            }
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

            return productUpdated;
        } catch(e) {
            console.error(e);
            return {
                message: "No se pudo actualizar el producto!"
            }
        }

    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const firstLength = products.length;

        const productsFilter = products.filter(product => product.id != id);

        const finalLength = productsFilter.length;

        try {
            if (firstLength == finalLength) {
                throw new Error(`No se eliminó el producto ${id}`);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, "\t"));

            return `El producto ${id} fue eliminado correctamente`;

        } catch(e) {
            return e.message;
        }
    }

    getProductById(id) {
        let productsFile = fs.readFileSync(this.path, "utf8")

        if (JSON.parse(productsFile).filter(product => product.id == id ).length === 0) {
            return ("Not found")
        } else {
            return JSON.parse(productsFile).filter(product => product.id == id )
        }
    }
}


