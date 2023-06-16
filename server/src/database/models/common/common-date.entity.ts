export interface CommonDateEntity {
  /**
   * @format date-time
   */
  createdAt: string | null;

  /**
   * @format date-time
   */
  updatedAt: string | null;

  /**
   * @format date-time
   */
  deletedAt: string | null;
}
