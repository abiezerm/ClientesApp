export class Cliente{

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public direccion: string,
        public uid?: string
    ){

    }


    imprimirUsuario(){
        console.log( this.nombre );
    }
}