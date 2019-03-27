import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/components/common/api';

import { AlertService } from '../_services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles: [`
    .ui-messages{
        width: 50%;
        border: none;
        margin: 0;
        border-radius: 15px;
    }`],
    providers: [MessageService]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    messages: Message[];

    constructor(private alertService: AlertService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.messages = [];
            if (message) {
                this.messages.push(message);
                this.messageService.add(message);
            }

        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
