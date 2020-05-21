import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input() pasillos: Pasillo[]
  @Output() verProducto = new EventEmitter<Producto>()

  constructor() { }

  ngOnInit() {}

  irProducto(producto: Producto) {
    this.verProducto.emit(producto)
  }

}
