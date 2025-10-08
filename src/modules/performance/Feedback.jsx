import { useState } from "react";
import usePerformanceStore from "../../store/performanceStore";
import { Trash2 } from "lucide-react";

export default function Feedback() {
  const { feedbacks, addFeedback } = usePerformanceStore();
  const [newFeedback, setNewFeedback] = useState("");
  const [from, setFrom] = useState("");
  const [type, setType] = useState("Peer");
  const [sentiment, setSentiment] = useState("Positive");

  const handleAdd = () => {
    if (newFeedback.trim() && from.trim()) {
      addFeedback({
        text: newFeedback,
        from,
        type,
        sentiment,
        date: new Date().toLocaleDateString(),
      });
      setNewFeedback("");
      setFrom("");
      setType("Peer");
      setSentiment("Positive");
    }
  };

  const handleDelete = (index) => {
    const updated = [...feedbacks];
    updated.splice(index, 1);
    addFeedback([]); // reset
    updated.forEach((fb) => addFeedback(fb)); // re-add remaining
  };

  const sentimentColors = {
    Positive: "bg-green-200 text-green-800",
    Neutral: "bg-yellow-200 text-yellow-800",
    Negative: "bg-red-200 text-red-800",
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">💬 360° Feedback</h2>

      {/* Add Feedback */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From (Manager/Peer/Self)"
          className="border rounded-lg p-2 w-48 focus:ring focus:ring-blue-300"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg p-2 w-32"
        >
          <option>Manager</option>
          <option>Peer</option>
          <option>Self</option>
        </select>
        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="border rounded-lg p-2 w-32"
        >
          <option>Positive</option>
          <option>Neutral</option>
          <option>Negative</option>
        </select>
        <input
          type="text"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter feedback..."
          className="border rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.length === 0 && (
          <p className="text-gray-500 italic">No feedback added yet.</p>
        )}
        {feedbacks.map((fb, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{fb.from}</span>
                <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                  {fb.type}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${sentimentColors[fb.sentiment]}`}
                >
                  {fb.sentiment}
                </span>
              </div>
              <p className="text-gray-700 mt-1">"{fb.text}"</p>
              <small className="text-gray-400">Date: {fb.date}</small>
            </div>
            <button
              onClick={() => handleDelete(i)}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white flex items-center gap-1"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
