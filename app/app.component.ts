/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {
  MDL,
  AlfrescoSettingsService,
  AlfrescoTranslationService,
  AlfrescoPipeTranslate,
  AlfrescoAuthenticationService
} from 'ng2-alfresco-core';
import { SearchBarComponent } from './components/search/search-bar.component';

declare var document: any;

@Component({
  selector: 'alfresco-app',
  templateUrl: 'app/app.component.html',
  directives: [SearchBarComponent, ROUTER_DIRECTIVES, MDL],
  pipes: [AlfrescoPipeTranslate]
})
export class AppComponent {
  translate: AlfrescoTranslationService;
 searchTerm: string = '';

  constructor(public auth: AlfrescoAuthenticationService,
              public router: Router,
              translate: AlfrescoTranslationService,
              alfrescoSettingsService: AlfrescoSettingsService) {
    alfrescoSettingsService.ecmHost = 'http://127.0.0.1:8080';
    alfrescoSettingsService.bpmHost = 'http://127.0.0.1:9999';

    this.translate = translate;
    this.translate.addTranslationFolder();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  onLogout(event) {
    event.preventDefault();
    this.auth.logout()
      .subscribe(
        () => this.router.navigate(['/login'])
      );
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  hideDrawer() {
    // todo: workaround for drawer closing
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }

}
