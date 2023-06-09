import { type Component } from "solid-js";
import { useStorage } from "solidjs-use";
import { Switch } from "@suid/material";
import RulesTable from "../setting/table";

type ProxyConfig = chrome.proxy.ProxyConfig;

type ItemType = {
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
    return "";
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

  return (
    <div class="text-1xl">
      <div>{proxyEnable()}</div>
      <Switch
        checked={proxyEnable()}
        onChange={(event, value) => {
          setProxyEnable(value);
        }}
      />
      <div>{JSON.stringify(proxyRules(), null, 4)}</div>
      <RulesTable />
    </div>
  );
};

export default App;
