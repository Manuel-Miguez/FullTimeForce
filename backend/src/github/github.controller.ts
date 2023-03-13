import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiHeader,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CommitHistory } from './github.interface';
import { GithubService } from './github.service';
import { CommitHistoryDTO, ForbiddenResponseDTO } from './github.swagger';

@ApiTags('github')
@Controller('github')
@ApiExtraModels(CommitHistoryDTO)
export class GithubController {
  constructor(private readonly service: GithubService) {}
  @ApiHeader({
    name: 'auth',
    description: 'Authorization Header (acts as a basic auth method)',
    example: process.env.AUTH_KEY || '',
    required: true,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
    type: () => ForbiddenResponseDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Valid Response',
    type: () => CommitHistoryDTO,
    schema: {
      $ref: getSchemaPath(CommitHistoryDTO),
    },
  })
  @UseGuards(AuthGuard)
  @Get()
  async getCommits(
    @Query('user') user: string,
    @Query('repository') repo: string,
  ): Promise<CommitHistory[]> {
    const { data } = await firstValueFrom(
      this.service.getCommitDetails(user, repo),
    );
    return data;
  }
}
