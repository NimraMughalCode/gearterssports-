"use client";

import React, { useState } from "react";
import { Video, Upload, Trash2, Edit, Star, Check, X, Play } from "lucide-react";

export default function TestimonialsManager({
  testimonials = [],
  clientName,
  setClientName,
  clientTitle,
  setClientTitle,
  reviewText,
  setReviewText,
  rating,
  setRating,
  displayOrder,
  setDisplayOrder,
  videoFile,
  setVideoFile,
  videoUrl,
  setVideoUrl,
  videoType,
  setVideoType,
  editingTestimonial,
  setEditingTestimonial,
  handleAddTestimonial,
  handleUpdateTestimonial,
  handleDeleteTestimonial,
  onOpenPreview,
}) {
  return (
    <div className="space-y-8">
      {/* Upload / Edit Card */}
      <section className="bg-gray-900/90 border border-yellow-500/40 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
          <Video className="w-6 h-6 text-yellow-400" />
          {editingTestimonial ? "Edit Client Testimonial" : "Add New Client Video Testimonial"}
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Upload 16:9 aspect ratio client video reviews, unboxing reactions, or coach testimonials.
        </p>

        <div className="space-y-5">
          {/* Client Name & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Client / Gym Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Jake Miller / Iron Fist Gym"
                className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded-lg text-white text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Role / Location *
              </label>
              <input
                type="text"
                value={clientTitle}
                onChange={(e) => setClientTitle(e.target.value)}
                placeholder="e.g. Boxing Gear Distributor, USA"
                className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded-lg text-white text-sm outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Rating & Display Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Star Rating
              </label>
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border border-yellow-500/60">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-yellow-400 font-bold ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                Display Position (Optional)
              </label>
              <input
                type="number"
                min="1"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="Auto (Newest first)"
                className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded-lg text-white text-sm outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Written Feedback Quote */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
              Written Testimonial / Quote (Optional)
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="e.g. 'Top-quality boxing gloves! We have been ordering for over 2 years and our members love the custom leather finish.'"
              className="p-2.5 w-full bg-gray-800 border border-yellow-500/60 rounded-lg text-white text-sm outline-none focus:border-yellow-400"
            />
          </div>

          {/* Video Input Mode (16:9 Video File or URL) */}
          <div className="p-4 rounded-xl bg-gray-800/80 border border-yellow-500/40 space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-semibold text-yellow-300 uppercase flex items-center gap-1.5">
                <Video className="w-4 h-4 text-yellow-400" /> 16:9 Video Source *
              </span>
              <div className="flex gap-4 text-xs text-white">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    value="file"
                    checked={videoType === "file"}
                    onChange={() => setVideoType("file")}
                    className="accent-yellow-400"
                  />
                  Upload Video File (MP4, WEBM)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    value="url"
                    checked={videoType === "url"}
                    onChange={() => setVideoType("url")}
                    className="accent-yellow-400"
                  />
                  Video URL
                </label>
              </div>
            </div>

            {videoType === "file" ? (
              <div className="space-y-3">
                <label className="border-2 border-dashed border-yellow-500/60 hover:border-yellow-400 bg-gray-900/60 hover:bg-gray-900 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                  <Upload className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform mb-1.5" />
                  <span className="text-sm font-semibold text-white">
                    Select 16:9 Video File
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    MP4, MOV, or WEBM format (Recommended landscape 16:9)
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0] || null)}
                    className="hidden"
                  />
                </label>

                {videoFile && (
                  <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-yellow-500/50">
                    <Video className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                    <div className="text-xs text-gray-300 flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{videoFile.name}</p>
                      <p className="text-gray-400">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="text-red-400 hover:text-red-300 text-xs px-2.5 py-1 bg-red-950/40 rounded border border-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://your-storage-or-cdn.com/video.mp4"
                className="p-2.5 w-full bg-gray-900 border border-yellow-500/60 rounded-lg text-white text-sm outline-none focus:border-yellow-400"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {editingTestimonial ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdateTestimonial}
                  className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg transition shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setClientName("");
                    setClientTitle("");
                    setReviewText("");
                    setRating(5);
                    setDisplayOrder("");
                    setVideoFile(null);
                    setVideoUrl("");
                  }}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleAddTestimonial}
                className="w-full sm:w-auto px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg transition shadow-md flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Testimonial
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Uploaded Testimonials Showcase in 16:9 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
            Uploaded Video Testimonials ({testimonials.length})
          </h3>
          <span className="text-xs text-gray-400">
            Displayed on website in 16:9 widescreen format
          </span>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/60 border border-gray-800 rounded-2xl text-gray-400">
            <Video className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold">No video testimonials uploaded yet.</p>
            <p className="text-xs text-gray-500 mt-1">
              Upload your first client video review above to showcase it on your website!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between space-y-3"
              >
                {/* 16:9 Video Container */}
                <div
                  className="relative aspect-video w-full bg-black rounded-xl overflow-hidden cursor-pointer group shadow-inner"
                  onClick={() => onOpenPreview && onOpenPreview(item.video_url)}
                >
                  <video
                    src={item.video_url}
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[10px] text-yellow-400 rounded font-mono font-bold">
                    16:9
                  </span>
                </div>

                {/* Client Info & Rating */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-base truncate">
                      {item.client_name}
                    </h4>
                    <div className="flex items-center text-yellow-400 text-xs">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {item.client_title && (
                    <p className="text-xs text-yellow-500 font-medium">
                      {item.client_title}
                    </p>
                  )}

                  {item.review_text && (
                    <p className="text-xs text-gray-300 italic line-clamp-3 mt-1 leading-relaxed">
                      "{item.review_text}"
                    </p>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-xs">
                  <span className="text-gray-500">
                    {item.display_order ? `Position #${item.display_order}` : "Auto Order"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(item)}
                      className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-semibold"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(item)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
