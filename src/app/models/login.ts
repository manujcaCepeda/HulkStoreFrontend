export class Login {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class LoginStatus {
    constructor(
        public code: string,
        public message: string
    ) { }
}

export class Registro {
    constructor(
        public apellido: string,
        public nombre: string,
        public email: string,
        public password: string,
        public telefono: string,
        public direccion: string
    ) { }
}
