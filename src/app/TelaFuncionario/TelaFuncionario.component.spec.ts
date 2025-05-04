import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaFuncionarioComponent } from './TelaFuncionario.component';

describe('TelaFuncionarioComponent', () => {
  let component: TelaFuncionarioComponent;
  let fixture: ComponentFixture<TelaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaFuncionarioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TelaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});