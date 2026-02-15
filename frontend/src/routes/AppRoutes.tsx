import { Routes, Route } from "react-router-dom";
import ReservationList from "../pages/ReservationList";
import ReservationForm from "../pages/ReservationForm";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ReservationList />} />
    <Route path="/new" element={<ReservationForm />} />
  </Routes>
);

export default AppRoutes;

