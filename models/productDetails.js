
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    itemid:{
        type: String,
        required: true,
    },
    item:{
        type: String,
        required: true,
    }
})

 export const ProductDetails = mongoose.model('ProductDetails', productSchema);