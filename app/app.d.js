import 'reflect-metadata';

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

@App({
  template: `
    <ion-menu id="leftMenu" [content]="content">

      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>

      <ion-content>
        <ion-list>
          <button ion-item *ngFor="#p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>
  `
})
class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

import {Page, NavController} from 'ionic/ionic';

@Page({
	template: `

   <ion-navbar *navbar>
     <button menuToggle>
       <icon menu></icon>
     </button>
     <ion-title>Hello Ionic</ion-title>
   </ion-navbar>


   <ion-content padding class="getting-started">

     <h3>Welcome to your first Ionic app!</h3>

     <p>
       This starter project is our way of helping you get a functional app running in record time.
     </p>
     <p>
       Follow along on the tutorial section of the Ionic docs!
     </p>
     <p>
       <button primary menuToggle>Toggle Menu</button>
     </p>

   </ion-content>
	`
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
	template: `
   <ion-navbar *navbar>
     <button menuToggle *ngIf="!selectedItem">
       <icon menu></icon>
     </button>
     <ion-title>Item Details</ion-title>
   </ion-navbar>

   <ion-content>
    <div *ngIf="selectedItem" class="selection">
       <b>{{selectedItem.title}}</b>
       <icon name="{{selectedItem.icon}}"></icon>
       <div>
         You navigated here from <b>{{selectedItem.title}}</b>
       </div>
     </div>
   </ion-content>
	`
})
export class ItemDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  template: `
    <ion-navbar *navbar>
      <button menuToggle>
        <icon menu></icon>
      </button>
      <ion-title>My First List</ion-title>
    </ion-navbar>

    <ion-content>
      <ion-list>
        <button ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
          <icon name="{{item.icon}}" item-left></icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="selectedItem" padding>
        You navigated here from <b>{{selectedItem.title}}</b>
      </div>
    </ion-content>
  `
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

     // this.nav.push(ItemDetailsPage, {
     //   item: item
     // });
  }
}

import 'reflect-metadata';

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

@App({
  template: `
    <ion-menu id="leftMenu" [content]="content">

      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>

      <ion-content>
        <ion-list>
          <button ion-item *ngFor="#p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>
  `
})
class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

import {Page, NavController} from 'ionic/ionic';

@Page({
	template: `

   <ion-navbar *navbar>
     <button menuToggle>
       <icon menu></icon>
     </button>
     <ion-title>Hello Ionic</ion-title>
   </ion-navbar>


   <ion-content padding class="getting-started">

     <h3>Welcome to your first Ionic app!</h3>

     <p>
       This starter project is our way of helping you get a functional app running in record time.
     </p>
     <p>
       Follow along on the tutorial section of the Ionic docs!
     </p>
     <p>
       <button primary menuToggle>Toggle Menu</button>
     </p>

   </ion-content>
	`
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  template: `
    <ion-navbar *navbar>
      <button menuToggle>
        <icon menu></icon>
      </button>
      <ion-title>My First List</ion-title>
    </ion-navbar>

    <ion-content>
      <ion-list>
        <button ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
          <icon name="{{item.icon}}" item-left></icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="selectedItem" padding>
        You navigated here from <b>{{selectedItem.title}}</b>
      </div>
    </ion-content>
  `
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

     // this.nav.push(ItemDetailsPage, {
     //   item: item
     // });
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
	template: `
   <ion-navbar *navbar>
     <button menuToggle *ngIf="!selectedItem">
       <icon menu></icon>
     </button>
     <ion-title>Item Details</ion-title>
   </ion-navbar>

   <ion-content>
    <div *ngIf="selectedItem" class="selection">
       <b>{{selectedItem.title}}</b>
       <icon name="{{selectedItem.icon}}"></icon>
       <div>
         You navigated here from <b>{{selectedItem.title}}</b>
       </div>
     </div>
   </ion-content>
	`
})
export class ItemDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}

import 'reflect-metadata';

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

@App({
  template: `
    <ion-menu id="leftMenu" [content]="content">

      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>

      <ion-content>
        <ion-list>
          <button ion-item *ngFor="#p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>
  `
})
class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

import {Page, NavController} from 'ionic/ionic';

@Page({
	template: `

   <ion-navbar *navbar>
     <button menuToggle>
       <icon menu></icon>
     </button>
     <ion-title>Hello Ionic</ion-title>
   </ion-navbar>


   <ion-content padding class="getting-started">

     <h3>Welcome to your first Ionic app!</h3>

     <p>
       This starter project is our way of helping you get a functional app running in record time.
     </p>
     <p>
       Follow along on the tutorial section of the Ionic docs!
     </p>
     <p>
       <button primary menuToggle>Toggle Menu</button>
     </p>

   </ion-content>
	`
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
	template: `
   <ion-navbar *navbar>
     <button menuToggle *ngIf="!selectedItem">
       <icon menu></icon>
     </button>
     <ion-title>Item Details</ion-title>
   </ion-navbar>

   <ion-content>
    <div *ngIf="selectedItem" class="selection">
       <b>{{selectedItem.title}}</b>
       <icon name="{{selectedItem.icon}}"></icon>
       <div>
         You navigated here from <b>{{selectedItem.title}}</b>
       </div>
     </div>
   </ion-content>
	`
})
export class ItemDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  template: `
    <ion-navbar *navbar>
      <button menuToggle>
        <icon menu></icon>
      </button>
      <ion-title>My First List</ion-title>
    </ion-navbar>

    <ion-content>
      <ion-list>
        <button ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
          <icon name="{{item.icon}}" item-left></icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="selectedItem" padding>
        You navigated here from <b>{{selectedItem.title}}</b>
      </div>
    </ion-content>
  `
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

     // this.nav.push(ItemDetailsPage, {
     //   item: item
     // });
  }
}

