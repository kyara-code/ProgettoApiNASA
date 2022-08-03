import { HttpReq } from './../Service/httpReq.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';
import { from } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});

  constructor(private httpReq: HttpReq) {}

  ngOnInit(): void {
    // inizializzo il form
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl("Hey, let's get in touch!", []),
      body: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.httpReq
      .onSendEmail(
        this.contactForm.value.name,
        this.contactForm.value.email,
        this.contactForm.value.subject,
        this.contactForm.value.body
      )
      .subscribe((res) => {
        console.log('Email inviata: ' + res);
      });
  }
}
