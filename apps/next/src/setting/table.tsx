import { type Component } from "solid-js";
import { useStorage } from "solidjs-use";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@suid/material";
import { mapArray } from "solid-js";
import { ItemType } from "./App";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const RulesTable: Component = () => {
  const [proxyRules, setProxyRules] = useStorage<ItemType[]>("proxy-rules", []);

  const onItemEnable = (enable: boolean, id: string) => {
    const rules = proxyRules().map((item) => ({
      ...item,
      enable: id === item.id ? enable : item.enable,
    }));
    setProxyRules(rules);
  };

  const onItemDelete = (id: string) => {
    const rules = proxyRules().filter((item) => item.id != id);
    setProxyRules(rules);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>启用</TableCell>
            <TableCell>域名/URL</TableCell>
            <TableCell>Target</TableCell>
            <TableCell>标签</TableCell>
            <TableCell>排序</TableCell>
            <TableCell>备注</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {mapArray(
              () => proxyRules(),
              (item) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={item.enable}
                      onChange={(event, checked) => {
                        onItemEnable(checked, item.id);
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.domain}</TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell>{item.tags}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <span onClick={() => onItemDelete(item.id)}>删除</span>
                  </TableCell>
                </TableRow>
              )
            )}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RulesTable;
