import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/dado-prof/dado-prof.component.spec.ts
import { DadoProfComponent } from './dado-prof.component';

describe('DadoProfComponent', () => {
  let component: DadoProfComponent;
  let fixture: ComponentFixture<DadoProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadoProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadoProfComponent);
========
import { HorarioComponent } from './horario.component';

describe('HorarioComponent', () => {
  let component: HorarioComponent;
  let fixture: ComponentFixture<HorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioComponent);
>>>>>>>> Dev:src/app/Admin-Secretaria/menu-admin/horario/horario.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
