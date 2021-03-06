import { Component, OnInit, Input} from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero:Hero;
  constructor(
     private route:ActivatedRoute,
     private heroService:HeroService,
     private localton : Location
    ){}

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHeroById(id) .subscribe(hero => this.hero = hero);
  }
  goBack(){
    this.localton.back();
  }
  save(){
     this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());

  }

}
