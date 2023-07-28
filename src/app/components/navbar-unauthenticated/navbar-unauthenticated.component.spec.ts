import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUnauthenticatedComponent } from './navbar-unauthenticated.component';

describe('NavbarUnauthenticatedComponent', () => {
  let component: NavbarUnauthenticatedComponent;
  let fixture: ComponentFixture<NavbarUnauthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUnauthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUnauthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
