import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DateClass, DateRemoveEvent } from 'ngx-multiple-dates';
import { DEFAULT_THEME } from '../../../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent{
  dateChanged($event: any) {
    console.log($event.target.value)
  }

  public model!: Date[];
  public modelWithToggleButton!: Date[];
  public modelPredefined: Date[] = [
    new Date('7/15/1966'),
    new Date('3/23/1968'),
    new Date('7/4/1992'),
    new Date('1/25/1994'),
    new Date('6/17/1998')
  ];
  public modelMinMax!: Date[];
  public modelMinlengthMaxlength!: Date[];
  public modelRequired!: Date[];
  public modelColor!: Date[];
  public modelFormat!: Date[];
  public modelCalendar!: Date[];
  public modelClasses: Date[] = [ new Date('3/7/2021'), new Date('3/11/2021') ];
  public min = new Date(+(new Date()) - 30 * 24 * 60 * 60 * 1000);
  public max = new Date(+(new Date()) + 30 * 24 * 60 * 60 * 1000);
  public classes: DateClass[] = [
    { value: new Date('3/5/2021'), className: 'my-red' },
    { value: new Date('3/7/2021'), className: 'my-green' },
    { value: new Date('3/9/2021'), className: 'my-blue' }
  ];
  public reactiveControl = new UntypedFormControl();
  public dynamicName = 'reactiveFormControl';
  public reactiveForm = new UntypedFormGroup({
    [this.dynamicName]: new UntypedFormControl(this.modelPredefined)
  });
  private _themeClass: string = DEFAULT_THEME;

  @HostBinding('class')
  public get themeClass(): string {
    return this._themeClass;
  }
  public set themeClass(value: string) {
    if (value) {
      this._overlayContainer.getContainerElement().classList.remove(this._themeClass);
      this._overlayContainer.getContainerElement().classList.add(value);
      this._themeClass = value;
    }
  }

  constructor(private _overlayContainer: OverlayContainer) {
    this._overlayContainer.getContainerElement().classList.add(this.themeClass);
    this.reactiveControl.valueChanges.subscribe((values) => console.log('reactiveControl', values));
    this.reactiveForm.valueChanges.subscribe((values) => console.log('reactiveForm', values));
  }

  public dateRemoved(date: DateRemoveEvent<Date>): void {
    console.log('removed', date);
  }
}
