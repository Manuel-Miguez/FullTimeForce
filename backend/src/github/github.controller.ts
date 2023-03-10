import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly service: GithubService) {}
  @UseGuards(AuthGuard)
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
