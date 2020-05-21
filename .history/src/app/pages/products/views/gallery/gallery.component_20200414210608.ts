import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {

  @Input() pasillos: Pasillo[]
  @Output() verProducto = new EventEmitter<Producto>()

  constructor() { }

  ngOnInit() {}

  irProducto(producto: Producto) {
    this.verProducto.emit(producto)
  }

}
