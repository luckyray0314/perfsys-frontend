import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [''],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: true,
    min: 0,
    max: 5,
    tickAmount: 5,
    axisBorder: {
      show: true
    },
  },
   grid: {
      show: true,      // you can either change hear to disable all grids
      yaxis: {
        lines: { 
          show: true  //or just here to disable only y axis
         }
       },   
    },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = (props) => {
  const { t } = useTranslation();
  console.log('')
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [series, setSeriousS] = useState([
    {
      data: [0, 0, 0]
    }
  ]);
  useEffect(() => {
    setSeriousS([{data: [props.qScore, props.cScore, props.pScore]}])
  }, [props.qScore])
  const [options, setOptions] = useState(barChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondary],
      xaxis: {
        categories: [`QC ${t("Score")}`, `${t("Claims")} ${t("Score")}`, t("ProcessScore")],
        labels: {
          style: {
            colors: [info, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);
  // barChartOptions.xaxis.categories = 
  return (
    <div id="chart">
      {series.data}
      <ReactApexChart options={options} series={series} type="bar" height={365}/>
    </div>
  );
};
export default MonthlyBarChart;
