import { Component, OnInit } from '@angular/core';
import { Branch } from '../branch';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  branches!: Branch[];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
    this.branchService.getBranches()
      .subscribe(branches => this.branches = branches);
  }

  deleteBranch(branch: Branch): void {
    this.branches = this.branches.filter(b => b !== branch);
    this.branchService.deleteBranch(branch).subscribe();
  }
}