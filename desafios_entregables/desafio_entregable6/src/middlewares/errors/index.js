

export default (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case 0: 
            res.status(500).send({ status: "error", error: "Unhandled error" });
        case 1:
            res.status(400).send({ status: "error", error: error.name });
            break;
        default: 
            res.status(500).send({ status: "error", error: "Unhandled error" });
    }
}