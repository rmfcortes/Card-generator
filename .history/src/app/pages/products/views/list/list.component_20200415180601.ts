import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() sections: Section[]
  @Input() profile: MainProfile


  constructor() { }

  ngOnInit() {}


}
