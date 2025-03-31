import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements Validator {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;

  value: string = '';
  touched = false;
  disabled = false;
  control: FormControl = new FormControl();

  onChange = (value: string) => {};

  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: FormControl): ValidationErrors | null {
    this.control = control;
    if (this.required && !control.value) {
      return { required: true };
    }
    if (this.minlength && control.value?.length < this.minlength) {
      return {
        minlength: {
          requiredLength: this.minlength,
          actualLength: control.value.length,
        },
      };
    }
    if (this.maxlength && control.value?.length > this.maxlength) {
      return {
        maxlength: {
          requiredLength: this.maxlength,
          actualLength: control.value.length,
        },
      };
    }
    return null;
  }
}
