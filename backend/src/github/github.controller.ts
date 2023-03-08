import { Controller, Get, Query } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly service: GithubService) {}
  @Get()
  async getCommits(
    @Query('user') user: string,
    @Query('repository') repo: string,
  ) {
    const { data } = await firstValueFrom(
      this.service.getCommitDetails(user, repo),
    );
    return data;
  }
}
