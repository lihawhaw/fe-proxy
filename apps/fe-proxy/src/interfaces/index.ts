export type ItemType = {
  domain: string;
  enable: boolean;
  id: string;
  remark: string;
  order: number;
  tags: string[];
  target: string;
};

export type ProxyConfig = chrome.proxy.ProxyConfig;
