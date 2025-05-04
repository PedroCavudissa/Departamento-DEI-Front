import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaFuncionarioComponent } from './TelaFuncionario.component';

describe('TelaFuncionarioComponent', () => {
  let component: TelaFuncionarioComponent;
  let fixture: ComponentFixture<TelaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaFuncionarioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TelaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
