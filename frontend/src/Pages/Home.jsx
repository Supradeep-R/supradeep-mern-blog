import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(userInfo);
    if (!userInfo || !userInfo.username) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return <div>Home</div>;
};

export default Home;
