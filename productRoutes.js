import express  from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get('/', async (req, res)=>{
    const products = await Product.find();
    res.send(products);
});

productRouter.get('/:slug',async (req,res)=>{
    
    const product = await Product.findOne({ slug:req.params.slug});
    
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message:'Product Not Found'});
    }
    //res.send(data.products);
});
productRouter.get('/addToCart/:id', async (req,res)=>{
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:'Product Not Found'});
    }
    //res.send(data.products);
});


export default productRouter;