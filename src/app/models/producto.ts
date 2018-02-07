export class Producto {
    constructor(
        public nombre: string,
        public decripcion: string,
        public categoria: string,
        public precio: number,
        public cantidad: number,
        public imagen: string
    ) { }
}


export class ProductoStatus {
    constructor(
        public code: string,
        public message: string
    ) { }
}