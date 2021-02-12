import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockPriceComponent } from './components/stock-price/stock-price.component';
import { MainComponent } from './layout/main/main.component';


const routes: Routes = [
  {path:'', component: MainComponent, children:
  [
    {path:'', component: StockPriceComponent},

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
