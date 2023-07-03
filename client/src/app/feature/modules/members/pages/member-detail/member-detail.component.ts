import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';

import Member from 'src/app/share/interfaces/member.interface';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  selectedTab = 'about';
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

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

    this.membersService.getMember(username).subscribe({
      next: (member) => {
        if (!member) {
          this.router.navigate(['/error']);
          return;
        }

        this.member = member;

        this.generateGalleryImages();
      },
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  generateGalleryImages(): void {
    if (!this.member) return;

    this.galleryImages = this.member.photos.map((photo) => {
      return {
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      };
    });
  }
}
