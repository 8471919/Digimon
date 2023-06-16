export interface MainPostingReportEntity {
  /**
   * @pattern ^[1-9][0-9]{1,17}
   */
  id: string;

  title: string;

  content: string;

  /**
   * @pattern ^[1-9][0-9]{1,17}
   */
  mainPostingId: string;
}
