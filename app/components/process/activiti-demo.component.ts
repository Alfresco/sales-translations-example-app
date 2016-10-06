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

import { Component, AfterViewChecked, ViewChild, Input } from '@angular/core';
import { ALFRESCO_TASKLIST_DIRECTIVES } from 'ng2-activiti-tasklist';
import { ACTIVITI_PROCESSLIST_DIRECTIVES } from 'ng2-activiti-processlist';
import { ActivitiForm } from 'ng2-activiti-form';

declare let __moduleName: string;
declare var componentHandler;

@Component({
    moduleId: __moduleName,
    selector: 'activiti-demo',
    templateUrl: './activiti-demo.component.html',
    styleUrls: ['./activiti-demo.component.css'],
    directives: [ALFRESCO_TASKLIST_DIRECTIVES, ACTIVITI_PROCESSLIST_DIRECTIVES, ActivitiForm]
})
export class ActivitiDemoComponent implements AfterViewChecked {

    currentChoice: string = 'task-list';

    @ViewChild('activitidetails')
    activitidetails: any;

    @ViewChild('activititasklist')
    activititasklist: any;

    @ViewChild('activitiprocessfilter')
    activitiprocessfilter: any;

    @ViewChild('activitiprocesslist')
    activitiprocesslist: any;

    @ViewChild('activitiprocessdetails')
    activitiprocessdetails: any;

    currentTaskId: string;
    currentProcessInstanceId: string;

    taskSchemaColumns: any [] = [];
    processSchemaColumns: any [] = [];

    taskFilter: any;
    processFilter: any;

    @Input()
    appId: string = "1";

    setChoice($event) {
        this.currentChoice = $event.target.value;
    }

    isProcessListSelected() {
        return this.currentChoice === 'process-list';
    }

    isTaskListSelected() {
        return this.currentChoice === 'task-list';
    }

    constructor() {
        this.taskSchemaColumns = [
            {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: false}
        ];
        this.processSchemaColumns = [
            {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: false}
        ];
    }

    onTaskFilterClick(event: any) {
        this.taskFilter = event;
        this.activititasklist.load(this.taskFilter);
    }

    onProcessFilterClick(event: any) {
        console.log(event);
        this.processFilter = event;
        // this.processFilter = this.activitiprocessfilter.currentFilter;

        this.activitiprocesslist.load(event);
        // this.activitiprocesslist.reload();
    }

    onSuccessProcessFilterList(event: any) {
        this.processFilter = this.activitiprocessfilter.currentFilter;
    }

    onSuccessProcessList(event: any) {
        this.currentProcessInstanceId = this.activitiprocesslist.getCurrentProcessId();
    }

    onTaskRowClick(taskId) {
        this.currentTaskId = taskId;
        this.activitidetails.loadDetails(this.currentTaskId);
    }

    onProcessRowClick(processInstanceId) {
        this.currentProcessInstanceId = processInstanceId;
        this.activitiprocessdetails.load(this.currentProcessInstanceId);
    }

    processCancelled(data: any) {
        this.currentProcessInstanceId = null;
        this.activitiprocesslist.reload();
    }

    taskFormCompleted(data: any) {
        this.activitiprocesslist.reload();
    }

    ngAfterViewChecked() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}
