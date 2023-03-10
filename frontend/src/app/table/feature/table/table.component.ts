import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from '../../data-access/table.service';
import { CommitHistory } from '../../utils/commit.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  dropDownList = 0;
  subscriptions$: Subscription[] = [];
  commits: CommitHistory[] = [];
  modal = {
    title: '',
    showModal: false,
    closeButton: true,
    data: '' as any,
    dataCSS: '',
  };
  constructor(@Inject(TableService) private readonly service: TableService) {}
  ngOnInit(): void {
    this.subscriptions$.push(
      this.service
        .getRepositoryCommitHistory('tarkah', 'karaoke-rs')
        .subscribe((response) => (this.commits = response))
    );
  }

  formatDate(date: string) {
    return formatDate(date, 'dd-MM-YYYY', 'en-US');
  }

  details(commit: CommitHistory) {
    const showToModal = {
      author: commit.commit.author.name,
      email: commit.commit.author.email,
      message: commit.commit.message,
      commiter: commit.committer.html_url,
      url: commit.html_url,
    };
    this.modal.data = JSON.stringify(showToModal, null, 4);
    this.modal.showModal = true;
    this.modal.title = `Commit: ${commit.sha}`;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}
