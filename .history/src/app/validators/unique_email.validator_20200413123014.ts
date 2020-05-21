import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';

export const uniqueEmail = ( userService: UserService ) => {
    return (control: FormControl) => {
        userService.isEmailRegistered(control.value)
        .then(res => {
            control.setErrors(null)
            if (res) { notUnique: true } 
            else null
        })
    }
}