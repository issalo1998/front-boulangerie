import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { ProfilsComponent } from './profils/profils.component';
import { TypesComponent } from './types/types.component';
import { ProduitsComponent } from './produits/produits.component';
import { VaguesComponent } from './vagues/vagues.component';
import {HttpClientModule} from '@angular/common/http';
import {ProfilService} from './services/profil.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersComponent } from './users/users.component';
import { SingleVagueComponent } from './single-vague/single-vague.component';
import { DetailComponent } from './detail/detail.component';
import { Vagues2Component } from './vagues2/vagues2.component';
import { SingleVague2Component } from './single-vague2/single-vague2.component';
import { Detail2Component } from './detail2/detail2.component';
import { IndexComponent } from './index/index.component';
import {AuthGuardService} from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import { CaisseComponent } from './caisse/caisse.component';
import { EditCaisseComponent } from './edit-caisse/edit-caisse.component';
import { DetailCaisseComponent } from './detail-caisse/detail-caisse.component';
import { DepotComponent } from './depot/depot.component';
import { FraisspeciauxComponent } from './fraisspeciaux/fraisspeciaux.component';
import { FarineComponent } from './farine/farine.component';
import { CommandeComponent } from './commande/commande.component';
import { AbonnerComponent } from './abonner/abonner.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommandeUpdateComponent } from './commande/commandeUpdate.component';
import { EntreesortieComponent } from './entreesortie/entreesortie.component';
import { ListehistoriqueComponent } from './listehistorique/listehistorique.component';
import { AbonnerUpdateComponent } from './abonner/abonnerUpdate.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { AbonnementListeComponent } from './abonnement/abonnementListe.component';
import { ListeVaguesComponent } from './vagues/liste-vagues.component';
import { ListeVague2Component } from './vagues2/liste-vague2.component';
import { ListeCaissesComponent } from './caisse/liste-caisses.component';
import { DebriefmoisComponent } from './debriefmois/debriefmois.component';
import { abonnerpipe } from './abonner/abonner.pipe';
import { commanderpipe } from './commande/commander.pipe';






const appRoutes : Routes = [
  {path:'profils' ,canActivate:[AuthGuardService],component : ProfilsComponent},
  {path:'entreesorties/:id/:idhisto' ,canActivate:[AuthGuardService],component : EntreesortieComponent},
  {path:'listehistorique/:id' ,canActivate:[AuthGuardService],component : ListehistoriqueComponent},
  {path:'users' ,canActivate:[AuthGuardService], component : UsersComponent},
  {path:'debriefmois' ,canActivate:[AuthGuardService], component : DebriefmoisComponent},
  {path:'types-produits' ,canActivate:[AuthGuardService], component : TypesComponent},
  {path:'depots' ,canActivate:[AuthGuardService], component : DepotComponent},
  {path:'farines' ,canActivate:[AuthGuardService], component : FarineComponent},
  {path:'abonnes' ,canActivate:[AuthGuardService], component : AbonnerComponent},
  {path:'abonnement/:id' ,canActivate:[AuthGuardService], component : AbonnementComponent},
  {path:'abonnement2/:id/:id1' ,canActivate:[AuthGuardService], component : AbonnementComponent},
  {path:'abonnementliste/:id' ,canActivate:[AuthGuardService], component : AbonnementListeComponent},
  {path:'commandes' ,canActivate:[AuthGuardService], component : CommandeComponent},
  { path: "commandeUpdate",canActivate:[AuthGuardService], component: CommandeUpdateComponent },
  { path: "commandeUpdate/:id1",canActivate:[AuthGuardService], component:  CommandeUpdateComponent },
  {path:'abonners' ,canActivate:[AuthGuardService], component : AbonnerComponent},
  { path: "abonnersUpdate",canActivate:[AuthGuardService], component: AbonnerUpdateComponent },
  { path: "abonnersUpdate/:id",canActivate:[AuthGuardService], component:  AbonnerUpdateComponent },
  {path:'fraisspeciaux' ,canActivate:[AuthGuardService], component : FraisspeciauxComponent},
  {path:'produits' , canActivate:[AuthGuardService],component : ProduitsComponent},
  {path:'listevagues' ,canActivate:[AuthGuardService], component : ListeVaguesComponent},
  {path:'vagues' ,canActivate:[AuthGuardService], component : VaguesComponent},
  {path:'vagues/:id' ,canActivate:[AuthGuardService], component : SingleVagueComponent},
  {path:'listevagues2' ,canActivate:[AuthGuardService], component : ListeVague2Component},
  {path:'vagues2' , canActivate:[AuthGuardService],component : Vagues2Component},
  {path:'vagues2/:id' ,canActivate:[AuthGuardService], component : SingleVague2Component},
  {path:'details/:id' ,canActivate:[AuthGuardService], component : DetailComponent},
  {path:'details2/:id' ,canActivate:[AuthGuardService], component : Detail2Component},
  {path:'caisse' ,canActivate:[AuthGuardService],component : CaisseComponent},
  {path:'listecaisses' ,canActivate:[AuthGuardService],component : ListeCaissesComponent},
  {path:'caisse/:id' ,canActivate:[AuthGuardService],component : EditCaisseComponent},
  {path:'detailcaisse/:id' ,canActivate:[AuthGuardService],component : DetailCaisseComponent},
  {path:'' , component : IndexComponent},


]





@NgModule({
  declarations: [
    AppComponent,
    ProfilsComponent,
    UsersComponent,
    TypesComponent,
    ProduitsComponent,
    VaguesComponent,
    UsersComponent,
    SingleVagueComponent,
    DetailComponent,
    Vagues2Component,
    SingleVague2Component,
    Detail2Component,
    IndexComponent,
    ConfirmDialogComponent,
    CaisseComponent,
    EditCaisseComponent,
    DetailCaisseComponent,
    DepotComponent,
    FraisspeciauxComponent,
    FarineComponent,
    CommandeComponent,
    AbonnerComponent,
    CommandeUpdateComponent,
    EntreesortieComponent,
    ListehistoriqueComponent,
    AbonnerUpdateComponent,
    AbonnementComponent,
    AbonnementComponent,
    AbonnementListeComponent,
    ListeVaguesComponent,
    ListeVague2Component,
    ListeCaissesComponent,
    DebriefmoisComponent,
    abonnerpipe,
    commanderpipe

    

  ],

  entryComponents: [ ConfirmDialogComponent ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule    
    
  ],

  providers: [ProfilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
