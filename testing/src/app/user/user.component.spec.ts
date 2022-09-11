/* 1st failure trial
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

it('should use the user name from the service', () => {
  let fixture = TestBed.createComponent(UserComponent);
  let app = fixture.debugElement.componentInstance;
  let userService = fixture.debugElement.injector.get(UserService);
  fixture.detectChanges();
  expect(userService.user.name).toEqual(app.user.name);
});

it('should display the user name if user is logged in', () => {
  let fixture = TestBed.createComponent(UserComponent);
  let app = fixture.debugElement.componentInstance;
  app.isLoggedIn = true;
  fixture.detectChanges();
  let compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('p').textContent).toContain(app.user.name);
});

it('shouldn\'t display the user name if user is not logged in', () => {
  let fixture = TestBed.createComponent(UserComponent);
  let app = fixture.debugElement.componentInstance;
  app.isLoggedIn = false;
  fixture.detectChanges();
  let compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
});
 */

/* 2.nd failure trial
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    let userService = fixture.debugElement.injector.get(UserService);
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if user is logged in', () => {
    let compiled = fixture.debugElement.nativeElement;
    component.isLoggedIn = true;
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain(component.user.name);
  });

  it('shouldn\'t display the user name if user is not logged in', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(component.user.name);
  });

  it('shouldn\'t fetch data successfully if not called asynchronously', () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
        .and.returnValue(Promise.resolve('Data'));
    expect(component.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', async(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
        .and.returnValue(Promise.resolve('Data'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('XXXXX');
    });
  }));
}); */

// 3.rd success trial
import { DataService } from './../shared/data.service';
import { UserService } from './user.service';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
describe('UserComponent', () => {
 let component: UserComponent;
 let fixture: ComponentFixture<UserComponent>;
 beforeEach(async(() => {
 TestBed.configureTestingModule({
 declarations: [UserComponent]
 })
 .compileComponents();
 }));
beforeEach(() => {
 fixture = TestBed.createComponent(UserComponent);
 component = fixture.componentInstance;
 });

 it('should create the app', () => {
  let app = fixture.debugElement.componentInstance;
  expect(app).toBeTruthy();
});

it('should use the user name from the service', () => {
  let app = fixture.debugElement.componentInstance;
  let userService = fixture.debugElement.injector.get(UserService);
  fixture.detectChanges();
  expect(userService.user.name).toEqual(app.user.name);
});

it('should display the user name if user is logged in', () => {
  let app = fixture.debugElement.componentInstance;
  app.isLoggedIn = true;
  fixture.detectChanges();
  let compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('p').textContent).toContain(app.user.name);
});

it('shouldn\'t display the user name if user is not logged in', () => {
  let app = fixture.debugElement.componentInstance;
  fixture.detectChanges();
  let compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
});

it('shouldn\'t fetch data successfully if not called asynchronously', () => {
  let app = fixture.debugElement.componentInstance;
  let dataService = fixture.debugElement.injector.get(DataService);
  let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
  fixture.detectChanges();
  expect(app.data).toBe(undefined);
});

 it('should fetch data succefully if called asynchronously', async(() => {
 const dataService = fixture.debugElement.injector.get(DataService);
 const spy = spyOn(dataService, 'getDetails')
  .and.returnValue(Promise.resolve('Data'));
 fixture.detectChanges();
 expect(component.data).toBe(undefined);
 }));

 it('should fetch data successfully if called asynchronously', async(() => {
  let fixture = TestBed.createComponent(UserComponent);
  let app = fixture.debugElement.componentInstance;
  let dataService = fixture.debugElement.injector.get(DataService);
  let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(app.data).toBe('Data');
  });
}));

it('should fetch data successfully if called asynchronously', fakeAsync(() => {
  let fixture = TestBed.createComponent(UserComponent);
  let app = fixture.debugElement.componentInstance;
  let dataService = fixture.debugElement.injector.get(DataService);
  let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));
  fixture.detectChanges();
  tick();
  expect(app.data).toBe('Data');

}));


});

