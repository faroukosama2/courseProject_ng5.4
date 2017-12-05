import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AuthenticationService
{
    private currentUserAuthenticated:boolean;
    isnewUser:boolean;
    currentUserStateChanged=new Subject<void>();

    constructor(private  router:Router) {}

    private    setCurrentUserState()
    {
        if(firebase.auth().currentUser!=null)
        {
            this.currentUserAuthenticated=true;    
        }
        else
        {
            this.currentUserAuthenticated=false;
        }
        this.currentUserStateChanged.next();
    }

    isAuthenticated()
    {
       
        return new Promise(
            (resolve,reject) =>{
                setTimeout( () => {
                    resolve(this.currentUserAuthenticated ==true);
                },800);
            }
        );
    }


    initializeService()
    {
        firebase.initializeApp({
            apiKey: "AIzaSyAMk-mPoNEgli7kQ91ArVIPRxNBn73zfD0",
            authDomain: "courseproject-recipe-book.firebaseapp.com"
          }).auth().onAuthStateChanged(
              () => {
                this.setCurrentUserState();
              }
          );  
    }
    
    signupUser(email:string , password:string)
    {
        firebase.auth().createUserWithEmailAndPassword(
            email,password).
            then(
                (response) => {
                    this.isnewUser=true;
                    this.router.navigate(['/profile/new']);
                }
            ).
            catch(
                (error) =>{
                   
                }
            );

    }

    signinUser(email:string , password:string)
    {
        firebase.auth().signInWithEmailAndPassword(
            email,password).
            then(
                (response) => {              
      
                    firebase.auth().currentUser.getIdToken().then(
                        (token:string) => {
                            
                            this.router.navigate(['/']);

                        }
                        ).
                        catch(
                            (error) => {
            
                            }
                        );

                }
            ).
            catch(
                (error) =>{
                   
                }
            );

    }
    
    logoutUser()
    {

        firebase.auth().signOut().then
        (
            (response) =>
            {
                window.location.reload();   
                this.router.navigate(['/']);   
            }
        ).
        catch
        (
            (error) => {

            }
        );

    }

    // sync functions
    getToken()
    {
        if(this.currentUserAuthenticated)
        {       return firebase.auth().currentUser.getIdToken().
                catch(
                    (error) => {
                        
                    }
                );
        }
        
        return new Promise<string>(
            (resolve,reject) =>{
                resolve("");
            }
        );
    }


    getCurrentUserEmail()
    {
        if(this.currentUserAuthenticated)
        {
            return firebase.auth().currentUser.email;
        }
        return null;
    }

    
    getCurrentUserName()
    {
        if(this.currentUserAuthenticated)
        {
            return firebase.auth().currentUser.displayName;
        }
        return null;
    }

    getCurrentUserImagePath()
    {
        if(this.currentUserAuthenticated)
        {
            return firebase.auth().currentUser.photoURL;
        }
        return null;
    }

    
    updateCurrentUserEmail(email:string)
    {
        if(this.currentUserAuthenticated)
        {
        return     firebase.auth().currentUser.updateEmail(email).then(
                        () => {
                            return true;
                        }
                    );
        }

    }

    updateCurrentUserName(name:string)
    {
        if(this.currentUserAuthenticated)
        {
        return     firebase.auth().currentUser.updateProfile({displayName:name,photoURL:this.getCurrentUserImagePath()})
                    .then
                        (
                            () => {
                            return true;
                            }
                        );
        }

     }

     updateCurrentUserPhoto(imageurl:string)
     {
        if(this.currentUserAuthenticated)
        { 
        return firebase.auth().currentUser.updateProfile({displayName:this.getCurrentUserImagePath(),photoURL:imageurl})
                .then
                (
                    () => {
                    return true;
                    }
                );
        }
        
      }

      updateCurrentUserProfile(name:string ,imageurl:string)
      {
        if(this.currentUserAuthenticated)
        { 
            return firebase.auth().currentUser.updateProfile({displayName:name,photoURL:imageurl})
                    .then
                    (
                        () => {
                        return true;
                        }
                    );
        }
      }
    
}