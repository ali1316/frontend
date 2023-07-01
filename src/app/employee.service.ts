import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'http://localhost:8000/admin/api/employees/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}${id}/`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: Employee) => console.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.employeesUrl}${employee.id}/`;
    return this.http.put(url, employee, this.httpOptions).pipe(
      tap(_ => console.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}${employee.id}/`;
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${employee.id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  getEmployeesByBranch(branchId: number): Observable<Employee[]> {
    const url = `${this.employeesUrl}?branch=${branchId}`;
    return this.http.get<Employee[]>(url).pipe(
      tap(_ => console.log(`fetched employees for branch id=${branchId}`)),
      catchError(this.handleError<Employee[]>(`getEmployeesByBranch branchId=${branchId}`, []))
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