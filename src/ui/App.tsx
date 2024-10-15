import { useMemo } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";

function App() {
	const statistics = useStatistics(10);

	const cpuUsages = useMemo(
		() => statistics.map((stat) => stat.cpuUsage),
		[statistics]
	);

	const ramUsages = useMemo(
		() => statistics.map((stat) => stat.ramUsage),
		[statistics]
	);

	return (
		<div className="App">
			<div style={{ height: 120, width: 300 }}>
				<Chart data={cpuUsages} maxDataPoints={10} />
			</div>
			<div style={{ height: 120, width: 300 }}>
				<Chart data={ramUsages} maxDataPoints={10} />
			</div>
			<h1>LFG!!</h1>
		</div>
	);
}

export default App;
