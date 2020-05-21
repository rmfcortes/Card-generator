import { FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';

export class EmailValidator {

    static validEmail(fc: FormControl){

        let userService: UsersService

        console.log(fc.value.email);
        userService.userExist(fc.value.email)
        .then(exists => {
            if (exists) return null
            else return ({validEmail: true})
        })
        .catch(() => null)
      if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
        return ({validUsername: true});
      } else {
        return (null);
      }
    }
  }