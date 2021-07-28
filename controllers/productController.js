import express from 'express';
import mongoose from 'mongoose';


import{ProductDetails, KeywordDetails} from '../models/productDetails.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
       


        const productDetails = await ProductDetails.find();
                

        res.status(200).json(productDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const createProduct = async (req, res) => {
    const { itemid,item, token} = req.body;

    const newProductDetail= new ProductDetails({ itemid,item ,token})

    if(token =="fuckingtoken"){try {
        console.log(req.body)
        await newProductDetail.save();

        res.status(201).json(newProductDetail );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    }else{
        res.status(409).json({message: "invalid token" }); 
    }

}


/*export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {itemid, item} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = { itemid, item, _id: id };

    await ProductDetails.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
}*/

export const deleteProduct = async (req, res) => {
   const { id } = req.params;


    try {
        
        console.log(req.query);
    
        const querypattern = {
            itemid: {
                $regex: id,
             
            }
        };
        console.log(querypattern)
        var query = querypattern;   
        
    
      

        //if(ProductDetails.findOne(querypattern)==null) return res.status(404).send(`No product`)
        await ProductDetails.findOneAndDelete(querypattern)
        /*.then(function() {
            return res.json({ message: "Product deleted successfully." });
         }).catch(function(error) {
            throw error;
         });*/
        console.log(querypattern)
       res.json({ message: "Product deleted successfully." });
       
    
       } catch (error) {
           res.status(404).json({ message: error.message });
       }



  /*  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await ProductDetails.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully." });*/
}


export const searchProduct = async (req, res) => { 
    const { id } = req.params;
    

 try {
     const{keyword} = req.query.item;
    const filters = req.query.pname;
    console.log(req.query);

    const data = req.query.item.split('_')
    const data2 = req.query.super
    var datacount=data.length;
    console.log(datacount)
    var pattern = data.join("|")
    var final =pattern.concat("m" + data2) 

    console.log(req.query.item.toString())
    
    const querypattern = {
        item: {
            $regex: pattern
         
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



export const updateProduct = async (req, res) => {
    const { id } = req.params;
    
    const { itemid ,item,token } = req.body;
    
   /* if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = { pname, description,  price, categories,image,imageId,createdAt, _id: id };*/


    try {
        
        console.log(req.query);
    
        const querypattern = {
            itemid: {
                $regex: id,
             
            }
        };
        console.log(querypattern)
        var query = querypattern;   
        
    
      
        const updatedProduct = { itemid,item,}
        await ProductDetails.findOneAndUpdate(querypattern, updatedProduct, {new:true} )
       
        console.log(querypattern)
       res.json({ message: "Product updated successfully." });
       
    
       } catch (error) {
           res.status(404).json({ message: error.message });
       }


}


export const createKeyword = async (req, res) => {
    const { keyword} = req.body;
    var condition;

    try {
        const{keyword} = req.query.item;
       const filters = req.query.pname;
       console.log(req.query);
   
       const data = req.query.item.split('_')
       const data2 = req.query.super
       var datacount=data.length;
       console.log(datacount)
       var pattern = data.join("|")
      // var pattern1 = data.join("|")
       //console.log(pattern1)
       var dataRemoveS = data[0]
       var dataRemove2S = data[1]
       var dataRemoveS2 = dataRemoveS.slice(0,-1)
       var dataRemove2S2 = dataRemove2S.slice(0,-1)
       var dataRemovePrefix = data[0]
       var dataRemovePrefixSlice = dataRemovePrefix.substring(1)
       var dataRemovePrefix2 = data[1]
       var dataRemovePrefixSlice2 = dataRemovePrefix2.substring(1)

       console.log(dataRemovePrefixSlice)
       
       
       var pattern2 = pattern
       var dataRemoveSPattern = pattern2.concat("|"+dataRemoveS2)
       var dataRemove2SPattern= dataRemoveSPattern.concat("|"+dataRemove2S2)

       //updated query pattern
       var dataRemovePrefixPattern = dataRemove2SPattern.concat("|"+dataRemovePrefixSlice+"|"+dataRemovePrefixSlice2)
       console.log(dataRemovePrefixPattern)

       console.log(req.query.item.toString())
       
       const querypattern = {
           item: {
               $regex: dataRemovePrefixPattern
            
           }
       };
       console.log(querypattern)
       var query = querypattern;   
       
       
   
       const productDetails = await ProductDetails.find(query);
   
        res.status(200).json(productDetails);
       
     var condition = productDetails;
   
      } catch (error) {
          res.status(404).json({ message: error.message });
      }

     console.log(typeof(condition))
     if(condition!==null){
         
     }else{console.log("faliure")}


    const key2 =req.query.keyword;
    //console.log(key2)
    var s ='{"keyword": "myr"}'
    var s2 =JSON.parse(s)
    console.log(s2)
    const newKeywordDetail= new KeywordDetails({keyword})
    console.log(newKeywordDetail)

 try {
    const querypattern = {
        keyword: {
            $regex: condition
         
        }
    };
  // const keywordDetails = await KeywordDetails.find(querypattern);     
     if(!Object.keys(condition).length > 0){
      console.log("failure")  
     }
     else{
        console.log("success") 
         console.log(req.body)
        await newKeywordDetail.save();
     }
      // res.status(201).json(newKeywordDetail);
    } catch (error) {
      //  res.status(409).json({ message: error.message });
      console.log(error.message)
    }
    

}

export const getKeyword = async (req, res) => { 

    try {
     const pattern = req.query.keyword;

        const querypattern = {
            keyword: {
                $regex: pattern
             
            }
        };
        console.log(querypattern)
        var query = querypattern;   
        
        
    
        const keywordDetails = await KeywordDetails.find(query);
        
    




//        const keywordDetails = await KeywordDetails.find();     

        res.status(200).json(keywordDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}








export default router;