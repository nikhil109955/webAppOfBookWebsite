import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = Schema(
    {
        name: {type: String},
        slug: {type: String},
        category: {type: String},
        image: {type: String},
        price: {type: Number},
        countInStock: {type: Number},
        Author: {type: String},
        rating: {type: Number},
        numReviews: {type: Number},
        description: {type: String},
    },
    {
        timestamps:true
    }
    );

    const Product= mongoose.model('Product', productSchema);

    export default Product;
    