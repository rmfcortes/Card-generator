import { Component, OnInit, Input} from '@angular/core';
import { Section } from 'src/app/interfaces/products.interface';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  @Input() sections: Section[]

  constructor() { }

  ngOnInit() {}
  
}
