// // Section: 15 ----------Handling Forms in Angular Apps (Template Driven vs Reactive Approach)--------------------

// // import { Component, OnInit } from '@angular/core';
// // import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// // import { Observable } from 'rxjs';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.css']
// // })
// // export class AppComponent implements OnInit {
// //   genders = ['male', 'female'];
// //   signupForm: FormGroup;
// //   forbiddenUsernames = ['olcay', 'Anna'];

// //   ngOnInit() {
// //     this.signupForm = new FormGroup ({
// //       'userData' : new FormGroup({
// //         'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
// //         'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
// //       }),
// //       'gender' : new FormControl('male'),
// //       'hobbies' : new FormArray([])
// //     });
// //     // this.signupForm.valueChanges.subscribe(
// //     //   (value) => console.log(value)
// //     // );
// //     this.signupForm.statusChanges.subscribe(
// //       (status) => console.log(status)
// //     );
// //     // this.signupForm.setValue({
// //     //   'userData': {
// //     //     'username': 'Max',
// //     //     'email': 'max@test.com'
// //     //   },
// //     //   'gender': 'male',
// //     //   'hobbies': []
// //     // });
// //     this.signupForm.patchValue({
// //       'userData': {
// //         'username': 'Anna'
// //       }
// //     });
// //   }

// //   onSubmit() {
// //     console.log(this.signupForm);
// //     this.signupForm.reset();
// //   }

// //   onAddHobby() {
// //     const control = new FormControl(null, Validators.required);
// //     (<FormArray>this.signupForm.get('hobbies')).push(control);
// //   }

// //   getControls() {
// //     return (<FormArray>this.signupForm.get('hobbies')).controls;
// //   }

// //   forbiddenNames(control: FormControl): {[s: string]: boolean} {
// //     if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
// //       return {'nameIsForbidden': true};
// //     }
// //     return null;
// //   }

// //   forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
// //     const promise = new Promise<any>((resolve, reject) => {
// //       setTimeout( () => {
// //         if (control.value === 'test@test.com') {
// //           resolve({'emailIsForbiddden': true});
// //         }
// //         else {
// //           resolve (null);
// //         }
// //       }, 1500);
// //     });
// //     return promise;
// //   }

// // }
// //-----------------------------------------------------------------------------------------------------

// // --------------------------- Forms-Reactive-Assignment ----------------------------------------------

// // import { Component, OnInit } from '@angular/core';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';

// // import { CustomValidators } from './custom-validators';

// // @Component({
// //   selector: 'app-root',
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.css']
// // })
// // export class AppComponent implements OnInit {
// //   projectForm: FormGroup;

// //   ngOnInit() {
// //     this.projectForm = new FormGroup({
// //       'projectName': new FormControl(
// //         null,
// //         [Validators.required, CustomValidators.invalidProjectName],
// //         CustomValidators.asyncInvalidProjectName
// //       ),
// //       'email': new FormControl(null, [Validators.required, Validators.email]),
// //       'projectStatus': new FormControl('critical')
// //     });
// //   }

// //   onSaveProject() {
// //     console.log(this.projectForm);
// //     console.log(this.projectForm.value);
// //   }
// // }

// // --------------------------- Forms-Reactive-Assignment ----------------------------------------------


// // Section:15 - Template Driven Works ------------------------------------------------------------------

// import { Component, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {

//   @ViewChild('f') signupForm: NgForm
//   defaultQuestion = 'pet';
//   asnwer = '';
//   genders = ['male', 'female'];
//   user = {
//     username: '',
//     email: '',
//     secretQuestion: '',
//     answer: '',
//     gender: ''
//   };
//   submitted =  false;

//   //due to using #f = "ngForm" we no more need to use HTMLFormElement
//   // onSubmit() {
//   //   console.log("Submitted");
//   // }

//   //we used @viewChild as an another methot instead of form in the methot
//   //we use NGForm due to html file #f = "ngForm"
//   // onSubmit(form: NgForm) {
//   //   console.log(form);
//   // }

//   suggestUserName() {
//     const suggestedName = 'Superuser';
//     //we will patch value instead of setValue
//     // this.signupForm.setValue({
//     //   userData: {
//     //     username: suggestedName,
//     //     email: ''
//     //   },
//     //   secret: 'pet',
//     //   questionAnswer: '',
//     //   gender: 'male'
//     // });

//     this.signupForm.form.patchValue({
//       userData: {
//         username: suggestedName
//         }
//     });

//   }

//   onSubmit() {
//     console.log(this.signupForm);
//     this.submitted = true;
//     this.user.username = this.signupForm.value.userData.username;
//     this.user.email = this.signupForm.value.userData.email;
//     this.user.secretQuestion = this.signupForm.value.secret;
//     console.log(this.user.secretQuestion);
//     this.user.answer = this.signupForm.value.questionAnswer;
//     this.user.gender = this.signupForm.value.gender;

//     this.signupForm.reset();
//   }


// }

// //---------------------------------------------------------------------------------------------------------


//Forms Template Driven Assignment Solution ---------------------------------------------------------------

// import { Component, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   subscriptions = ['Basic', 'Advanced', 'Pro'];
//   selectedSubscription = 'Advanced';
//   @ViewChild('signupForm', { static: false }) sgnForm: NgForm;
//   onSubmit() {
//     console.log(this.sgnForm.value);
//   }
// }

//--------------------------------------------------------------------------------------------------------
