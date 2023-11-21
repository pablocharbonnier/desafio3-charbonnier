import express from 'express';
import ProductManager from './productManager.js';

const PORT = 8080;
const app = express();

const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const products = [
    {id:"1",product:"Smartwatch W27",descripcion:"Reloj alta gama",categoria:"Tecnologia"},
    {id:"2",product:"Mouse",descripcion:"Mouse inalambrico",categoria:"Computacion"},
    {id:"3",product:"Celular Iphone 14",descripcion:"Smartphone alta gama",categoria:"Tecnologia"},
    {id:"4",product:"Teclado",descripcion:"Teclado inalambrico",categoria:"Computacion"},
    {id:"5",product:"Ipad",descripcion:"Tablet alta gama ",categoria:"Tecnologia"},
    {id:"6",product:"Monitor",descripcion:"Monitor 4k",categoria:"Computacion"}
];

app.get('/products', async (req,res)=>{
    const productos = await productManager.getProducts();
    const categoria = req.query.categoria;
    if(!categoria || (categoria !== 'Tecnologia' && categoria !== 'Computacion')){
        return res.json({products})
    }
    const productosFiltrados = products.filter(use => use.categoria === categoria)
    res.json({
        products: productosFiltrados
    })
})

app.get('/products/:pid', async (req,res)=>{
    const productos = await productManager.getProducts();
    const idProduct = req.params.pid;
    const product = products.find(product => {
        return product.id === idProduct
    })
    if(!product){
        return res.send({
            error: 'Producto no encontrado'
        })
    }
    res.json({product})
})

app.get('/products', async (req, res) => {
    const productos = await productManager.getProducts();
    const categoria = req.query.categoria;
    const limit = req.query.limit;
    
    if (!categoria || (categoria !== 'Tecnologia' && categoria !== 'Computacion')) {
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.json({ products: limitedProducts });
        } else {
            return res.json({ products });
        }
    }

    const productosFiltrados = products.filter(use => use.categoria === categoria);
    if (limit) {
        const limitedProducts = productosFiltrados.slice(0, parseInt(limit));
        return res.json({ products: limitedProducts });
    } else {
        return res.json({ products: productosFiltrados });
    }
});