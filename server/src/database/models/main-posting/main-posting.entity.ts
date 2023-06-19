import { CommonDateEntity } from '../common/common-date.entity';

export namespace MainPostingEntity {
  export interface MainPosting extends CommonDateEntity {
    /**
     * @pattern ^[1-9][0-9]{1,17}
     */
    id: string; // Max : 9223372036854775807

    title: string;

    content: string;

    /**
     * @type int
     */
    categoryId: number;

    /**
     * @type int
     */
    adminId: number;
  }
}
