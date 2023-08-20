import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsGroupEditComponent } from './permissions-group-edit.component';

describe('PermissionsGroupEditComponent', () => {
  let component: PermissionsGroupEditComponent;
  let fixture: ComponentFixture<PermissionsGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
