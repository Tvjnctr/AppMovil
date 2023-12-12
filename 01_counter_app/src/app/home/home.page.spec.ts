// home.page.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';
import { FirebaseService } from '../servicio/firebase.service';
import { of } from 'rxjs';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('FirebaseService', ['obtenerUsuario', 'setCurrentUser']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: FirebaseService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerInfo on validateRut', async () => {
    const realUserInfo = { contra: 'realPassword', esprofe: false }; // Utiliza datos reales
    firebaseServiceSpy.obtenerUsuario.and.returnValue(of(realUserInfo).toPromise());
  
    component.inputRut = 'realRut';
    await component.validateRut();
  
    expect(firebaseServiceSpy.obtenerUsuario).toHaveBeenCalledWith('realRut');
    expect(component.userInfo).toEqual(jasmine.objectContaining({ contra: 'realPassword', esprofe: false }));
  });
  
  // Puedes agregar más casos de prueba según sea necesario
});