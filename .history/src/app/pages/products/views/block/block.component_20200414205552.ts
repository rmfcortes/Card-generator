import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.scss'],
})
export class BloquesComponent implements OnInit {

  @Input() pasillos: Pasillo[]
  @Output() verProducto = new EventEmitter<Producto>()

  constructor() { }

  ngOnInit() {}

  irProducto(producto: Producto) {
    this.verProducto.emit(producto)
  }

}
