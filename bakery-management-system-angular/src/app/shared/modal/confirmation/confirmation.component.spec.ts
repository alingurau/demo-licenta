import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationComponent } from './confirmation.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalConfirmationComponent
      ],
      imports: [
        NgbModule.forRoot(),
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
