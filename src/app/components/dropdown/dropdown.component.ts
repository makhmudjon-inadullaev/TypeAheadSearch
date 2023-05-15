import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
})
export class AppDropdown {
    @Input() selected: string = 'Select'
    @Input() disabled: boolean = false
    @Input() options: string[] = []
    @Output() onselect = new EventEmitter()
    @Output() onfocus = new EventEmitter()
    @Output() onblur = new EventEmitter()
    expanded = false

    handleSelect(value: string) {
        if(this.expanded) {
            this.selected = value
            this.onselect.emit(value)
            this.onblur.emit()
            this.expanded = false
        }
    }
}