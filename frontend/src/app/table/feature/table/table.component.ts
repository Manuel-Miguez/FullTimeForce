import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, firstValueFrom, map, catchError } from 'rxjs';
import { TableService } from '../../data-access/table.service';
import { CommitHistory } from '../../utils/commit.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  [x: string]: any;
  public subscriptions$: Subscription[] = [];
  public commits: CommitHistory[] = [];
  public isDesc: boolean = false;
  public nameText!: string;
  public repoText!: string;
  public currentColumn!: string;
  modal = {
    title: '',
    showModal: false,
    closeButton: true,
    data: '' as any,
    dataCSS: '',
  };
  constructor(@Inject(TableService) private readonly service: TableService) {}

  ngOnInit(): void {
    this.nameText = 'tarkah';
    this.repoText = 'karaoke-rs';
    this.requestCommitHistory();
  }

  private async requestCommitHistory() {
    const result = await firstValueFrom(
      this.service
        .getRepositoryCommitHistory(this.nameText, this.repoText)
        .pipe(
          map((val) => val),
          catchError(async (err) => {
            let message = 'Something went wrong!';
            if (err.message) message = err.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: message,
            });
          })
        )
    );
    if (result) this.commits = result;
  }

  search() {
    this.requestCommitHistory();
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

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.currentColumn = property;
    const direction = this.isDesc ? 1 : -1;
    this.commits = [...this.commits].sort((a, b) => {
      const firstValue = this.getValueFromCommit(a, property);
      const secondValue = this.getValueFromCommit(b, property);
      if (firstValue.localeCompare(secondValue)) return -1 * direction;
      else if (secondValue.localeCompare(firstValue)) return 1 * direction;
      return -1;
    });
  }

  private getValueFromCommit(commit: CommitHistory, property: string) {
    return property === 'name'
      ? commit.commit.author.name
      : this.formatDate(commit.commit.committer.date);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}
