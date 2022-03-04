import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/:id', expressAsyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(400).send({message: 'El Producto no funcion'})
    }
    
    // res.send(product);
}));


productRouter.post('/create', expressAsyncHandler( async(req, res) => {
    const product = await Product({name:req.body.name,
        category:req.body.category,
        code:req.body.code,
        stock:req.body.stock,
        buyPrice:req.body.buyPrice,
        priceDetal:req.body.priceDetal,
        priceMajor:req.body.priceMajor,
    });
    const createdProduct = await product.save();
    console.log(createdProduct);
    res.send({
        _id: createdProduct._id,
        name: createdProduct.name,
        stock: createdProduct.stock
    });
    
    // res.status(401).send({message: 'Categoria Creada'});
}));

productRouter.put("/:id", expressAsyncHandler( async (req, res) => {
    console.log(req.body.product.name);
    console.log(req.params.id);
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
        product.name = req.body.product.name;
        product.category = req.body.product.category;
        product.buyPrice = req.body.product.buyPrice;
        product.code = req.body.product.code;
        product.priceDetal = req.body.product.priceDetal;
        product.priceMajor = req.body.product.priceMajor;
        product.stock = req.body.product.stock;

      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete('/:id', expressAsyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        const deletedProduct = await product.remove();
        res.send({message: 'User Deleted', product: deletedProduct});
    }else{
        res.status(400).send({message: 'El Usuario no funcion'})
    }
    
    res.send(product);
}));


export default productRouter;