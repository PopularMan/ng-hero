import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})

export class HeroService {
  constructor(
    private messageService:MessageService,
    private httpClient : HttpClient) {}
  private heroesUrl = 'api/heroes'; 
  getHeroes():Observable<Hero[]>{
     //this.messageService.add('HelloService : fetch heroes');
     //return of(HEROES);
     return this.httpClient.get<Hero[]>(this.heroesUrl);
  }
  getHeroById(id:number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  updateHero(hero:Hero):Observable<any>{
   
    return this.httpClient.put(this.heroesUrl,hero,httpOptions).pipe(
       tap(_=>this.log(`update hero of id =${hero.id}`)),
       catchError(this.handleError<any>('updateHero')));
  }
  addHero(hero:Hero):Observable<Hero>{
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero')));
  }
  deleteHero(hero:Hero|number):Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

}
