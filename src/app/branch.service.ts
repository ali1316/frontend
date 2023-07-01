import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Branch } from './branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private branchesUrl = 'http://localhost:8000/api/branches/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.branchesUrl)
      .pipe(
        catchError(this.handleError<Branch[]>('getBranches', []))
      );
  }

  getBranch(id: number): Observable<Branch> {
    const url = `${this.branchesUrl}${id}/`;
    return this.http.get<Branch>(url).pipe(
      tap(_ => console.log(`fetched branch id=${id}`)),
      catchError(this.handleError<Branch>(`getBranch id=${id}`))
    );
  }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.branchesUrl, branch, this.httpOptions).pipe(
      tap((newBranch: Branch) => console.log(`added branch w/ id=${newBranch.id}`)),
      catchError(this.handleError<Branch>('addBranch'))
    );
  }

  updateBranch(branch: Branch): Observable<any> {
    const url = `${this.branchesUrl}${branch.id}/`;
    return this.http.put(url, branch, this.httpOptions).pipe(
      tap(_ => console.log(`updated branch id=${branch.id}`)),
      catchError(this.handleError<any>('updateBranch'))
    );
  }

  deleteBranch(branch: Branch): Observable<Branch> {
    const url = `${this.branchesUrl}${branch.id}/`;
    return this.http.delete<Branch>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted branch id=${branch.id}`)),
      catchError(this.handleError<Branch>('deleteBranch'))
    );
  }

  getEmployeesByBranch(branchId: number): Observable<Branch[]> {
    const url = `${this.branchesUrl}${branchId}/employees/`;
    return this.http.get<Branch[]>(url).pipe(
      tap(_ => console.log(`fetched employees for branch id=${branchId}`)),
      catchError(this.handleError<Branch[]>(`getEmployeesByBranch branchId=${branchId}`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}