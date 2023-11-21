import ProductManager from './src/productManager.js';

const productManager = new ProductManager('./files/productos.json');

const env = async () => {

    //Obtengo todos los productos
    let productos = await productManager.getProducts();

    console.log( "Listado de Productos: ", productos );

    //Cargo un producto nuevo

    let producto = {
        title: 'producto prueba',
        description: 'Este es un producto de prueba',
        price: 200,
        thumbnail: 'Sin Imagen',
        code: 'abc123',
        stock: 25
    }

    let resultado = await productManager.addProduct(producto);

    console.log( "Producto: ", resultado );


    //Busco producto por ID inexistente
    console.log( "Producto by Id: ", await productManager.getProductById(12) );

    //Busco producto por ID 
    console.log( "Producto by Id: ", await productManager.getProductById(1) );

    //Borrar Producto

    //console.log( await productManager.deleteProduct(1) );

    let updateProducto = {
        price: 500,
    }

    //console.log( await productManager.updateProduct( 2, updateProducto ) );
}

env();