export interface MainPostingCategoryEntity {
  /**
   * @type int
   */
  id: number;

  name: string;

  /**
   * @type int
   */
  parentId: number;

  /**
   * @type int
   */
  orderId: number;
}
