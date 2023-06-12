import { type Component } from "solid-js";
import { useStorage } from "solidjs-use";
import { Switch } from "@suid/material";
import RulesTable from "./table";
import { createEffect, createSignal } from "solid-js";

type ProxyConfig = chrome.proxy.ProxyConfig;

export type ItemType = {
  create_ad: number;
  domain: string;
  enable: boolean;
  id: string;
  note: string;
  order: number;
  tags: string[];
  target: string;
};

const initData = [
  {
    create_ad: +new Date(),
    domain: "*.chrome.*",
    enable: true,
    id: "1685675613940-0",
    note: "chrome.com",
    order: 0,
    tags: ["google"],
    target: "127.0.0.1:7890",
  },
];

const App: Component = () => {
  const [proxyRules, setProxyRules] = useStorage<ItemType[]>(
    "proxy-rules",
    initData
  );
  const [proxyEnable, setProxyEnable] = useStorage("proxy-enable", false);

  const getPacScript = () => {
    const enableList = proxyRules().filter((t) => t.enable);

    let pacScript = enableList
      .map((i, n) => {
        let condition;
        if (i.domain.indexOf("/") > 0) {
          condition = `(shExpMatch(url, "http://${i.domain}") || shExpMatch(url, "https://${i.domain}"))`;
        } else if (i.domain.indexOf("*") > -1) {
          condition = `(shExpMatch(host, "${i.domain}"))`;
        } else {
          condition = `(host == "${i.domain}")`;
        }
        return `${n === 0 ? "if" : "else if"} ${condition} { return "PROXY ${
          i.target
        }; DIRECT"; }`;
      })
      .join("\n");

    if (pacScript) {
      pacScript += 'else { return "DIRECT"; }';
    }

    return `
      function FindProxyForURL(url, host) {
        if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) { 
          ${pacScript}
        } else { return "DIRECT"; }
      }
    `;
  };

  const setProxy = (mode = "system") => {
    let value: ProxyConfig = { mode };
    switch (mode) {
      case "pac_script":
        value = {
          mode: "pac_script",
          pacScript: { data: getPacScript() },
        };
        break;
      case "system":
      default:
        value = { mode };
        break;
    }

    chrome.proxy.settings.set({ scope: "regular", value });
  };

  const updateProxy = () => {
    setProxy(proxyEnable() ? "pac_script" : "system");
  };

  createEffect(() => {
    proxyEnable();
    proxyRules();

    updateProxy();
  });

  return (
    <div class="flex">
      <div class="flex-1"></div>

      <div class="flex-1">
        <div>{proxyEnable()}</div>
        <Switch
          checked={proxyEnable()}
          onChange={(event, value) => {
            setProxyEnable(value);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <div>{JSON.stringify(proxyRules(), null, 4)}</div>
        <RulesTable />
      </div>
    </div>
  );
};

export default App;
