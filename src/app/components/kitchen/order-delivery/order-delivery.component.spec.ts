import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryComponent } from './order-delivery.component';

describe('OrderDeliveryComponent', () => {
  let component: OrderDeliveryComponent;
  let fixture: ComponentFixture<OrderDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDeliveryComponent]
    });
    fixture = TestBed.createComponent(OrderDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
