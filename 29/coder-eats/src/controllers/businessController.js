import Business from "../dao/classes/businessDAO.js";

const businessService = new Business();

const responseError = {
    status: "error",
    error: "Something went wrong, try again"
}

export const getBusiness = async (req,res) => {
    const result = await businessService.getBusiness();

    res.send({ status: "success", result })
}

export const getBusinessById = async (req,res) => {
    const { bid } = req.params;

    const result = await businessService.getBusinessById(bid)

    if (!result) return res.status(500).send(responseError)
    res.send({ status: "success", result })        
}

export const createBusiness = async (req,res) => {
    const business = req.body //Tarea validar campos de entrada

    const result = await businessService.createBusiness(business)
    if (!result) return res.status(500).send(responseError)
    res.send({ status: "success", result })    
}

export const addProduct = async (req,res) => {
    const product = req.body; // Tarea validar campos de entrada
    const { bid } = req.params;

    const business = await businessService.getBusinessById(bid)
    if (!business) return res.status(500).send(responseError);

    business.products.push(product);
    const result = await businessService.updateBusiness(business._id, business);

    if (!result) return res.status(500).send(responseError)
    res.send({ status: "success", result: "Business Updated!" })    
}