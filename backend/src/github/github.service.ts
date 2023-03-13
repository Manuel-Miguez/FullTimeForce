import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CommitHistory } from './github.interface';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}
  getCommitDetails(
    user: string,
    repository: string,
  ): Observable<AxiosResponse<CommitHistory[]>> {
    return this.httpService.get<CommitHistory[]>(
      `https://api.github.com/repos/${user}/${repository}/commits`,
    );
  }
}
