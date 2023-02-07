const {
    promises: {
        writeFile,
        readFile,
        appendFile,
        unlink
    }
} = require('fs');


//Creamos un archivo
class ProductManager{
    
    constructor(path){
        this.path = path,
        this.products = []
    };

    //Add products to Array
    async addProduct({title, description, price, thumbnail, code, stock}){

        const product = new Products(title,description,price,thumbnail,code,stock)

        //Validation
        if(Object.values(product).some(atribute => (atribute === '' || atribute === undefined))){

            return console.log("Todos los campos del producto deben estar completos")

        } else{

            if(this.products.length === 0){
                
                product.id = 1 
                this.products.push(product)
                const productsJson = JSON.stringify(this.products, null, '\t')
                writeFile(this.path, productsJson) //Write a file with the array of objects
                    
            } else{

                //Validation
                if(this.products.some(prod => prod.code === product.code)){
                    
                    //throw new Error("No pueden existir dos CODE iguales")
                    return console.log("No pueden existir dos CODE iguales")
                    
                } else{
                    product.id = this.products[this.products.length - 1].id + 1
                    this.products.push(product)
                    const productsJson = JSON.stringify(this.products, null, '\t')
                    await writeFile(this.path, productsJson)
                }                
            }
        }
    };

    async getProducts(){

        const asJson = await readFile(this.path, 'utf-8')
        return console.log(await JSON.parse(asJson))
    };

    async getProductById(id){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = await JSON.parse(asStringify)
        console.log(asJson.find(prod => prod.id === id))
    };

    async updateProduct(id, keysAndValues){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = await JSON.parse(asStringify)
        
        const index = await asJson.findIndex(prod => prod.id === id)
        asJson[index] = { 
            ...asJson[index], 
            ...keysAndValues 
        }

        const arrayStringify = JSON.stringify(asJson, null, '\t')
        writeFile(this.path, arrayStringify)
    }

    async deleteProduct(id){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = await JSON.parse(asStringify)

        const position = id-1
        console.log(position)
        asJson.splice(position, 1)

        const arrayStringify = JSON.stringify(asJson, null, '\t')
        await writeFile(this.path, arrayStringify)
    }
};

class Products{
    constructor(title, description, price, thumbnail, code, stock, id=0){

        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.id = id
    }
};



/* --------------------------------------------- */
//Test
//object instance
const productManager1 = new ProductManager('./archivoDeProductos.json');

//Add products to empty array
productManager1.addProduct({title:"Martillo", description:"Herramienta de mano", price:1000, thumbnail:"url", code:"code123", stock:100});
productManager1.addProduct({title:"Destornillador", description:"Herramienta de mano", price:1000, thumbnail:"url", code:"code124", stock:100});
productManager1.addProduct({title:"Pinza", description:"Herramienta de mano", price:1500, thumbnail:"url", code:"code125", stock:100});

//Add a product with repetead CODE
productManager1.addProduct({title:"Pinza", description:"Herramienta de mano", price:1500, thumbnail:"url", code:"code124", stock:100});

//Add a product with EMPTY FIELD:
productManager1.addProduct({title:"Taladro", description:"", price:1000, thumbnail:"url", code:"code125", stock:100});

//Get products file
productManager1.getProducts();

//Get product by ID
productManager1.getProductById(3);

//Update object
productManager1.updateProduct(3, {title:"Taladro", price:5000});

//Delete product
productManager1.deleteProduct(2);

//Set time usado a modo de prueba, para que no se mezclen los resultados
setTimeout(() => {
    productManager1.getProducts();
}, 5000);