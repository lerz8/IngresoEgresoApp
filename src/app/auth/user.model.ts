export class User {
    public nombre: string;
    public uId: string;
    public email: string;

    constructor(obj: DataObj) {
        this.nombre = obj && obj.nombre || null;
        this.email = obj && obj.email || null;
        this.uId = obj && obj.uId || null;
    }
}

interface DataObj {
    uId: string;
    email: string;
    nombre: string;
}
