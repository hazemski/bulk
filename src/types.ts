export interface BacklinkData {
  target: string;
  main_domain_rank: number;
  backlinks: number;
  referring_domains: number;
  broken_backlinks: number;
  referring_domains_nofollow: number;
  anchor: number;
  image: number;
  canonical: number;
}

export interface ApiResponse {
  tasks: Array<{
    result: Array<{
      target: string;
      metrics: {
        organic: {
          main_domain_rank: number;
          backlinks: number;
          referring_domains: number;
          broken_backlinks: number;
          referring_domains_nofollow: number;
          anchors: number;
          referring_links_image: number;
          referring_links_canonical: number;
        };
      };
    }>;
  }>;
}