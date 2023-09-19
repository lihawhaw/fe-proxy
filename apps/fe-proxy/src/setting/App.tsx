import { type Component } from "solid-js";
import { useStorage } from "solidjs-use";
import { Switch, Button } from "@suid/material";
import RulesTable from "./table";
import { createEffect, createSignal } from "solid-js";
import { ItemType, ProxyConfig } from "~/interfaces";

const initData = [
  {
    id: "0bhK892ybarx-SKuHqkfQ",
    enable: false,
    domain: "datamap-*.com",
    target: "127.0.0.1:8810",
    order: 0,
    remark: "",
    tags: ["datamap"],
    create_ad: +new Date(),
  },
  {
    create_ad: +new Date(),
    domain: "*.google.*",
    enable: false,
    id: "0bhK892ybarx-SKuHqkff",
    remark: "",
    order: 0,
    tags: ["google"],
    target: "127.0.0.1:7890",
  },
  {
    create_ad: +new Date(),
    domain: "developer.chrome.com",
    enable: false,
    id: "0bhK892ybarx-SKuHqkfg",
    remark: "",
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
      .map((i, index) => {
        let condition;
        if (i.domain.indexOf("/") > 0) {
          condition = `(shExpMatch(url, "http://${i.domain}") || shExpMatch(url, "https://${i.domain}"))`;
        } else if (i.domain.indexOf("*") > -1) {
          condition = `(shExpMatch(host, "${i.domain}"))`;
        } else {
          condition = `(host == "${i.domain}")`;
        }
        return `${
          index === 0 ? "if" : "else if"
        } ${condition} { return "PROXY ${i.target}; DIRECT"; }`;
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

  const handleSwitchChange = (event, value) => {
    setProxyEnable(value);
  };

  const handleResetTable = () => {
    setProxyRules(initData);
  };

  return (
    <div>
      <div class="flex-1"></div>

      <div class="flex-1 container">
        {/* <div>{proxyEnable()}</div> */}
        <Switch
          checked={proxyEnable()}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        {/* <div>{JSON.stringify(proxyRules(), null, 4)}</div> */}
        <RulesTable />
      </div>
      <div>
        <Button variant="outlined" onClick={handleResetTable}>
          reset
        </Button>
      </div>
    </div>
  );
};

export default App;
