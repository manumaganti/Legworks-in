import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariousServicesComponent } from './various-services-component';

describe('VariousServicesComponent', () => {
  let component: VariousServicesComponent;
  let fixture: ComponentFixture<VariousServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariousServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariousServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
