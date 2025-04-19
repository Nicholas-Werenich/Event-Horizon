import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirect to the Calendar page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
