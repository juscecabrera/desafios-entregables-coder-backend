
const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./products_list.txt"
    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
            code: this.#getCode(),
            title,
            description,
            price,
            thumbnail,
            stock
        }
        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products));

    }

    getProducts() {
        let productsFile = fs.readFileSync(this.path, "utf8")
        return productsFile; 
    }

    #getCode() {
        if(this.products.length === 0) {
            return 1
        } else {
            return this.products[this.products.length - 1].code++;
        }
    }

    getProductById(id) {
        let productsFile = fs.readFileSync(this.path, "utf8")
        if (JSON.parse(productsFile).filter(product => product.code === id ).length === 0) {
            return ("Not found")
        } 
        return JSON.parse(productsFile).filter(product => product.code === id )
    }
}

const PM = new ProductManager();

PM.addProduct("titulo", "description", 200, "Sin imagen","stock");
PM.addProduct("titulo2", "description2", 300, "Sin imagen2", "stock2");
PM.addProduct("titulo2", "description2", 300, "Sin imagen2", "stock2");

console.log(PM.getProducts());

console.log(PM.getProductById(1));