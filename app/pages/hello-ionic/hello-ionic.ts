import {Page, NavController} from 'ionic/ionic';

@Page({
	templateUrl: './app/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}
