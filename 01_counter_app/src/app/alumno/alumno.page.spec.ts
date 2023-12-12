import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AlumnoPage } from './alumno.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseService } from '../servicio/firebase.service';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';
import { Alumno } from '../modelos/usuario';

describe('AlumnoPage', () => {
  let component: AlumnoPage;
  let fixture: ComponentFixture<AlumnoPage>;
  let mockStorage: any;
  let mockFirebaseService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoPage],
      imports: [RouterTestingModule],
      providers: [
        FirebaseService,
        {
          provide: Storage,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(AlumnoPage);
    component = fixture.componentInstance;
    mockStorage = TestBed.inject(Storage);
    mockFirebaseService = TestBed.inject(FirebaseService);
  });

  it('should load user data and call obtenerDetalleClases', fakeAsync(() => {
    const mockUser: Alumno = {
      nombre: 'Ejemplo',
      apellido: 'EjemploApellido',
      rut: '12345678-9',
      sede: 'SedeEjemplo',
      contra: 'password', // Si es necesario según la estructura de Alumno
      edad: '25', // Si es necesario según la estructura de Alumno
      esprofe: false, // Si es necesario según la estructura de Alumno
      asignaturainscrita: [],
      asignaturaprofe: [] // Si es necesario según la estructura de Alumno
    };

    // Mock para el método 'get' de Storage
    mockStorage.get.mockReturnValueOnce(of(mockUser));

    // Espía el método 'obtenerDetalleClases' de FirebaseService
    spyOn(mockFirebaseService, 'obtenerDetalleClases').and.returnValue(Promise.resolve(/* mock de detalles de clases */));

    // Llama al método cargarDatosUsuario
    component.cargarDatosUsuario();
    tick();

    // Verifica que el usuario se haya asignado correctamente
    expect(component.alumno).toEqual(mockUser);

    // Verifica que obtenerDetalleClases haya sido llamado con los datos del usuario
    expect(mockFirebaseService.obtenerDetalleClases).toHaveBeenCalledWith(mockUser.asignaturainscrita);

    // Puedes agregar más expectativas según tu lógica
  }));
});