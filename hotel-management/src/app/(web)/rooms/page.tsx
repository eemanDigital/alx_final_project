"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");

    console.log(searchQuery);
    console.log(roomType);
  }, []);

  return <div>Rooms</div>;
};

export default Rooms;
