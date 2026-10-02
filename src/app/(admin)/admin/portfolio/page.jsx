"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import PortfolioManager from "../PortfolioMager";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

function getStoragePathFromUrl(url) {
  if (!url) return null;
  const marker = "/product-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.substring(index + marker.length);
}

export default function AdminPortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load portfolio items");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPortfolio() {
    if (!portfolioFile) return toast.error("Please select a video file");

    const toastId = toast.loading("Uploading video...");

    try {
      const fileExt = portfolioFile.name.split(".").pop();
      const fileName = `portfolio/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, portfolioFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      await supabase.from("portfolio").insert({
        url: publicUrl,
      });

      setPortfolioFile(null);
      fetchPortfolio();
      toast.success("Video added to portfolio!", { id: toastId });
    } catch (err) {
      toast.error("Upload failed: " + err.message, { id: toastId });
    }
  }

  async function handleUpdatePortfolio() {
    if (!editingPortfolio) return;

    const toastId = toast.loading("Updating video...");

    try {
      let finalUrl = editingPortfolio.url;

      if (portfolioFile) {
        const fileExt = portfolioFile.name.split(".").pop();
        const fileName = `portfolio/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, portfolioFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        finalUrl = publicUrl;
      }

      await supabase
        .from("portfolio")
        .update({ url: finalUrl })
        .eq("id", editingPortfolio.id);

      setEditingPortfolio(null);
      setPortfolioFile(null);
      fetchPortfolio();

      toast.success("Portfolio video updated!", { id: toastId });
    } catch (err) {
      toast.error("Update failed: " + err.message, { id: toastId });
    }
  }

  async function handleDeletePortfolio(item) {
    if (!confirm("Delete this portfolio video?")) return;

    const toastId = toast.loading("Deleting video...");

    try {
      await supabase.from("portfolio").delete().eq("id", item.id);

      if (item.url) {
        const filePath = getStoragePathFromUrl(item.url);
        if (filePath) {
          await supabase.storage.from("product-images").remove([filePath]);
        }
      }

      fetchPortfolio();
      toast.success("Video deleted!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Delete failed", { id: toastId });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="solar:clapperboard-play-bold" className="text-yellow-400" /> Portfolio Videos
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage factory production showcases, gym sparring highlights, and brand reel videos.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-lg w-fit">
          {portfolio.length} Videos Uploaded
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center gap-2">
          <Icon icon="line-md:loading-loop" width="36" className="text-yellow-400" />
          <p className="text-sm">Loading portfolio reels...</p>
        </div>
      ) : (
        <PortfolioManager
          portfolio={portfolio}
          portfolioFile={portfolioFile}
          setPortfolioFile={setPortfolioFile}
          editingPortfolio={editingPortfolio}
          setEditingPortfolio={setEditingPortfolio}
          handleAddPortfolio={handleAddPortfolio}
          handleUpdatePortfolio={handleUpdatePortfolio}
          handleDeletePortfolio={handleDeletePortfolio}
        />
      )}
    </div>
  );
}
