import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasillo, Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  @Input() pasillos: Pasillo[]
  @Output() verProducto = new EventEmitter<Producto>()

  constructor() { }

  ngOnInit() {}

  irProducto(producto: Producto) {
    this.verProducto.emit(producto)
  }

}
