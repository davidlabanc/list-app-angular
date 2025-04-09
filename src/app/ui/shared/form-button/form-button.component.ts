import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  imports: [CommonModule],
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css'
})
export class FormButtonComponent {
  @Input() loading = false
  @Input() disabled = false
  @Input() text = ''
  @Input() submit = () => {}

}
