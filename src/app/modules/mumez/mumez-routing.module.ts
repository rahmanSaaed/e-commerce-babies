import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';

const routes: Routes = [
	{ path: 'contact-us', component: ContactUsComponent },
	{ path: 'about-us', component: AboutUsComponent },
	{ path: 'terms-condition', component: TermsConditionComponent },
	{ path: 'return-policy', component: ReturnPolicyComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MumezRoutingModule { }
