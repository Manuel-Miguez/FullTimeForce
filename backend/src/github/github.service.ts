import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}
  getCommitDetails(
    user: string,
    repository: string,
  ): Observable<AxiosResponse<any[]>> {
    return this.httpService.get(
      `https://api.github.com/repos/${user}/${repository}/commits`,
    );
  }
}
