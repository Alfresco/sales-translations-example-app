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

import { provideRouter, RouterConfig } from '@angular/router';

import { UploadButtonComponent } from 'ng2-alfresco-upload';
import { FilesComponent } from './components/files/files.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from './components/search/search-bar.component';
import { LoginDemoComponent } from './components/login/login-demo.component';
import { TasksDemoComponent } from './components/tasks/tasks-demo.component';
import { ChartComponent } from './components/chart/chart.component';
import { ActivitiDemoComponent } from './components/process/activiti-demo.component';
import { FormViewer } from './components/process/form-viewer.component';

export const routes: RouterConfig = [
    {path: 'home', component: FilesComponent},
    {path: '', component: LoginDemoComponent},
    {path: 'files', component: FilesComponent},
    {path: 'uploader', component: UploadButtonComponent},
    {path: 'search', component: SearchComponent},
    {path: 'tasks', component: TasksDemoComponent},
    {path: 'chart', component: ChartComponent},
    {path: 'login', component: LoginDemoComponent},
    {path: 'process', component: ActivitiDemoComponent },
    {path: 'process/tasks/:id', component: FormViewer }
];

export const appRouterProviders = [
    provideRouter(routes)
];
