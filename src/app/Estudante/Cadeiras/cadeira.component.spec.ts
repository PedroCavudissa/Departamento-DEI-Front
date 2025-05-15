import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiraComponent } from './cadeira.component';

describe('CadeiraComponent', () => {
  let component: CadeiraComponent;
  let fixture: ComponentFixture<CadeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadeiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
