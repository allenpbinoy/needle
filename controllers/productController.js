import express from 'express';
import mongoose from 'mongoose';


import{ProductDetails} from '../models/productDetails.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
        var mysort = { pname: 1 };


        const productDetails = await ProductDetails.find().sort(mysort);
                

        res.status(200).json(productDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const createProduct = async (req, res) => {
    const { itemid,item } = req.body;

    const newProductDetail= new ProductDetails({ itemid,item })

    try {
        console.log(req.body)
        await newProductDetail.save();

        res.status(201).json(newProductDetail );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {itemid, item} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = { itemid, item, _id: id };

    await ProductDetails.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await ProductDetails.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully." });
}


/*export const categoryProduct = async (req, res) => { 
    const { id } = req.params;

 try {
    const filters = req.query;
    console.log(filters)
    
    var query = filters;   
    var mysort = { pname: 1 };
    const productDetails = await ProductDetails.find(query).sort(mysort);
             
   // var filtered = productDetails.findOne();
        res.status(200).json(productDetails);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }

}*/

export const searchProduct = async (req, res) => { 
    const { id } = req.params;

 try {
    const filters = req.query.pname;
    console.log(req.query);

    const querypattern = {
        item: {
            $regex: req.query.item,
         
        }
    };
    console.log(querypattern)
    var query = querypattern;   
    

    const productDetails = await ProductDetails.find(query);
    res.status(200).json(productDetails);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }

}


export default router;