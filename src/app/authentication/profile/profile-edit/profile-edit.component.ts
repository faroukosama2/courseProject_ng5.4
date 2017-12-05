import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CanProfileDeactivate } from 'app/authentication/profile-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit,CanProfileDeactivate,OnDestroy {  
  @ViewChild('form') profileForm:NgForm;
  newMode:boolean;
  defaultName:string;
  defaultImagePath:string;
  editedName:string;
  editedImagePath:string;
  changesSaved:boolean;
  
  constructor(private authService:AuthenticationService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.changesSaved=false;
    
    this.route.data.subscribe(
      ( data:Data ) => {
        if(data['isNew'])
          this.newMode=true;
        else
          this.newMode=false;
      }
    );

    if(this.newMode)
    {
      this.defaultName="";
      this.defaultImagePath="";
      const email =this.authService.getCurrentUserEmail();
      const initName=email.substr(0,email.indexOf('@'));
      this.authService.updateCurrentUserProfile(initName,
          "data:image/jpeg;base64,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");      
    }
    else
    {
      this.defaultName =this.authService.getCurrentUserName();
      this.defaultImagePath =this.authService.getCurrentUserImagePath();
    }
  
  }

  submit()
  {
    this.editedName=this.profileForm.value.displayedName;
    this.editedImagePath=this.profileForm.value.imagePath;
    this.authService.updateCurrentUserProfile(this.editedName,this.editedImagePath);
    
    this.changesSaved=true;
    this.router.navigate(["/recipes"]);

  }
  
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean>
  {

    if(!this.changesSaved  )
    {
      //new mode
      if(this.newMode)
        {
          return confirm('You don\'t set your profile , Default profile will  be set ! ');
        }
      //edit mode   
      else
        {
          this.editedName=this.profileForm.value.displayedName;
          this.editedImagePath=this.profileForm.value.imagePath;
          if(this.editedName!=this.defaultName || this.editedImagePath!=this.defaultImagePath )
          {
            return confirm('Do you want to discard this changes?');
          }
        }
    }
    return true;
  }

  ngOnDestroy(): void {
    this.changesSaved=true;
    this.authService.isnewUser=false;
  }

}
