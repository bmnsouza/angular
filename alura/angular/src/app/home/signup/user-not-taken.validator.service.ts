import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signUpService: SignUpService) { }

  checkUserNameTaken() {

    return (control: AbstractControl) => {
      return control
        .valueChanges
        .pipe(debounceTime(500))
        .pipe(switchMap(userName => this.signUpService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
        .pipe(first());
    }
  }
}