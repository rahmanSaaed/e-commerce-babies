import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';



import { MumezRoutingModule } from './mumez-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { QuestionAnswerComponent } from './q-a/question-answer/question-answer.component';


@NgModule({
  declarations: [ContactUsComponent, AboutUsComponent, TermsConditionComponent, ReturnPolicyComponent, QuestionAnswerComponent],
  imports: [
    CommonModule,
    MumezRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUb5Iw_VNw2jOaToFuPbGF5Wz5Pp7mem8'
    }),
    ReactiveFormsModule,
    SharedModule

  ]
})
export class MumezModule { }
