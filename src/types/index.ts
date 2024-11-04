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
  redirect: number;
  referring_links_tld: Record<string, number>;
  referring_ips: number;
}

export interface ApiResponse {
  tasks: Array<{
    result: Array<{
      items: Array<{
        url: string;
        main_domain_rank: number;
        backlinks: number;
        referring_domains: number;
        broken_backlinks: number;
        referring_domains_nofollow: number;
        referring_links_types: {
          anchor?: number;
          image?: number;
          canonical?: number;
          redirect?: number;
        };
        referring_links_tld: Record<string, number>;
        referring_ips: number;
      }>;
    }>;
  }>;
}