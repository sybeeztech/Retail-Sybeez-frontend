import { useState } from "react";
import usePerformanceStore from "../../store/performanceStore";
import { Star, Trash2 } from "lucide-react";

export default function Reviews() {
  const { reviews, addReview } = usePerformanceStore();
  const [newReview, setNewReview] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [category, setCategory] = useState("Technical");
  const [rating, setRating] = useState(0);

  const handleAdd = () => {
    if (newReview.trim() && reviewer.trim() && rating > 0) {
      addReview({
        text: newReview,
        reviewer,
        category,
        rating,
        date: new Date().toLocaleDateString(),
      });
      setNewReview("");
      setReviewer("");
      setCategory("Technical");
      setRating(0);
    }
  };

  const handleDelete = (index) => {
    const updated = [...reviews];
    updated.splice(index, 1);
    // directly updating store state
    addReview([]); // reset reviews
    updated.forEach((r) => addReview(r)); // re-add remaining
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">📋 Performance Reviews</h2>

      {/* Add Review */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="Reviewer Name"
          className="border rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2 w-48"
        >
          <option>Technical</option>
          <option>Behavioral</option>
          <option>Leadership</option>
        </select>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`cursor-pointer ${
                i <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(i)}
            />
          ))}
        </div>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write review..."
          className="border rounded-lg p-2 flex-1 focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-500 italic">No reviews added yet.</p>
        )}
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{r.reviewer}</span>
              <span className="text-sm text-gray-500">{r.category}</span>
              <p className="text-gray-700 mt-1">{r.text}</p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`${
                      s <= r.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <small className="text-gray-400">Date: {r.date}</small>
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
