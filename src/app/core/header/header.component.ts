import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';

import { AuthenticationService } from 'app/authentication/authentication.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  currentUserState:Promise<{}>;
  currentUserStateChangedSubscription:Subscription;
  
  constructor(private dataStorageService:DataStorageService,
              private authService:AuthenticationService) {}

  ngOnInit() {
    this.currentUserState=this.authService.isAuthenticated();

    this.currentUserStateChangedSubscription=
      this.authService.currentUserStateChanged.subscribe(
        () => {
          this.currentUserState=this.authService.isAuthenticated();
        }
    );

  }

  onSaveData()
  {
    this.dataStorageService.storeData();
  }

  onFetchData()
  {
   this.dataStorageService.getData();
  }

  onLogout()
  {
    this.authService.logoutUser();
  }

  isUserNotNew()
  {
    return ! (this.authService.isnewUser);
  }
  
  getUserName()
  {
    return this.authService.getCurrentUserName();
  }

  ngOnDestroy(): void {
    this.currentUserStateChangedSubscription.unsubscribe();
  }

}
