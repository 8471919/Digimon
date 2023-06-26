import { FindMainPostingListOptionsForPagenationDto } from './main-posting.outbound-port.dto';

export type MainPostingPagenationQueryInputDto = Pick<
  FindMainPostingListOptionsForPagenationDto,
  'countPerPage' | 'pageNumber'
> & {
  /**
   * @type int
   */
  adminId?: number;

  /**
   * @type int
   */
  categoryId?: number;

  orderType?: 'createdAt';

  order?: 'desc' | 'asc';
};
