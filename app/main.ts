import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { PLATFORM_PIPES } from '@angular/core';
import { ALFRESCO_CORE_PROVIDERS, AlfrescoPipeTranslate } from 'ng2-alfresco-core';
import { ATIVITI_FORM_PROVIDERS } from 'ng2-activiti-form';
import { ALFRESCO_SEARCH_PROVIDERS } from 'ng2-alfresco-search';
import { UploadService } from 'ng2-alfresco-upload';
import { AppComponent } from './app.component';

import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  ALFRESCO_SEARCH_PROVIDERS,
  ALFRESCO_CORE_PROVIDERS,
  { provide: PLATFORM_PIPES, useValue: AlfrescoPipeTranslate, multi: true },
  UploadService,
  ATIVITI_FORM_PROVIDERS
]);

