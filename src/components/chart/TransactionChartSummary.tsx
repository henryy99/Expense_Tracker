import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  labels: ["Income", "Expense"],
  colors: ["#213ebf", "#FD5E53"],
  chart: {
    type: "donut",
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "70%",
        labels: {
          show: false,
        },
      },
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
    },
  },
};

export const TransactionChartSummary = ({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) => {
  return (
    <Chart
      options={options}
      series={[income | 1, expense]}
      type="pie"
      width={"100%"}
      height={"100%"}
    />
  );
};
