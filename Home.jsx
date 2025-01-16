import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoDetail from "./VideoDetail";


const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("mohit");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const fetchVideos = async (query, page) => {
    setLoading(true);   
    try {
        const response = await axios.get(
         " https://www.eporner.com/api/v2/video/search/",
            {
              params: {
                query: query,
                page: page,
                per_page: 30,
                order: "top-yearly",
                thumbsize: "big",
                format: "json",
              },
            }
          );

      if (response.data) {
        setVideos(response.data.videos);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`, { state: { video } });
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search videos..."
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded shadow p-3 cursor-pointer hover:shadow-lg transform hover:scale-105 transition"
              onClick={() => handleVideoClick(video)}
            >
              <img
                src={video.default_thumb.src}
                alt={video.title}
                className="w-full rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-500">Duration: {video.length_min}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePagination("prev")}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination("next")}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
