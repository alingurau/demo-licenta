import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessagesModule } from './shared/messages/messages.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutComponent } from './shared/layout/app/app.component';
import { LoginLayoutComponent } from './shared/layout/login/login.component';
import { HeaderModule } from './shared/header/header.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { LoginModule } from './shared/auth/login/login.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppLayoutComponent,
        LoginLayoutComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppRoutingModule,
        MessagesModule,
        HeaderModule,
        SidebarModule,
        LoginModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
