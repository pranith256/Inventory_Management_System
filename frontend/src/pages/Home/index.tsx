import BasicChart from "./components/Basic";
import PieChartDemo from "./components/Pie";
// import ScatterPlot from "./components/Bubble"; // Import BubbleChart component
import { useGetAllItemsQuery } from "../../provider/queries/Items.query";
import LineChart from "./components/Bubble";

const HomePage = () => {
    const { data, isLoading } = useGetAllItemsQuery({ query: '', page: 1 });
    console.log(data)

  return (
    <div className="w-full flex flex-wrap gap-4 p-4 ml-40">
        <div className="w-full flex flex-wrap gap-4 p-4">
        {/* Container for BasicChart */}
        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-4">Basic Chart Analysis</h2>
            <BasicChart />
        </div>

        {/* Container for PieChart */}
        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-4">Pie Chart Analysis</h2>
            <PieChartDemo />
        </div>

        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md rounded-md ml-60">
              <h2 className="text-lg font-bold mb-4">Line Chart Analysis</h2>
              {!isLoading && data && <LineChart data={data.items} width={500} height={400} />} {/* Pass width and height */}
          </div>
        </div>
        </div>

  );
};

export default HomePage;
