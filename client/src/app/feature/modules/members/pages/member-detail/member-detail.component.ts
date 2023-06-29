import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Member from 'src/app/share/interfaces/member.interface';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');

    if (!username) {
      this.router.navigate(['/error']);
      return;
    }

    this.membersService.getMember(username).subscribe((member) => {
      this.member = member;
    });
  }
}
