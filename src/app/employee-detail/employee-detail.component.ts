import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../employee';
import { Branch } from '../branch';
import { EmployeeService } from '../employee.service';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee!: Employee;
  branches!: Branch[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getBranches();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  getBranches(): void {
    this.branchService.getBranches()
      .subscribe(branches => this.branches = branches);
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}