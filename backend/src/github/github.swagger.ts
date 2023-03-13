import { ApiProperty } from '@nestjs/swagger';
import {
  Commit,
  CommitAuthor,
  CommitHistory,
  CommitParent,
} from './github.interface';

class CommitDTO implements Commit {
  @ApiProperty()
  author: {
    name: string;
    email: string;
    date: string;
  };
  @ApiProperty()
  committer: {
    name: string;
    email: string;
    date: string;
  };
  @ApiProperty()
  message: string;
  @ApiProperty()
  tree: {
    sha: string;
    url: string;
  };
  @ApiProperty()
  url: string;
  @ApiProperty()
  comment_count: number;
  @ApiProperty()
  verification: {
    verified: boolean;
    reason: string;
    signature: string;
    payload: string;
  };
}

class CommitAuthorDTO implements CommitAuthor {
  @ApiProperty()
  login: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  node_id: string;
  @ApiProperty()
  avatar_url: string;
  @ApiProperty()
  gravatar_id: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  html_url: string;
  @ApiProperty()
  followers_url: string;
  @ApiProperty()
  following_url: string;
  @ApiProperty()
  gists_url: string;
  @ApiProperty()
  starred_url: string;
  @ApiProperty()
  subscriptions_url: string;
  @ApiProperty()
  organizations_url: string;
  @ApiProperty()
  repos_url: string;
  @ApiProperty()
  events_url: string;
  @ApiProperty()
  received_events_url: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  site_admin: boolean;
}

class CommitParentDTO implements CommitParent {
  @ApiProperty()
  sha: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  html_ulr: string;
}

export class CommitHistoryDTO implements CommitHistory {
  @ApiProperty()
  sha: string;
  @ApiProperty()
  node_id: string;
  @ApiProperty()
  commit: CommitDTO;
  @ApiProperty()
  url: string;
  @ApiProperty()
  html_url: string;
  @ApiProperty()
  comments_url: string;
  @ApiProperty()
  author: CommitAuthor;
  @ApiProperty()
  committer: CommitAuthorDTO;
  @ApiProperty()
  parents: CommitParentDTO[];
}

export class ForbiddenResponseDTO {
  @ApiProperty()
  'statusCode': number;
  @ApiProperty()
  'message': string;
  @ApiProperty()
  'error': string;
}
