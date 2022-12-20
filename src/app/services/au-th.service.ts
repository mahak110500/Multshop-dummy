import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { User } from "../models/user.model";



const SIGNIN_USER_MUTATION = gql `
    mutation accountRegister($input: AccountRegisterInput!) {
        accountRegister(input: $input){
        user {
            firstName
        }
        }
    }

`;


// mutation accountRegister($firstname:string $lastname:string $email:string $password:string) {
//     accountRegister(firstname:$firstname lastname:$lastname email:$email password:$password ){
//     user {
//         firstName
//     }
//     }
// }


@Injectable({
    providedIn: 'root'
})

export class AutheService{

    allUsers: User[] = [];

    authForm:User = {
        firstName: '',
        lastName: '',
        password: '',
        email: ''
    }


   constructor(private apollo: Apollo){ }

   signUp(){
        this.apollo.mutate({
            mutation: SIGNIN_USER_MUTATION,
            variables: {
                "input" : {
                    email: this.authForm.email,
                    password: this.authForm.password
                } 
            }

        }) .subscribe(({data}) => {
            let user = Object.assign([], this.allUsers);
            user.unshift(data["accountRegister"]);
            this.allUsers = user;
        })
        
    }



}