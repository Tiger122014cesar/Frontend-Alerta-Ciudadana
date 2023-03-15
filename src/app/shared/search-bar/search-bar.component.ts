import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultUsuarios, Usuario } from 'src/app/interface/usuario';
import { AlertaService } from 'src/app/services/alerta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertaDerivadaService } from '../../services/alerta-derivada.service';
import Swal from 'sweetalert2';
import { WebsocketService } from 'src/app/socket/websocket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  private debounceTimer?: NodeJS.Timeout;
  public isCargaDatos: boolean = false;
  public listUsuario: Usuario[] = [];
  codigoAlerta: number = 0;
  buscar = '';
  serenoForm: FormGroup;
  constructor(
    private alertaService: AlertaService,
    private usuarioService: UsuarioService,
    private alertaDerivada: AlertaDerivadaService,
    private fb: FormBuilder,
    private ws: WebsocketService,
    private toastr: ToastrService
  ) {
    this.serenoForm = this.fb.group({
      sereno: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarAlerta();
    this.mostrarSereno();
    this.mostrarAlertaSocket();
    this.wsSerenazgoLogin();
  }
  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.buscar = query;
      this.mostrarAlerta();
    }, 350);
  }
  mostrarAlerta() {
    this.alertaService.getFiltroAlerta(this.buscar);
  }
  clickEvent(event: number) {
    this.codigoAlerta = event;
  }
  mostrarSereno() {
    this.usuarioService.getSerenazgo().subscribe((resp: ResultUsuarios) => {
      this.listUsuario = resp.usuario;
    });
  }
  derivarAlerta() {
    console.log(this.serenoForm.get('sereno')?.value);
    const formData = new FormData();
    formData.append('id_alerta', String(this.codigoAlerta));
    formData.append('id_usuario', this.serenoForm.get('sereno')?.value);
    this.alertaDerivada.postAlertaDerivada(formData).subscribe(
      (resp) => {
        Swal.fire(
          'Derivado!',
          'La alerta ha sido derivado con exito, verifica en alertas derivadas!',
          'success'
        );
        this.ws.emit(`alerta-derivada`, {
          titulo: 'Alerta Nueva',
          msg: 'Porfavor verifica su ubicacion y acerquese al lugar',
          usuario: `${this.serenoForm.get('sereno')?.value}`,
        },(data:any)=>{
          console.log(data);
        });
      },
      (error) => {
        Swal.fire('Ya derivado!', error.error.errors[0].msg, 'error');
      }
    );
  }
  cancelar() {
    this.codigoAlerta = 0;
    this.serenoForm.setValue({
      sereno: '',
    });
  }
  mostrarAlertaSocket() {
    this.ws.listen('actualizar-alerta-general').subscribe(
      (data) => {
        this.mostrarAlerta();
        this.toastr.success(
          'Tienes una alerta ciudadana entrante',
          'Alerta Ciudadana'
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  wsSerenazgoLogin(){
    this.ws.listen('inicio-sesion').subscribe(
      (resp)=>{
        this.mostrarSereno();
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  wsSerenazgoLogout(){
    this.ws.listen('logout-sesion').subscribe(
      (resp)=>{
        this.mostrarSereno();
      },
      (error)=>{
        console.log(error);

      }
    )
  }
}
