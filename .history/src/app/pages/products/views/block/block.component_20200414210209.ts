import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  @Input() pasillos: Section[]

  constructor() { }

  ngOnInit() {}

}
