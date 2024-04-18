import { Router } from "express";
import productModel from "../dao/models/productModel.js";

const router = Router();

//agregar esto al viewsrouter original
//esta hecho
router.get("/limit=:lim/page=:page/sort=:sort/query=:query", async (req, res) => {
    
    const main = async (sort, query) => {
        if (sort !== 1 && sort !== -1) {
            return sort = 0;
        }

        const result = await productModel.aggregate([
            {$match: {description : query}},
            {$sort: {price: sort}}
        ]);
        console.log(JSON.stringify(result, null, 2))
    }
    
    let sort = req.params.sort;
    let query = req.params.query;
    let page = req.params.page;
    let limit = req.params.lim
    if(!page) page = 1
    if (!limit) limit = 10
    if (!sort) sort = 0
    if (!query) query = ""

    main(sort, query);

    const result = await productModel.paginate({}, {page, limit, sort, lean: true});

    const baseURL = "http://localhost:8080/"
    result.title = "Productos";
    result.prevLink = result.hasPrevPage ? `${baseURL}?page=${result.prevPage}` : null;
    result.nextLink = result.hasNextPage ? `${baseURL}?page=${result.nextPage}` : null;
    result.isValid = !(page <= 0 || page > result.totalPages);;

    res.render(
        "home",
        {
            title: "Productos",
            products : result["docs"]
        }
        
    )
    
});

router.get("/realtimeproducts", async (req, res) => {
    let page = req.query.page;
    if (!page) page = 1
    let limit = req.query.limit
    if (!limit) limit = 10
    
    const result = await productModel.paginate({}, {page, limit, lean: true});

    const baseURL = "http://localhost:8080/"
    result.title = "Productos";
    result.prevLink = result.hasPrevPage ? `${baseURL}?page=${result.prevPage}` : null;
    result.nextLink = result.hasNextPage ? `${baseURL}?page=${result.nextPage}` : null;
    result.isValid = !(page <= 0 || page > result.totalPages);;

    res.render(
        "realTimeProducts",
        {
            title: "Productos en tiempo real",
            products: result["docs"]
        }
    )
});

export default router;