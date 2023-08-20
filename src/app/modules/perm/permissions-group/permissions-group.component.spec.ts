import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsGroupComponent } from './permissions-group.component';

describe('PermissionsGroupComponent', () => {
  let component: PermissionsGroupComponent;
  let fixture: ComponentFixture<PermissionsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
