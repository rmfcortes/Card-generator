import { Component, OnInit, Input } from '@angular/core';
import { MainProfile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
})
export class SecondComponent implements OnInit {

  @Input() profile: MainProfile;

  constructor() { }

  ngOnInit() {}

}
