import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  @Input() sections: Section[]
  @Input() profile: MainProfile


  constructor() { }

  ngOnInit() {}

}
