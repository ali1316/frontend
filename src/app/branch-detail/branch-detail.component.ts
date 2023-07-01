import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Branch } from '../branch';
import { Employee } from '../employee';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent implements OnInit {
  branch!: Branch;
  employees!: Employee[];

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBranch();
  }

  getBranch(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.branchService.getBranch(id)
      .subscribe(branch => {
        this.branch = branch;
        
      });
  }

  save(): void {
    this.branchService.updateBranch(this.branch)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}