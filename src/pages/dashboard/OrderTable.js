import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProgressCircular from './ProgressCircular';
import { useTranslation } from 'react-i18next';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(170, 170, 170)',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const CustomizedTables = (props) => {
  const { t } = useTranslation();
  const [satisticsData, setSatisticsData] = useState(props.data);
  const [sum, setSum] = useState();
  React.useEffect(() => {
    setSatisticsData(props.data);
  }, [props.data]);
  React.useEffect(() => {
    let sum_count = 0;
    Array.isArray(satisticsData) &&
      satisticsData.length > 0 &&
      satisticsData?.map((item) => {
        sum_count += Number(item.count);
      });
    setSum(sum_count);
  }, [satisticsData]);
  return (
    <TableContainer component={Paper} style={{fontSize: "20px"}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">{t("Factory")}</StyledTableCell>
            <StyledTableCell align="center">{t("OrderCount")}</StyledTableCell>
            <StyledTableCell align="center">{t("Satistics")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody align="right">
          {
            satisticsData.length ? satisticsData?.map((it) => (
              <StyledTableRow key={it._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {it._id.factory}
                </StyledTableCell>
                <StyledTableCell align="center">{`${sum}/${it.count}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <ProgressCircular progress={Math.ceil((Number(it.count) * 100) / sum)} />
                </StyledTableCell>
              </StyledTableRow>
            )) :
            (<h4 style={{fontFamily: "serif", color:"rgb(150 150 150)"}}>{t("NoStatisticalData")}</h4>)
          }
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CustomizedTables;
