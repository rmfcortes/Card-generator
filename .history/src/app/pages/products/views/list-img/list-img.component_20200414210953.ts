import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-lista-img',
  templateUrl: './lista-img.component.html',
  styleUrls: ['./lista-img.component.scss'],
})
export class ListaImgComponent implements OnInit {

  @Input() pasillos: Pasillo[]
  @Output() verProducto = new EventEmitter<Producto>()

  constructor() { }

  ngOnInit() {}

  irProducto(producto: Producto) {
    this.verProducto.emit(producto)
  }

}
