import {Page, NavController} from 'ionic';

@Page({
	templateUrl: './app/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
