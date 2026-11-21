"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/utils/adminAPI";
import TestimonialsManager from "../TestimonialsManager";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import Modal from "react-modal";

function getStoragePathFromUrl(url) {
  if (!url) return null;
  const marker = "/product-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientTitle, setClientTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [displayOrder, setDisplayOrder] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState("file");

  // Edit & Modal preview
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [activePreviewVideo, setActivePreviewVideo] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (editingTestimonial) {
      setClientName(editingTestimonial.client_name || "");
      setClientTitle(editingTestimonial.client_title || "");
      setReviewText(editingTestimonial.review_text || "");
      setRating(editingTestimonial.rating || 5);
      setDisplayOrder(editingTestimonial.display_order ?? "");
      setVideoUrl(editingTestimonial.video_url || "");
      setVideoType("file");
      setVideoFile(null);
    }
  }, [editingTestimonial]);

  async function loadTestimonials() {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTestimonial() {
    if (!clientName.trim()) {
      return toast.error("Please provide client or gym name");
    }

    let finalVideoUrl = videoUrl.trim();

    if (videoType === "file") {
      if (!videoFile) return toast.error("Please select a 16:9 video file");

      const toastId = toast.loading("Uploading 16:9 testimonial video...");
      try {
        const fileExt = videoFile.name.split(".").pop();
        const safeName = videoFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `testimonials/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, videoFile);

        if (uploadError) throw new Error("Upload failed: " + uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        finalVideoUrl = publicUrl;
        toast.dismiss(toastId);
      } catch (err) {
        toast.error(err.message, { id: toastId });
        return;
      }
    } else if (!finalVideoUrl) {
      return toast.error("Please enter a valid video URL");
    }

    const saveToast = toast.loading("Saving testimonial...");
    try {
      await addTestimonial({
        client_name: clientName,
        client_title: clientTitle,
        review_text: reviewText,
        video_url: finalVideoUrl,
        rating,
        display_order: displayOrder,
      });

      // Reset
      setClientName("");
      setClientTitle("");
      setReviewText("");
      setRating(5);
      setDisplayOrder("");
      setVideoFile(null);
      setVideoUrl("");
      setVideoType("file");

      await loadTestimonials();
      toast.success("Testimonial added successfully!", { id: saveToast });
    } catch (err) {
      toast.error(err.message || "Failed to save testimonial", { id: saveToast });
    }
  }

  async function handleUpdateTestimonial() {
    if (!editingTestimonial) return;
    if (!clientName.trim()) return toast.error("Please enter client name");

    let finalVideoUrl = editingTestimonial.video_url;

    if (videoType === "file" && videoFile) {
      const uploadToast = toast.loading("Uploading replacement video...");
      try {
        const fileExt = videoFile.name.split(".").pop();
        const safeName = videoFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `testimonials/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, videoFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        finalVideoUrl = publicUrl;
        toast.dismiss(uploadToast);
      } catch (err) {
        toast.error("Upload failed: " + err.message, { id: uploadToast });
        return;
      }
    } else if (videoType === "url" && videoUrl) {
      finalVideoUrl = videoUrl;
    }

    const saveToast = toast.loading("Updating testimonial...");
    try {
      await updateTestimonial({
        id: editingTestimonial.id,
        client_name: clientName,
        client_title: clientTitle,
        review_text: reviewText,
        video_url: finalVideoUrl,
        rating,
        display_order: displayOrder,
      });

      setEditingTestimonial(null);
      setClientName("");
      setClientTitle("");
      setReviewText("");
      setRating(5);
      setDisplayOrder("");
      setVideoFile(null);
      setVideoUrl("");

      await loadTestimonials();
      toast.success("Testimonial updated successfully!", { id: saveToast });
    } catch (err) {
      toast.error(err.message || "Failed to update", { id: saveToast });
    }
  }

  async function handleDeleteTestimonial(item) {
    if (!confirm(`Delete testimonial from "${item.client_name}"?`)) return;

    const toastId = toast.loading("Deleting testimonial...");
    try {
      if (item.video_url) {
        const filePath = getStoragePathFromUrl(item.video_url);
        if (filePath) {
          await supabase.storage.from("product-images").remove([filePath]);
        }
      }

      await deleteTestimonial(item.id);
      await loadTestimonials();
      toast.success("Testimonial deleted!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Delete failed", { id: toastId });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="solar:chat-round-video-bold" className="text-yellow-400" /> Client Video Testimonials
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Upload and manage 16:9 video reviews from gym owners, fighters, and distributors to display on the storefront.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-lg w-fit">
          {testimonials.length} Testimonials Published
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center gap-2">
          <Icon icon="line-md:loading-loop" width="36" className="text-yellow-400" />
          <p className="text-sm">Loading client testimonials from database...</p>
        </div>
      ) : (
        <TestimonialsManager
          testimonials={testimonials}
          clientName={clientName}
          setClientName={setClientName}
          clientTitle={clientTitle}
          setClientTitle={setClientTitle}
          reviewText={reviewText}
          setReviewText={setReviewText}
          rating={rating}
          setRating={setRating}
          displayOrder={displayOrder}
          setDisplayOrder={setDisplayOrder}
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          videoType={videoType}
          setVideoType={setVideoType}
          editingTestimonial={editingTestimonial}
          setEditingTestimonial={setEditingTestimonial}
          handleAddTestimonial={handleAddTestimonial}
          handleUpdateTestimonial={handleUpdateTestimonial}
          handleDeleteTestimonial={handleDeleteTestimonial}
          onOpenPreview={(url) => setActivePreviewVideo(url)}
        />
      )}

      {/* Fullscreen Video Modal Preview */}
      <Modal
        isOpen={!!activePreviewVideo}
        onRequestClose={() => setActivePreviewVideo(null)}
        className="bg-black border border-yellow-500/40 rounded-2xl max-w-4xl w-full mx-auto p-4 outline-none shadow-2xl relative"
        overlayClassName="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <button
          onClick={() => setActivePreviewVideo(null)}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold hover:bg-yellow-400 transition"
        >
          ✕
        </button>
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <video
            src={activePreviewVideo}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}
