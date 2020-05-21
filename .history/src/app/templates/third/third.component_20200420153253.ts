import { Component, OnInit, Input } from '@angular/core';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss'],
})
export class ThirdComponent implements OnInit {

  @Input() profile: MainProfile

  noImage = '../../../assets/img/no-image-cover.png'

  constructor() { }

  ngOnInit() {}

}
