


const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const comprarCarrito = document.getElementById("comprarCarrito");
const compraTotal = document.getElementById("compraTotal");
const compras = document.getElementById("compras");
let carrito = [];




const fetchDatos = "json/productos.json";

fetch(fetchDatos)
    .then(res => res.json())
    .then(data => {
        document.addEventListener(`DOMContentLoaded`, () => {
            if(localStorage.getItem(`carrito`)){
                carrito = JSON.parse(localStorage.getItem(`carrito`))
                actualizarCarrito();
            }
        })
        data.forEach(element => {
            const divProductos = document.createElement(`div`)
            divProductos.classList.add("card", "d-flex", "col-xl-1.5")
            divProductos.innerHTML+=`
                                    <div>
                                        <img src="${element.img}" class="card-img-top img-fluid py-3">
                                        <div class="card-body">
                                            <h3 class="card-title"> ${element.nombre} </h3>
                                            <p class="card-text"> $${element.precio} </p>
                                            <button id="boton${element.id}" class="btn btn-outline-dark"> Agregar al Carrito </button>
                                        </div>
                                    </div>
                                    `
            contenedorProductos.append(divProductos)
            const boton = document.getElementById(`boton${element.id}`)
            boton.addEventListener(`click`, () =>{
                agregarCarrito(element.id)
            })
            
        });
        const agregarCarrito = (id) => {
            const element = data.find((producto) => producto.id === id)
            const producto = carrito.find((producto) => producto.id === id)
            if (producto) {
                producto.cantidad++
            } else {
                carrito.push(element)
            }
            actualizarCarrito();
            Toastify({
                text:`Producto agregado`,
                duration: 1000,
            }).showToast()
            calcular()
            
            
        }
        const actualizarCarrito = () => {
            contenedorCarrito.innerHTML="";
            carrito.forEach((element) =>{
                const divCarrito = document.createElement(`div`)
                divCarrito.classList.add("card", "d-flex", "col-l-4", "m-2")
                divCarrito.innerHTML =`
                <div>
                    <div class="card-body" style="width: 18rem">
                        <h3 class="card-title"> ${element.nombre} </h3>
                        <p class="card-text"> $${element.precio} </p>
                        <p>Cantidad: ${element.cantidad} </p>
                        <!--  <button onclick ="buy(${element.id})" class="btn btn-outline-success"> Comprar </button>-->
                        <!--  <button onclick ="btn(${element.id})" class="btn btn-outline-danger"> Eliminar </button> -->          
                    </div>
                </div>`
                contenedorCarrito.append(divCarrito)
                localStorage.setItem(`carrito`, JSON.stringify(carrito))
                calcular()
            })
        }

        const calcular = () => {
            let total = 0;
            carrito.forEach(producto => {
                total += producto.precio * producto.cantidad;
            });
            compraTotal.innerHTML = total;
        }    

             comprarCarrito.addEventListener(`click`, ()=>{
                const producto = carrito.length
                if(producto === 0){
                    Swal.fire({
                        title:`No puedes comprar un carrito vacío`,
                        icon:`warning`,
                        confirmButtonText:`Dale bro`,
                        width: `50%`,
                        background:`#b60d0d`,
                        timer: 2000,
                    })
                }else{
                    Swal.fire({
                        title:`Compra Realizada`,
                        icon:`success`,
                        confirmButtonText:`Confirmar`,
                        width: `50%`,
                        background:`#14830a`,
                        timer: 2000,
                    })
                    carrito.splice(0, carrito.length)
                    actualizarCarrito()
                    calcular()
                }
                
             })
             

            
             
             
    
            vaciarCarrito.addEventListener("click", () => {
                const producto = carrito.length;
                if(producto === 0){
                    Swal.fire({
                        title:`No puedes vaciar un carrito vacío`,
                        icon:`warning`,
                        confirmButtonText:`Ya entendí`,
                        width: `50%`,
                        background:`#b60d0d`,
                        timer: 2000,
                    })
                }else{
                    Swal.fire({
                        title:"¿Quieres vaciar el carrito?",
                        icon:"warning",
                        confirmButtonText:"Vaciar",
                
                        showCancelButton:true,
                        cancelButtonText:"Cancelar",
                    }).then((result) => {
                        if(result.isConfirmed){
                            Toastify({
                                text:`Carrito Vaciado`,
                                duration: 3000,
                                position:`right`,
                                gravity:`top`,
                                background: `#b60d0d81`,
                            }).showToast()
                            carrito.splice(0, carrito.length)
                            actualizarCarrito()
                            calcular()
                            
                        }
                    })
                }
                
                
                
                
            })
    })




















// document.addEventListener(`DOMContentLoaded`, () => {
//     if(localStorage.getItem(`carrito`)){
//         carrito = JSON.parse(localStorage.getItem(`carrito`))
//         //actualizarCarrito();
//     }
// })

// document.addEventListener(`DOMContentLoaded`, () => {
//     fetchDatos()
// })

// const fetchDatos = async () => {
//     try{    
//         const res = await fetch(`json/productos.json`)
//         const data = await res.json()
//         const productoss = data;
//         verProductos(data)
//         agregarCarrito(data)
//         console.log(productoss)
//     }   catch(error){
//         console.log(error)
//     }
// }


// const verProductos = (data) =>{
//     data.forEach(element =>{
//         const divProductos = document.createElement(`div`);
//         divProductos.classList.add("card", "d-flex", "col-xl-1.5");
//         divProductos.innerHTML =`<div>
//                                                       <img src="${element.img}" class="card-img-top img-fluid py-3">
//                                                       <div class="card-body">
//                                                           <h3 class="card-title"> ${element.nombre} </h3>
//                                                           <p class="card-text"> $${element.precio} </p>
//                                                           <button id="boton${element.id}" class="btn btn-outline-dark"> Agregar al Carrito </button>
//                                                       </div>
//                                                   </div>`
//         console.log(element.nombre)
//         contenedorProductos.append(divProductos)
//         const boton = document.getElementById(`boton${element.id}`)
//         boton.addEventListener(`click`, () =>{
//             agregarCarrito(element.id)
//             console.log(element.nombre)
//         })
        
