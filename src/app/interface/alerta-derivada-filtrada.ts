// Generated by https://quicktype.io

export interface ResultFiltroDerivada {
  ok:             boolean;
  msg:            string;
  alertaDerivada: AlertaDerivada[];
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
  TipoAlertum: TipoAlertum;
  Ciudadano: Usuario;
}

export interface TipoAlertum {
  id:          number;
  nombre:      string;
  opcion_foto: number;
  icono:       string;
  img:         string;
  color:       string;
  estado:      number;
}

export interface Usuario {
  id:         number;
  dni:        string;
  nombre:     string;
  apellido:   string;
  estado:     number;
  password:   string;
  id_cargo?:   number;
  disponible?: number;
}
