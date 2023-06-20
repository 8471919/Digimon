export interface MainPostingCategoryEntity {
  /**
   * @type int
   */
  id: number;

  name: string;

  /**
   * @type int
   */
  parentId: number | null;

  /**
   * @type int
   */
  orderId: number;
}
