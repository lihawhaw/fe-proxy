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

  const onRowEnable = (enable: boolean, id: string) => {
    const rules = proxyRules().map((item) => ({
      ...item,
      enable: id === item.id ? enable : item.enable,
    }));
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
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {mapArray(
              () => proxyRules(),
              (row) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={row.enable}
                      onChange={(event, checked) => {
                        onRowEnable(checked, row.id);
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.domain}</TableCell>
                  <TableCell>{row.target}</TableCell>
                  <TableCell>{row.tags}</TableCell>
                  <TableCell>{row.order}</TableCell>
                  <TableCell>{row.note}</TableCell>
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
