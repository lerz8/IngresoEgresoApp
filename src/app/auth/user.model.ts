export class User {
    public nombre: string;
    public uId: string;
    public email: string;

    constructor(nombre: string, email: string, uId: string) {
        this.nombre = nombre;
        this.email = email;
        this.uId = uId;
    }
}
