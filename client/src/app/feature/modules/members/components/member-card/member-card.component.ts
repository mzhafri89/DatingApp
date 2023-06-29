import { Component, EventEmitter, Input, Output } from '@angular/core';
import Member from 'src/app/share/interfaces/member.interface';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  @Output() onDetailClick: EventEmitter<Pick<Member, 'userName'>> =
    new EventEmitter<Pick<Member, 'userName'>>();

  handleDetailClick(): void {
    this.onDetailClick.emit({ userName: this.member!.userName });
  }
}
