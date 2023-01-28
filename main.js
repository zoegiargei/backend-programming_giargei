class ProductManager{
    constructor(){
        this.products = []
    }

    addProduct = ({title, description, price, thumbnail, code, stock}) => {

        const product = new Products(title,description,price,thumbnail,code,stock)

        if(Object.values(product).some(atribute => (atribute === '' || atribute == undefined))){

            //throw new Error("Todos los campos del producto deben estar completos")
            return console.log("Todos los campos del producto deben estar completos")

        } else{

            if(this.products.length === 0){
    
                product.id = 1 
                this.products.push(product)
    
            } else{

                if(this.products.some(prod => prod.code === product.code)){
                    
                    //throw new Error("No pueden existir dos CODE iguales")
                    return console.log("No pueden existir dos CODE iguales")

                } else{
                    
                    product.id = this.products[this.products.length - 1].id + 1
                    this.products.push(product)
                }                
            }
        }
    };

    getProducts = () => {return this.products}

    getProductById = (id) => {

        const search = (this.products).find(prod => prod.id === id)
        return (search === undefined ?  "Error" : search)
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
}

//Pruebas de uso
const productManager1 = new ProductManager();

//Show empty array
console.log(productManager1.getProducts())

//Add products to empty array
productManager1.addProduct({title:"Martillo", description:"Herramienta de mano", price:1000, thumbnail:"url", code:"code123", stock:100});
productManager1.addProduct({title:"Destornillador", description:"Herramienta de mano", price:1200, thumbnail:"url", code:"code124", stock:100});
productManager1.addProduct({title:"Taladro", description:"Herramienta de mano Eléctrica", price:5000, thumbnail:"url", code:"code125", stock:100});

//Add a product with repetead CODE
productManager1.addProduct({title:"Destornillador", description:"Herramienta de mano", price:1200, thumbnail:"url", code:"code123", stock:100});

//Add a product with EMPTY FIELD:
productManager1.addProduct({title:"Taladro", description:"", price:1000, thumbnail:"url", code:"code125", stock:100});
productManager1.addProduct({title:"Taladro", price:1000, thumbnail:"url", code:"code125", stock:100});

//Get products array
console.log(productManager1.getProducts())

//Get product by ID
console.log(productManager1.getProductById(1))