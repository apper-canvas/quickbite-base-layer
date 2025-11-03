import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "@/components/pages/Home";
import RestaurantDetail from "@/components/pages/RestaurantDetail";
import Orders from "@/components/pages/Orders";
import OrderTracking from "@/components/pages/OrderTracking";
import Profile from "@/components/pages/Profile";
import Search from "@/components/pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId/track" element={<OrderTracking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;