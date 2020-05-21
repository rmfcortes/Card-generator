import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss'],
})
export class ThirdComponent implements OnInit {

  noImage = '../../../assets/img/no-image-cover.png'

  constructor() { }

  ngOnInit() {}

}
