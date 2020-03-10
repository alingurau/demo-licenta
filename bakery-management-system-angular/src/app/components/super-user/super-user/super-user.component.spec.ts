import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserComponent } from './super-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientsModule } from '../../clients/clients.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatIconModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from '../../../shared/layout/app/app.module';
import { SuperUserModule } from '../super-user.module';

describe('SuperUserComponent', () => {
  let component: SuperUserComponent;
  let fixture: ComponentFixture<SuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SuperUserModule,
        ClientsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        AppLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
