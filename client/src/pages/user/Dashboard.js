import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import profile from "./profile_img.svg";

import "./Dashboard.css";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>
              <div className="profileuser">
                <div>
                  <img src={profile} alt="profile" />
                </div>
                <div>
                  <p className="greet">Hello,</p>
                  <p className="profile_name">{auth?.user?.name}</p>
                </div>
              </div>
              <h3 className="content">{auth?.user?.email}</h3>
              <h3 className="content">{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
