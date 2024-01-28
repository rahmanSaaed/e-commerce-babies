import { SpinnerService } from './../../@shared/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Returns } from '../../@resources/returns/returns';
import { BlogsService } from '@resources/services/mumez/blogs/blogs.service';
import { ContactUsService } from '../../@resources/services/mumez/contact-us/contact-us.service';
import { ToastrService } from 'ngx-toastr';
import { HandleErrorsService } from '@resources/services/handle-errors/handle-errors.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  lat = 29.996715161198708;
  lng = 31.230757969900463;
  zoom = 16;

  createContactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    description: ['', Validators.required],
    phone: ['', [Validators.required,Validators.pattern(/(201)[0-9]{9}/),Validators.minLength(12),Validators.maxLength(12)]],
  });
  isSubmitting: boolean = false;
  sittingsValues: any;

  constructor(
    private contactUsService: ContactUsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private blogsService: BlogsService,
    private spinner: SpinnerService,
    private handleErrorsService: HandleErrorsService

  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getSittings();
  }

  createContact() {
    console.log(this.createContactForm.value);
    const variables = {
      contactInput:  this.createContactForm.value
    }
    console.log('variables', variables);
    this.contactUsService.createContact(variables).subscribe((res: any) => {
      // this.isSubmitting = true;
      console.log('data', res);
      if (res) {
        this.toastr.success(`${res.data.createContact.message}`)
        // this.router.navigate(['auth/confirm-registertation'], { queryParams: { email: this.createContact.value.email } });
        this.createContactForm.reset();
      }
    }, error => {
      // this.toastr.error(error)
      this.handleErrorsService.handleError(error);
    });
  }


  getSittings() {
    this.blogsService.getSitting().subscribe((res: any) => {
      this.sittingsValues = res.data.setting;
      console.log('getSittings', this.sittingsValues)

      this.spinner.hide();
    })
  }

  get email() {
    return this.createContactForm.get('email');
  }

  get name() {
    return this.createContactForm.get('name');
  }

  get description() {
    return this.createContactForm.get('description');
  }

  get phone() {
    return this.createContactForm.get('phone');
  }


}
