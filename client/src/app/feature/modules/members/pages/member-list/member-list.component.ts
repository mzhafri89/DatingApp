import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MembersService } from '../../services/members.service';
import Member from 'src/app/share/interfaces/member.interface';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[] | undefined;

  constructor(
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }

  handleDetailClick({ userName }: Pick<Member, 'userName'>): void {
    this.router.navigate([userName], { relativeTo: this.route });
  }
}
