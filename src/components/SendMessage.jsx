"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {toast, Toaster} from "react-hot-toast";

export default function SendMessage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
    <div className="p-6 bg-white rounded-lg shadow-md">
    <Toaster position="top-right"/>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
            className="w-full p-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            className="w-full p-2 border rounded-lg h-28"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}