import "./Dashboard.css";
import MainDash from "./MainDash/MainDash.jsx";
import RightSide from "./RightSide/RightSide.jsx";
import Sidebar from "./Sidebar.jsx";

function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="DashboardGlass">
        <Sidebar className="Sidebar" />
        <MainDash className="MainDash" />
        <RightSide className="RightSide" />
      </div>
    </div>
  );
}

export default Dashboard;
