import { Component } from '@angular/core';
import { Satellite } from './satellite';
import { OrbitListComponent } from './orbit-list/orbit-list.component';
import { SelectorMatcher } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList : Satellite[];
  displayList:Satellite[];

  constructor(){
    this.displayList=[];
    this.sourceList = [];
    let satellitesUrl='https://handlers.education.launchcode.org/static/satellites.json';
      window.fetch(satellitesUrl).then(function(response){
        response.json().then(function(data) {
          
          let fetchedSatellites=data.satellites; 
        for(var i=0;i<fetchedSatellites.length;i++){
          var satelliteObj= new Satellite(fetchedSatellites[i].name,fetchedSatellites[i].type,fetchedSatellites[i].operational,fetchedSatellites[i].orbitType,fetchedSatellites[i].launchDate)
          this.sourceList.push(satelliteObj); 
        } 
       this.displayList=this.sourceList.slice(0); 
 
        }.bind(this));
      }.bind(this));
    
     

  }
  search(searchTerm:string):void {
     let matchingSatellites: Satellite[]=[];
     searchTerm = searchTerm.toLowerCase();

    for(let i=0; i< this.sourceList.length;i++){
      
      let name = this.sourceList[i].name.toLowerCase();
       if(name.indexOf(searchTerm) >= 0)   {
         matchingSatellites.push(this.sourceList[i]);
           
       }

      
    this.displayList = matchingSatellites;

    }
  
  
  }
  
}