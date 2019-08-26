import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./modules/auth/guards/auth/auth.guard";

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard]
      },
    { path: "", component: HomeComponent, pathMatch: "full" }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {

}