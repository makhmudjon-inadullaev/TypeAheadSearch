import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-alert-error',
    templateUrl: './error.component.html',
})
export class ErrorAlertComponent {
    @Input() error: string | null = null
}