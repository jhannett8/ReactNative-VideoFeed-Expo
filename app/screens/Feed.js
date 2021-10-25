import React, { useState, useEffect } from "react";
import FeedVideoArray from "../components/FeedVideoArray";
import LoopFeedData from "../assets/FeedObjects/LoopFeedData";

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

  return (
    <FeedVideoArray listArray={LoopFeedData} />
  );
}

export default Feed;
