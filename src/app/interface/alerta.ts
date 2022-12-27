// Generated by https://quicktype.io

export interface ResultAlertas {
    ok:      boolean;
    msg:     string;
    results?: Alerta[];
}

export interface Alerta {
    id:          number;
    descripcion: string;
    lat:         number;
    lng:         number;
    foto:        null | string;
    fecha:       string;
    hora:        string;
    dni:         string;
    nombre:      string;
    apellido:    string;
    id_tipo:     number;
    nombre_tipo: string;
    color:       string;
    estado:      number
}