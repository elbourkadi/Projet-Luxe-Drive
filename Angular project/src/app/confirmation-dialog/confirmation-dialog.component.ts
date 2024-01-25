import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() message!: string;
  @Output() confirm = new EventEmitter<boolean>();

  onConfirmClick(): void {
    this.confirm.emit(true);
  }

  onCancelClick(): void {
    this.confirm.emit(false);
  }

}
