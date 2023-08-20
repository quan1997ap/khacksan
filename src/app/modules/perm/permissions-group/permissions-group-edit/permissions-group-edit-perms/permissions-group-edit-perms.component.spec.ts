import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsGroupEditPermsComponent } from './permissions-group-edit-perms.component';

describe('PermissionsGroupEditPermsComponent', () => {
  let component: PermissionsGroupEditPermsComponent;
  let fixture: ComponentFixture<PermissionsGroupEditPermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsGroupEditPermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsGroupEditPermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
