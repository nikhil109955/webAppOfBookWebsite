import expressAsyncHandler from "express-async-handler";
import express from 'express';
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();
orderRouter.post('/',expressAsyncHandler(async(req, res)=>{
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x)=>({...x, product: x._id})),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.body.user,  //user replaced with id

    });
    const order = await newOrder.save();
    res.status(201).send({message:'New Order created', order});
})); 

orderRouter.get(
    '/mine',
    expressAsyncHandler(async(req, res)=>{
        const orders = await Order.find({user: req.user._id});
        res.send(orders);
    })
);


orderRouter.get('/:id'
,expressAsyncHandler(async(req, res)=>{
   const order = await Order.findById(req.params.id);
   if(order){
    res.send(order);
} else{
    res.status(404).send({message:'Order not found'});
}
}));
orderRouter.put(
    '/:id/pay',expressAsyncHandler(async(req,res)=>{
    const order = await order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt = Date.now();
        order.paymentResult={
            id: req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address,
        };
        const updatedOrder= await order.save();
        res.send({message: 'Order Paid', order: updatedOrder});
    }
    else{
        res.status(404).send({message:"Not Found"})
    }
    })
)

export default orderRouter;