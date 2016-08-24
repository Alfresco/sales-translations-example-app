import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { ALFRESCO_CORE_PROVIDERS } from 'ng2-alfresco-core';
import { ALFRESCO_SEARCH_PROVIDERS } from 'ng2-alfresco-search';
import { UploadService } from 'ng2-alfresco-upload';
import { AppComponent } from './app.component';

import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  ALFRESCO_SEARCH_PROVIDERS,
  ALFRESCO_CORE_PROVIDERS,
  UploadService
]);

