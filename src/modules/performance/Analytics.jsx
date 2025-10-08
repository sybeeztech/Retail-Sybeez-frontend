import usePerformanceStore from "../../store/performanceStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const { goals, reviews, feedbacks } = usePerformanceStore();

  // Data for charts
  const goalData = [
    {
      name: "Goals",
      Completed: goals.filter((g) => g.status === "Completed").length,
      "Not Started": goals.filter((g) => g.status !== "Completed").length,
    },
  ];

  const feedbackSentiment = [
    {
      name: "Positive",
      value: feedbacks.filter((f) => f.sentiment === "Positive").length,
    },
    {
      name: "Neutral",
      value: feedbacks.filter((f) => f.sentiment === "Neutral").length,
    },
    {
      name: "Negative",
      value: feedbacks.filter((f) => f.sentiment === "Negative").length,
    },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];
  const goalColors = ["#3B82F6", "#FBBF24"];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">📊 Performance Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Goals Completion */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Goal Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goalData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" fill={goalColors[0]} />
              <Bar dataKey="Not Started" fill={goalColors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback Sentiment */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Feedback Sentiment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feedbackSentiment}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {feedbackSentiment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Total Goals</h4>
          <p className="text-2xl font-bold">{goals.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Total Reviews</h4>
          <p className="text-2xl font-bold">{reviews.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold">Total Feedbacks</h4>
          <p className="text-2xl font-bold">{feedbacks.length}</p>
        </div>
      </div>
    </div>
  );
}
