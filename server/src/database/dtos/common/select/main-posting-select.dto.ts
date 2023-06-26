import { FindMainPostingListOutputDto } from '../../main-posting/main-posting.outbound-port.dto';

export type SelectFindMainPostingListDto = {
  [P in keyof FindMainPostingListOutputDto['mainPostings'][0] as `${P}`]: FindMainPostingListOutputDto['mainPostings'][0][P];
};
