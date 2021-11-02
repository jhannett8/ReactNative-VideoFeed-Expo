import React, { useState, useEffect } from "react";
import LoopFeedData from "../assets/FeedObjects/LoopFeedData";
import Array from "../components/Array";

function Feed() {
  const [list, setList] = useState([]);

  const _getData = () => {
    //api call
    const response = LoopFeedData;
    setList(response);
  };

  useEffect(() => {
    _getData();
  });

  return <Array listArray={LoopFeedData} />;
}

export default Feed;
