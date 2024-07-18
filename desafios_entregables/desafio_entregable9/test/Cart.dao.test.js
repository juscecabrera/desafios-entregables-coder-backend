import Assert from "assert";
import mongoose from "mongoose";
import Cart from "../src/dao/classes/cartDAO.js";


const connection = await mongoose.connect("mongodb+srv://jusce240:omjGmRaUnnVjwVE3@cluster0.dlahfbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const dao = new Cart();
const assert = Assert.strict;

describe("Test DAO Cart", function () {
    //Se ejecuta ANTES de comenzar el paquete de tests
    before(function () {});
    //Se ejecuta ANTES de CADA test
    beforeEach(function () {});
    //Se ejecuta DESPUES de finalizar el paquete de tests
    after(function () {});
    //Se ejecuta FINALIZADO CADA test
    afterEach(function () {});


    it("get () debe retornar un array de usuarios", async function () {
        let cartID = "66281bb4bab1536ceed357e6"
        const result = await dao.getCartByID(cartID);
        assert.strictEqual(Array.isArray(result), false);
        console.log(result)
    });
})