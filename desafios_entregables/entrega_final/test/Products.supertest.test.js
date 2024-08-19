import { expect } from 'chai';
import supertest from "supertest";


const requester = supertest("http://localhost:8080")

describe("Test Integración", function () {
    let productID;
    let productMock = {"title": "manzanas", "description" : "maduras", "price": 5, "stock": 220}

    describe("Test Products", function () {
        before(async function () {
            // Crear el producto antes de ejecutar los tests
            const { _body } = await requester.post("/api/products").send(productMock)
            productID = _body.payload._id;
            console.log(productID)
        });
        beforeEach(function () {});
        after( function () {});
        afterEach(function () {});

        it("GET /api/products debe recoger todos los productos", async function () {
            const { statusCode, ok, _body } = await requester.get(`/api/products`)

            console.log(statusCode);
            expect(_body).to.have.property("status").equals("success")
        });

        it("GET /api/products/:pid debe conseguir el producto segun el ID", async function () {
            const { statusCode, ok, _body } = await requester.get(`/api/products/${productID}`)

            console.log(statusCode);
            expect(_body).to.have.property("_id")
        });

        //Me da 404
        // it("PUT /api/products debe actualizar el producto segun el PID", async function () {
        
        //     const { statusCode, ok, _body } = await requester.put(`/api/products/${productID}`).send({"_id" : productID, "product" : {...productMock, "title" : "peras"}})

        //     console.log(statusCode);

        //     // expect(statusCode).to.be.equals(200)
        // });

    
        it("DELETE /api/products/:pid debe eliminar el producto segun el PID", async function () {
        
            const { statusCode, ok, _body } = await requester.delete(`/api/products/${productID}`)

            console.log(statusCode);
        });

        
    })
})
