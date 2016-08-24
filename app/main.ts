import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { ALFRESCO_CORE_PROVIDERS } from 'ng2-alfresco-core';
import { ALFRESCO_SEARCH_PROVIDERS } from 'ng2-alfresco-search';
import { UploadService } from 'ng2-alfresco-upload';

bootstrap(AppComponent, [
  UploadService,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ALFRESCO_SEARCH_PROVIDERS,
  ALFRESCO_CORE_PROVIDERS
]);