import 'reflect-metadata';

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

@App({
  template: `
    <ion-menu id="leftMenu" [content]="content">

      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>

      <ion-content>
        <ion-list>
          <button ion-item *ngFor="#p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>
  `
})
class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

import {Page, NavController} from 'ionic/ionic';

@Page({
	template: `

   <ion-navbar *navbar>
     <button menuToggle>
       <icon menu></icon>
     </button>
     <ion-title>Hello Ionic</ion-title>
   </ion-navbar>


   <ion-content padding class="getting-started">

     <h3>Welcome to your first Ionic app!</h3>

     <p>
       This starter project is our way of helping you get a functional app running in record time.
     </p>
     <p>
       Follow along on the tutorial section of the Ionic docs!
     </p>
     <p>
       <button primary menuToggle>Toggle Menu</button>
     </p>

   </ion-content>
	`
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  template: `
    <ion-navbar *navbar>
      <button menuToggle>
        <icon menu></icon>
      </button>
      <ion-title>My First List</ion-title>
    </ion-navbar>

    <ion-content>
      <ion-list>
        <button ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
          <icon name="{{item.icon}}" item-left></icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="selectedItem" padding>
        You navigated here from <b>{{selectedItem.title}}</b>
      </div>
    </ion-content>
  `
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

     // this.nav.push(ItemDetailsPage, {
     //   item: item
     // });
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
	template: `
   <ion-navbar *navbar>
     <button menuToggle *ngIf="!selectedItem">
       <icon menu></icon>
     </button>
     <ion-title>Item Details</ion-title>
   </ion-navbar>

   <ion-content>
    <div *ngIf="selectedItem" class="selection">
       <b>{{selectedItem.title}}</b>
       <icon name="{{selectedItem.icon}}"></icon>
       <div>
         You navigated here from <b>{{selectedItem.title}}</b>
       </div>
     </div>
   </ion-content>
	`
})
export class ItemDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}

import 'reflect-metadata';

import {App, IonicApp, Platform} from 'ionic/ionic';

import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

@App({
  template: `
    <ion-menu id="leftMenu" [content]="content">

      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>

      <ion-content>
        <ion-list>
          <button ion-item *ngFor="#p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>
  `
})
class MyApp {
  constructor(app: IonicApp, platform: Platform) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = HelloIonicPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (typeof StatusBar !== 'undefined') {
        StatusBar.styleDefault();
      }
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}

import {Page, NavController} from 'ionic/ionic';

@Page({
	template: `

   <ion-navbar *navbar>
     <button menuToggle>
       <icon menu></icon>
     </button>
     <ion-title>Hello Ionic</ion-title>
   </ion-navbar>


   <ion-content padding class="getting-started">

     <h3>Welcome to your first Ionic app!</h3>

     <p>
       This starter project is our way of helping you get a functional app running in record time.
     </p>
     <p>
       Follow along on the tutorial section of the Ionic docs!
     </p>
     <p>
       <button primary menuToggle>Toggle Menu</button>
     </p>

   </ion-content>
	`
})
export class HelloIonicPage {
  constructor(nav: NavController) {
    this.nav = nav;
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
  template: `
    <ion-navbar *navbar>
      <button menuToggle>
        <icon menu></icon>
      </button>
      <ion-title>My First List</ion-title>
    </ion-navbar>

    <ion-content>
      <ion-list>
        <button ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
          <icon name="{{item.icon}}" item-left></icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="selectedItem" padding>
        You navigated here from <b>{{selectedItem.title}}</b>
      </div>
    </ion-content>
  `
})
export class ListPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {

    console.log('You selected:', item.title);

     // this.nav.push(ItemDetailsPage, {
     //   item: item
     // });
  }
}

import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
	template: `
   <ion-navbar *navbar>
     <button menuToggle *ngIf="!selectedItem">
       <icon menu></icon>
     </button>
     <ion-title>Item Details</ion-title>
   </ion-navbar>

   <ion-content>
    <div *ngIf="selectedItem" class="selection">
       <b>{{selectedItem.title}}</b>
       <icon name="{{selectedItem.icon}}"></icon>
       <div>
         You navigated here from <b>{{selectedItem.title}}</b>
       </div>
     </div>
   </ion-content>
	`
})
export class ItemDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
