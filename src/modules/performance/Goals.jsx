import { useState } from "react";
import usePerformanceStore from "../../store/performanceStore";
import { CheckCircle, XCircle, Target } from "lucide-react";

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = usePerformanceStore();
  const [newGoal, setNewGoal] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAdd = () => {
    if (newGoal.trim() !== "") {
      addGoal({
        text: newGoal,
        status: "Not Started",
        priority,
        progress: 0,
        createdAt: new Date().toLocaleDateString(),
      });
      setNewGoal("");
      setPriority("Medium");
    }
  };

  const updateProgress = (index, value) => {
    updateGoal(index, { ...goals[index], progress: value });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Target className="text-blue-500" /> Employee Goals & KPIs
      </h2>

      {/* Add Goal */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal..."
          className="border rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex flex-col gap-1">
              <span
                className={`font-semibold ${
                  goal.status === "Completed"
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {goal.text}
              </span>
              <small className="text-gray-500">
                Priority:{" "}
                <span
                  className={`${
                    goal.priority === "High"
                      ? "text-red-600"
                      : goal.priority === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {goal.priority}
                </span>{" "}
                | Created: {goal.createdAt}
              </small>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress */}
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateProgress(i, Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-gray-600">{goal.progress}%</span>

              {/* Status Toggle */}
              <button
                onClick={() =>
                  updateGoal(i, {
                    ...goal,
                    status:
                      goal.status === "Not Started" ? "Completed" : "Not Started",
                  })
                }
                className={`px-3 py-1 rounded-lg text-white text-sm ${
                  goal.status === "Completed"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {goal.status === "Completed" ? "Completed" : "Mark Done"}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteGoal(i)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <p className="text-gray-500 italic">No goals added yet.</p>
        )}
      </div>
    </div>
  );
}
