import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-recommendations',
  templateUrl: './my-recommendations.component.html',
  styleUrls: ['./my-recommendations.component.css']
})
export class MyRecommendationsComponent implements OnInit {

  recommendedUsersList: any[] = [];
  userId: any;
  isLoading = true;

  notEmptyPost = true;
  notscrolly = true;
  isLoader = true;
  circleName: any;

  usersList: any;

  constructor(
    public uerService: UserService,
    public authService: AuthService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.notEmptyPost = true;
    this.notscrolly = true;
    this.isLoader = true;
    this.getList();
  }

  loadInitList(id: any) {
    this.isLoader = true;
    const formData = new FormData();
    formData.append('id', id)
    this.uerService.viewRecommnedTracking(formData).subscribe((response: any) => {
      this.isLoader = false;
      this.isLoading = false;
      const lists = response?.lists;
      this.recommendedUsersList = Array.isArray(lists)
        ? lists : lists ? [lists] : [];
      this.notscrolly = true;
    });
  }

  getList() {
    this.isLoader = true;
    this.uerService.getRecommnedUsers(this.userId).subscribe((response: any) => {
      this.isLoader = false;
      this.isLoading = false;
      this.usersList = response?.users;
    });
  }

  trackByRecommendationId(index: number, item: any): any {
    return item?.id ?? index;
  }

  trackByStepIndex(index: number): number {
    return index;
  }

  getStatusClass(status: any): string {
    const normalized = this.normalizeStatus(status);

    if (normalized === 'approved') {
      return 'status-pill--approved';
    }

    if (normalized === 'pending') {
      return 'status-pill--pending';
    }

    return 'status-pill--neutral';
  }

  getStatusIcon(status: any): string {
    const normalized = this.normalizeStatus(status);

    if (normalized === 'approved') {
      return 'ti-circle-check';
    }

    if (normalized === 'pending') {
      return 'ti-clock';
    }

    return 'ti-info-circle';
  }

  getInitials(firstName: any, lastName: any): string {
    const first = (firstName || '').toString().trim();
    const last = (lastName || '').toString().trim();
    const initialOne = first ? first.charAt(0) : '';
    const initialTwo = last ? last.charAt(0) : '';

    return (initialOne + initialTwo).toUpperCase() || 'U';
  }

  getRecommenders(item: any): Array<{ label: string; name: string; email: string; initials: string; tone: string; }> {
    const recommenders: Array<{ label: string; name: string; email: string; initials: string; tone: string; }> = [];

    if (item?.primary_recommender_name || item?.email_main_refer) {
      recommenders.push({
        label: 'Primary recommender',
        name: item?.primary_recommender_name || 'Unknown',
        email: item?.email_main_refer || 'No email provided',
        initials: this.getInitials(item?.first_name_main_refer, item?.last_name_main_refer),
        tone: 'teal'
      });
    }

    if (item?.second_recommender_name || item?.email_refer) {
      recommenders.push({
        label: 'Second recommender',
        name: item?.second_recommender_name || 'Unknown',
        email: item?.email_refer || 'No email provided',
        initials: this.getInitials(item?.first_name_refer, item?.last_name_refer),
        tone: 'blue'
      });
    }

    return recommenders;
  }

  getApprovalStepCount(item: any): number {
    return Array.isArray(item?.approval_steps) ? item.approval_steps.length : 0;
  }

  getCountByStatus(status: string): number {
    return this.recommendedUsersList.filter((item) => this.normalizeStatus(item?.overall_status) === status).length;
  }

  formatRole(role: any): string {
    return (role || '')
      .toString()
      .trim()
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/(^|\s)\S/g, (value: string) => value.toUpperCase());
  }

  private normalizeStatus(status: any): string {
    return (status || '').toString().trim().toLowerCase();
  }

  // list code end

  backClicked() {
    this._location.back();
  }


}
