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
import { useTranslation } from 'react-i18next';
import moment from 'moment';
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

const AnalysisTable1 = (props) => {
  const { t } = useTranslation();
  const [analysisData, setAnalysisData] = useState(props.data);
  const [average, setAverage] = useState();
  const [average_v, setAverage_v] = useState();
  React.useEffect(() => {
    setAnalysisData(props.data);
  }, [props.data]);
  React.useEffect(() => {
    let num = 0,
      ok_num = 0;
    props.data?.map((it) => {
      num++;
      if (((moment(it.completionDate?.split('T')[0]) - moment(it.readyDate?.split('T')[0])) / (1000 * 3600 * 24)+1) > 0) {
        ok_num ++ ;
      }
    });
    setAverage(Math.ceil(ok_num / num * 100));
  }, [props.data]);
  React.useEffect(() => {
    let sum = 0, num = 0;
    props.data?.map((it) => {
      num ++ ;
      sum += ((moment(it.completionDate?.split('T')[0]) - moment(it.readyDate?.split('T')[0])) / (1000 * 3600 * 24)+1);
    });
    setAverage_v(Math.ceil(sum / num));
  }, [props.data])
  return (
    <TableContainer component={Paper} style={{ fontSize: '20px' }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">{t('Order')} PO#</StyledTableCell>
            <StyledTableCell align="center">{t('Factory')}</StyledTableCell>
            <StyledTableCell align="center">{t('Customer')}</StyledTableCell>
            <StyledTableCell align="center">{t('Owner')}</StyledTableCell>
            <StyledTableCell align="center">{t('ReadyDate')}</StyledTableCell>
            <StyledTableCell align="center">{t('CompletionDate')}</StyledTableCell>
            <StyledTableCell align="center">{t('Difference')}</StyledTableCell>
            <StyledTableCell align="center">{t('ANALYSIS')}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody align="right">
          {analysisData.length ? (
            analysisData?.map((it) => (
              <StyledTableRow key={it._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {it.orderPO}
                </StyledTableCell>
                <StyledTableCell align="center">{it.factory}</StyledTableCell>
                <StyledTableCell align="center">{it.customer}</StyledTableCell>
                <StyledTableCell align="center">{it.owner}</StyledTableCell>
                <StyledTableCell align="center">{it.readyDate?.split('T')[0]}</StyledTableCell>
                <StyledTableCell align="center">{it.completionDate?.split('T')[0]}</StyledTableCell>
                <StyledTableCell align="center">
                  {(moment(it.completionDate?.split('T')[0]) - moment(it.readyDate?.split('T')[0])) / (1000 * 3600 * 24) + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {((moment(it.completionDate?.split('T')[0]) - moment(it.readyDate?.split('T')[0])) / (1000 * 3600 * 24) + 1 ) > 0
                    ? '100%'
                    : '0%'}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <h4 style={{ fontFamily: 'serif', color: 'rgb(150 150 150)' }}>{t('NoStatisticalData')}</h4>
          )}
          <TableRow style={{backgroundColor: 'rgb(0 170 250)'}}>
            <TableCell rowSpan={2}/>
            <TableCell rowSpan={2}/>
            <TableCell rowSpan={2}/>
            <TableCell rowSpan={2}/>
            <TableCell rowSpan={2}/>
            <TableCell rowSpan={2}/>
            <TableCell align="center">{average_v}</TableCell>
            <TableCell align="center">{average ? average : 0}%</TableCell>
          </TableRow>
        </TableBody>
        
      </Table>
    </TableContainer>
  );
};
export default AnalysisTable1;
