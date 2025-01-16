import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VideoDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const video = state?.video;

  if (!video) {
    return <p>No video found!</p>;
  }

  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="bg-white rounded shadow p-5">
        <h1 className="text-2xl font-bold mb-3">{video.title}</h1>
        <iframe
          src={video.embed}
          className="w-full aspect-video rounded"
          allowFullScreen
          title={video.title}
        />
        <p className="mt-4 text-gray-600">{video.description || "No description available."}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Similar Videos</h2>
        {/* Placeholder for similar videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map similar videos here */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
