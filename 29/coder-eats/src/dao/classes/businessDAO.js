import businessModel from "../models/BusinessModel.js"

export default class Business {

    getBusiness = async () => {
        try {
            return await businessModel.find();
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    getBusinessById = async (id) => {
        try {
            return await businessModel.findOne({_id : id})
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    createBusiness = async (business) => {
        try {
            return await businessModel.create(business)
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    updateBusiness = async (id, business) => {
        try {
            return await businessModel.updateOne({_id: id}, {$set: business});
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}