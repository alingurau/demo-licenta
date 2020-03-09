import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePickerComponent } from './theme-picker.component';
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule
} from '@angular/material';
import { KeysPipeModule } from '../../pipes/keys/keys.module';

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;
  let fixture: ComponentFixture<ThemePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        KeysPipeModule
      ],
      declarations: [ ThemePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
