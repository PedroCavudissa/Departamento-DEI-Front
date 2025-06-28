import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaTabelaComponent } from './nota-tabela.component';

describe('NotaTabelaComponent', () => {
  let component: NotaTabelaComponent;
  let fixture: ComponentFixture<NotaTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