//     })
// }


// const agregarCarrito = (id) => {
//     //const element = data.find((producto) => producto.id === id)     //NO SE COMO HACER PARA USAR EL .FIND() EN EL JSON DE LOS PRODUCTOS 
//     const producto = carrito.find((producto) => producto.id === id)   // Y AL MISMO TIEMPO INGRESAR COMO PARAMETRO EL ID DE LA LINEA 53
//     console.log(producto)
        
// }



// fetch(productos)
//     .then(respuesta => respuesta.json())
//     .then(datos =>{
//         datos.forEach(element =>{
//             const divProductos = document.createElement("div");
//                  divProductos.classList.add("card", "d-flex", "col-xl-1.5");
//                  divProductos.innerHTML = `
//                                          <div>
//                                              <img src="${element.img}" class="card-img-top img-fluid py-3">
//                                              <div class="card-body">
//                                                  <h3 class="card-title"> ${element.nombre} </h3>
//                                                  <p class="card-text"> $${element.precio} </p>
//                                                  <button id="boton${element.id}" class="btn btn-outline-dark"> Agregar al Carrito </button>
//                                              </div>
//                                          </div>`;
//                  contenedorProductos.appendChild(divProductos);
//                  agregarCarrito(element.id)
                 
//         })

        
//     })












// const caca = "json/productos.json";
// fetch(caca)
//     .then(respuesta => respuesta.json())
//     .then((data) => {
//         console.log(data);
//         //mostrarPro(data);
//     })
//     .catch(error => console.log(error))

// function mostrarPro


// Productos.forEach(element => {
//     const divProductos = document.createElement("div");
//     divProductos.classList.add("card", "d-flex", "col-xl-1.5");
//     divProductos.innerHTML = `
//                             <div>
//                                 <img src="${element.img}" class="card-img-top img-fluid py-3">
//                                 <div class="card-body">
//                                     <h3 class="card-title"> ${element.nombre} </h3>
//                                     <p class="card-text"> $${element.precio} </p>
//                                     <button id="boton${element.id}" class="btn btn-outline-dark"> Agregar al Carrito </button>
//                                 </div>
//                             </div>`;
//     contenedorProductos.appendChild(divProductos);
//     const boton = document.getElementById(`boton${element.id}`);
//     boton.addEventListener("click", () => {
//         agregarCarrito(element.id);
//     })
// });

// const agregarCarrito = (id) => {
//     const element = Productos.find((producto) => producto.id === id)
//     const producto = carrito.find((producto) => producto.id === id)
//     if (producto) {
//         producto.cantidad++
//     } else {
//         carrito.push(element)
//     }
//     actualizarCarrito()
//     Toastify({
//         text:`Producto agregado`,
//         duration: 1000,
//     }).showToast()
    
// }





// const actualizarCarrito = () => {
//     contenedorCarrito.innerHTML = "";
//     carrito.forEach((element) => {
//         const divCarrito = document.createElement("div")
//         divCarrito.classList.add("card", "d-flex", "col-l-4", "m-2");
//         divCarrito.innerHTML = `
//                             <div>
//                                 <div class="card-body" style="width: 18rem">
//                                     <h3 class="card-title"> ${element.nombre} </h3>
//                                     <p class="card-text"> $${element.precio} </p>
//                                     <p>Cantidad: ${element.cantidad} </p>
//                                     <button onclick ="buy(${element.id})" class="btn btn-outline-success"> Comprar </button>
//                                     <button onclick ="btn(${element.id})" class="btn btn-outline-danger"> Eliminar </button>           
//                                 </div>
//                             </div>`;
//         contenedorCarrito.appendChild(divCarrito)

//         localStorage.setItem(`carrito`, JSON.stringify(carrito))
//         calcular();
//     })
// }

// const btn = (id) => {
//     const producto = carrito.find((producto) => producto.id === id)
//     const indice = carrito.indexOf(producto)
//     carrito.splice(indice, 1)
//     actualizarCarrito()
//     calcular();
    
//     Toastify({
//         text:`Producto eliminado del carrito`,
//         duration: 3000,
//         style: {
//              background: "#b60d0d",           
//         }
//     }).showToast();
    
// }

// vaciarCarrito.addEventListener("click", () => {
//     Swal.fire({
//         title:"¿Quieres vaciar el carrito?",
//         icon:"warning",
//         confirmButtonText:"Vaciar",

//         showCancelButton:true,
//         cancelButtonText:"Cancelar",
//     }).then((result) => {
//         if(result.isConfirmed){
//             Toastify({
//                 text:`Carrito Vaciado`,
//                 duration: 3000,
//                 position:`right`,
//                 gravity:`top`,
//                 background: `warning`,
//             }).showToast()
//             carrito.splice(0, carrito.length)
//             actualizarCarrito()
//             calcular()
            
//         }
//     })
    
    
    
// })



// const calcular = () => {
//     let total = 0;
//     carrito.forEach(element => {
//         total += (element.precio * element.cantidad);
//     });
//     compraTotal.innerHTML = total;
// }


// const buy = (id) => {
//     const element = carrito.find((element) => element.id === id)
//     Swal.fire({
//         title:`Compra Realizada`,
//         icon:`success`,
//         confirmButtonText:`Confirmar`,
//         width: `50%`,
//         background:`#14830a`,
//         timer: 10000,
//     })
//     btn(element.id)

// }



