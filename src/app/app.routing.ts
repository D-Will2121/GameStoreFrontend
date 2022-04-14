import { ContentComponent } from './content/content.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { HorrorComponent } from './horror/horror.component';
import { SliceoflifeComponent } from './sliceoflife/sliceoflife.component';
import { PuzzleComponent } from './puzzle/puzzle.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'content', component: ContentComponent },
    { path: 'horror', component: HorrorComponent },
    { path: 'sliceoflife', component: SliceoflifeComponent },
    { path: 'puzzle', component: PuzzleComponent },
    { path: 'app', component: AppComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);