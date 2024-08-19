import { expect } from 'chai';
import supertest from "supertest";


const requester = supertest("http://localhost:8080")

describe("Test Integración", function () {
    let cartID;
    let productID = "661763bf4ddd42bd4870fd3e";
    let productID2 = "6620614eb2df7a43660c9fc3"
    let testUpdateProduct = {"product": productID2, "quantity": 10}
    let testUpdateProductQuantity = {"quantity": 15}

    describe("Test Cart", function () {
        before(async function () {
            // Crear el carrito antes de ejecutar los tests
            const { _body } = await requester.post("/api/cart")
            cartID = _body._id;
        });
        beforeEach(function () {});
        after( function () {});
        afterEach(function () {});

        it("POST /api/cart/:cid/product/:pid debe agregar el producto al carrito", async function () {
            const { statusCode, ok, _body } = await requester.post(`/api/cart/${cartID}/product/${productID}`)

            console.log(statusCode);
            expect(statusCode).to.equal(200)
        });

        it("GET /api/cart/:cid debe conseguir el carrito segun el ID y tener el producto agregado", async function () {
        
            const { statusCode, ok, _body } = await requester.get(`/api/cart/${cartID}`)

            console.log(_body.products[0].product._id);

            expect(_body.products[0].product).to.have.property("_id").equal(productID);
        });

        it("PUT /api/cart/:cid/product/:pid debe actualizar SOLO la cantidad del producto segun el PID en el carrito segun el CID", async function () {
        
            const { statusCode, ok, _body } = await requester.put(`/api/cart/${cartID}/product/${productID2}`).send(testUpdateProductQuantity)

            console.log(_body);

            expect(statusCode).to.be.equals(200)
        });

        it("PUT /api/cart/:cid debe actualizar el carrito segun el ID", async function () {
        
            const { statusCode, ok, _body } = await requester.put(`/api/cart/${cartID}`).send(testUpdateProduct)

            console.log(_body);

            // expect(statusCode).to.be.equals(200)
        });

        

        it("DELETE /api/cart/:cid/product/:pid debe eliminar SOLO el producto segun el PID en el carrito segun el CID", async function () {
        
            const { statusCode, ok, _body } = await requester.delete(`/api/cart/${cartID}/product/${productID2}`)

            console.log(_body);

            expect(statusCode).to.be.equals(200)
        });

        
        //Problema: al actualizar el carrito, solo me deja actualizarlo a un solo producto


        //El purchase me falla
        it("POST /api/cart/:cid/purchase debe comprar el carrito segun el ID", async function () {
        
            const { statusCode, ok, _body } = await requester.post(`/api/cart/${cartID}/purchase`)

            // console.log(statusCode);
            // console.log(ok);
            // console.log(_body);

            expect(_body).to.have.property("status").equals("success")
        });
        
    })
})
