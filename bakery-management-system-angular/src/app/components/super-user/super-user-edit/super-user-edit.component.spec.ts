import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserEditComponent } from './super-user-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SuperUserModule } from '../super-user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientsModule } from '../../clients/clients.module';
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

describe('SalesmanEditComponent', () => {
  let component: SuperUserEditComponent;
  let fixture: ComponentFixture<SuperUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        SuperUserModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ClientsModule,
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
    fixture = TestBed.createComponent(SuperUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
