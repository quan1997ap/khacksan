import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsGroupEditFormComponent } from './permissions-group-edit-form.component';

describe('PermissionsGroupEditFormComponent', () => {
  let component: PermissionsGroupEditFormComponent;
  let fixture: ComponentFixture<PermissionsGroupEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsGroupEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsGroupEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
