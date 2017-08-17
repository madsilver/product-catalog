
module.exports = {
    wms: function(req, res, next) {

        for(var i=0; i < req.body.length; i++) {
            var product = req.body[i];
            var urlImage = product.product_image_url;

            if(urlImage) {
                // valid image extension
                if(!(/\.(jpg|jpeg|png|gif)$/i).test(urlImage)) {
                    res.json({message: "Invalid image extension", product: product});
                    return;
                }
                // valid URL
                if(!(/[\w-]+\//i).test(urlImage)) {
                    res.json({message: "Invalid image url", product: product});
                    return;
                }
                // prepend http protocol
                if(!(/^(https?):/).test(urlImage)) {
                    req.body[i].product_image_url = "http://" + urlImage;
                }
            }
            else {
                res.json({message: "Image url required", product: product});
                return;
            }
        }

        next();
    }
};