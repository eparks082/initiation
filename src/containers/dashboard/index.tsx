import React, { useState, useEffect } from "react";
import { Card, CardBody, CardText, Spinner } from "reactstrap";
import axios from "axios";
import "./index.scss";

const LoadingSpinner = () => {
  return <Spinner color="primary" size="sm" />;
};

interface DashboardProps {
  token: string;
}

const Dashboard = (props: DashboardProps) => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://api.intelliscan.io/user/domains/",
      headers: {
        token: props.token,
      },
    })
      .then((res) => {
        setDomains(res.data.domains);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [props.token]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="pg-title">Dashboard Page</div>
      {domains.map((domain: string, index: number) => (
        <Card key={index}>
          <CardBody>
            <CardText>{domain}</CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default Dashboard;
