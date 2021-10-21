import React, { useState, useLayoutEffect, useEffect } from "react";

import { useMoralis, useMoralisWeb3ApiCall, useMoralisWeb3Api, useMoralisQuery, useMoralisCloudFunction } from "react-moralis";

function Today() {
  const { user } = useMoralis();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("in efffect ", user);
    if (!user) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [user]);

  const initialState = () => {
    return (
      <div className="status">
        <p>Guest</p>
      </div>
    );
  };
  const loggedState = () => {
    return (
      <div className="status">
        <p>@{user.get("username")}</p>
      </div>
    );
  };

  const current = new Date();

  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  return (
    <div>
      {loggedIn ? loggedState() : initialState()}
      {/* <div className="top">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              <span className="card-titled">Home</span>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dashboard</Card.Subtitle>
            <Card.Text>Date: {date}</Card.Text>
          </Card.Body>
          <Card.Body className="bannerlogo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/73px-Ethereum_logo_2014.svg.png"
              alt="Girl in a jacket"
              width="60"
              height="90"
            />
          </Card.Body>
          <Card.Body className="profilepic">
            <Figure>
              <Figure.Image
                width={60}
                height={70}
                alt="171x180"
                src="https://3.bp.blogspot.com/-UI5bnoLTRAE/VuU18_s6bRI/AAAAAAAADGA/uafLtb4ICCEK8iO3NOh1C_Clh86GajUkw/s320/guest.png"
              />
              <Figure.Caption>{value}</Figure.Caption>
            </Figure>
          </Card.Body>
        </Card>
      </div>

      <Data /> */}
    </div>
  );
}
export default Today;
