import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = mongoose.Schema({
    //Debe autogenerarse
    code: { 
        type: String,
        require: true,
        unique: true
    },
    //created_at, el momento de la compra
    purchase_datetime: { 
        type: String,
        require: true
    },
    //Total de la compra
    amount: { 
        type: Number,
        require: true,
    },
    //email del usuario asociado al carrito
    purchaser: {
        type: String,
        require: true,
        unique: true
    }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;