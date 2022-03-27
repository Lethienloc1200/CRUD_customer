import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddEditCustomerComponent } from './form-add-edit-customer.component';

describe('FormAddEditCustomerComponent', () => {
  let component: FormAddEditCustomerComponent;
  let fixture: ComponentFixture<FormAddEditCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddEditCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
