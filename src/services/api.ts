import axios, { AxiosError } from 'axios';
import { ApiResponse, BacklinkData } from '../types';
import { getBasicAuth } from '../utils/auth';

const API_URL = 'https://api.dataforseo.com/v3/backlinks/bulk_pages_summary/live';

export async function fetchBacklinkData(domains: string[]): Promise<BacklinkData[]> {
  try {
    const payload = [{
      targets: domains,
      include_subdomains: true
    }];

    const response = await axios.post<ApiResponse>(API_URL, payload, {
      headers: {
        'Authorization': getBasicAuth(),
        'Content-Type': 'application/json'
      }
    });

    const { data } = response;
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (!data.tasks?.[0]?.result?.[0]?.items) {
      throw new Error('No data received from API');
    }

    return data.tasks[0].result[0].items.map(item => ({
      target: item.url,
      main_domain_rank: item.main_domain_rank || 0,
      backlinks: item.backlinks || 0,
      referring_domains: item.referring_domains || 0,
      broken_backlinks: item.broken_backlinks || 0,
      referring_domains_nofollow: item.referring_domains_nofollow || 0,
      anchor: (item.referring_links_types?.anchor) || 0,
      image: (item.referring_links_types?.image) || 0,
      canonical: (item.referring_links_types?.canonical) || 0,
      redirect: (item.referring_links_types?.redirect) || 0,
      referring_links_tld: item.referring_links_tld || {},
      referring_ips: item.referring_ips || 0
    }));

  } catch (error) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }

    throw error;
  }
}