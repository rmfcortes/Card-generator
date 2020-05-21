import { UserService } from 'src/app/services/user.service';
import { AbstractControl } from '@angular/forms';

export class ValidateEmailNotTaken {
    static createValidator(userService: UserService) {
      return (control: AbstractControl) => {
        return userService.checkEmailNotTaken(control.value).then(res => {
          console.log(res);
          return res ? null : {emailTaken: true};
        });
      };
    }
  }