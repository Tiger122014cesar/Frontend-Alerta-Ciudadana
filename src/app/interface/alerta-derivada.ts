// Generated by https://quicktype.io

export interface ResultAlertaDerivadas {
  ok:             boolean;
  msg:            string;
  alertaDerivada: AlertaDerivada[];
}

export interface ResultAlertaDerivada {
  ok:             boolean;
  msg:            string;
  alertaDerivada: AlertaDerivada;
}

export interface AlertaDerivada {
  id:         number;
  id_alerta:  number;
  id_usuario: number;
  atencion:   number;
  Alertum:    Alertum;
  Usuario:    Usuario;
}

export interface Alertum {
  id:          number;
  descripcion: string;
  lat:         number;
  lng:         number;
  foto:        null;
  fecha:       string;
  hora:        string;
  ciudadano:   number;
  tipo_alerta: number;
  derivado:    number;
  Ciudadano:   Usuario;
}

export interface Usuario {
  id:          number;
  dni:         string;
  nombre:      string;
  apellido:    string;
  password:    string;
  estado:      number;
  id_cargo?:   number;
  disponible?: number;
}