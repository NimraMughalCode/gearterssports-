"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function SendMessage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMessage("Email sent successfully!");
        toast.success("Email sent successfully!");
        reset();
      } else {
        setMessage(result.error || "Failed to send email.");
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-5 p-6 bg-gray-900 rounded-xl shadow-lg text-white">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-red-500 mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 h-28 focus:outline-none focus:border-red-500"
          ></textarea>
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {message && <p className="text-green-400 mt-2">{message}</p>}
      </form>
    </div>
  );
}
