"use client"
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import "../style/dashboard/dashboard.scss";
import withAuth from "../withAuth";
import CardTotalRevenue from "../ui/dashboard/card/card2";
import Subscriptions from "../ui/dashboard/card/card3";

function Dashboard() {
    return (

        <div className="wrapper">
            <div className="main">
                <div className="cards">
                    <CardTotalRevenue />
                    <Card />
                    <Subscriptions />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className="side">
                <Rightbar />
            </div>
        </div>
    );
}

export default withAuth(Dashboard);
