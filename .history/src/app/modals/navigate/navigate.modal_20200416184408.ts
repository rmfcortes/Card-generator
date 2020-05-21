import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.modal.html',
  styleUrls: ['./navigate.modal.scss'],
})
export class NavigateModal implements OnInit {

  @Input() page

  constructor(
    private inAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.goMaps()
  }

  goMaps() {
    this.inAppBrowser.create(this.page, '_self');
  }

}
