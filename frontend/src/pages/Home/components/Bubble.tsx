
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// LineChart component
const LineChart = ({ data }: { data: any[], width?: number, height?: number }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map(item => item.name), // X-axis (Item Names)
    datasets: [
      {
        label: 'Item Quantity',
        data: data.map(item => item.quantity), // Y-axis (Quantities)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Item Quantity Line Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max:1500,
        title: {
          display: true,
          text: 'Quantity',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Item Names',
        },
      },
    },
  };

  // Pass the width and height as props
  return <div className="w-full h-80"><Line data={chartData} options={options} /></div>;
};

export default LineChart;
