import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemControlButtonsComponent } from './system-control-buttons.component';

describe('SystemControlButtonsComponent', () => {
  let component: SystemControlButtonsComponent;
  let fixture: ComponentFixture<SystemControlButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemControlButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
