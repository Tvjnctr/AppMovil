// firebase.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { Database, ref, get, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { Alumno, Clase, Asistencia } from '../modelos/usuario';
import { v4 as uuidv4 } from 'uuid';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let dbMock: jasmine.SpyObj<Database>;
  let storageMock: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const dbSpy = jasmine.createSpyObj('Database', ['ref', 'get', 'set']);
    const storageSpy = jasmine.createSpyObj('Storage', ['create', 'set', 'get', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: Database, useValue: dbSpy },
        { provide: Storage, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(FirebaseService);
    dbMock = TestBed.inject(Database) as jasmine.SpyObj<Database>;
    storageMock = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Agrega aquí las pruebas específicas para tus métodos de FirebaseService
});