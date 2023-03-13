import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CommitHistory } from '../utils/commit.interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private readonly http: HttpClient) {}

  public getRepositoryCommitHistory(
    userName: string,
    repository: string
  ): Observable<CommitHistory[]> {
    return this.http.get<CommitHistory[]>(
      `${environment.apiUrl}github?user=${userName}&repository=${repository}`,
      { headers: { auth: environment.auth } }
    );
  }
}
