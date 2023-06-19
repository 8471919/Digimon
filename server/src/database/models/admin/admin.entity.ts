import { CommonDateEntity } from '../common/common-date.entity';

export namespace AdminEntity {
  export interface Admin extends CommonDateEntity {
    /**
     * @type int
     */
    id: number;

    /**
     * @format email
     */
    email: string;

    password: string;

    firstName: string;

    middleName: string | null;

    lastName: string;

    nickname: string;

    introduction: string | null;

    /**
     * @format date-time
     */
    birth: string;

    emailReception: boolean;

    /**
     * @type int
     */
    gradeId: number;

    /**
     * @type int
     */
    genderId: number;
  }
}
