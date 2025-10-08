import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import your performance pages
import Goals from "./modules/performance/Goals";
import Reviews from "./modules/performance/Reviews";
import Feedback from "./modules/performance/Feedback";
import Analytics from "./modules/performance/Analytics";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Routes> */}
        {/* Performance pages */}
        {/* <Route path="/performance/goals" element={<Goals />} />
        <Route path="/performance/reviews" element={<Reviews />} />
        <Route path="/performance/feedback" element={<Feedback />} />
        <Route path="/performance/analytics" element={<Analytics />} /> */}

        {/* Default route */}
        {/* <Route path="/" element={<h2>Welcome to Performance Dashboard 🚀</h2>} /> */}
      {/* </Routes> */}
    </Router>
  );
}

export default App;