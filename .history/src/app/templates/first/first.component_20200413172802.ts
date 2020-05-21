import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PrincipalPersona } from 'src/app/interfaces/perfil.interface';

@Component({
  selector: 'app-primera',
  templateUrl: './primera.component.html',
  styleUrls: ['./primera.component.scss'],
})
export class PrimeraComponent implements OnInit {

  @Input() perfil: PrincipalPersona;
  @Output() red = new EventEmitter<string>();
  @Output() contacto = new EventEmitter<string>();

  constructor(
  ) { }

    // Info de inicio
  ngOnInit() {
    console.log(this.perfil);
  }

    // Acciones

  emite(funcion: string) {
    this.contacto.emit(funcion)
  }

  goPage(page: string) {
    this.red.emit(page);
  }


}
