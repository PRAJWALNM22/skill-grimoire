"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentModal({ isOpen, onClose }: StudentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    studentClass: "10th",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/student-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSuccess(true);
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0B1220] border border-[#1E2D45] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E2D45] bg-[#10192A]">
              <div>
                <h3 className="text-xl font-bold text-white font-serif">Apply as Individual Student</h3>
                <p className="text-sm text-gray-400 mt-1">Join our programmes independently.</p>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Application Received!</h4>
                  <p className="text-gray-300 max-w-md">
                    Thank you for applying. We have received your details and will get back to you shortly with next steps.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-[#1E2D45] hover:bg-[#2A3A55] text-white font-medium rounded-xl transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name <span className="text-red-400">*</span></label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Student Class <span className="text-red-400">*</span></label>
                    <select
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleChange}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                    >
                      <option value="10th">10th</option>
                      <option value="PU I">PU I</option>
                      <option value="PU II">PU II</option>
                      <option value="UG I">UG I</option>
                      <option value="UG II">UG II</option>
                      <option value="UG III">UG III</option>
                      <option value="PG I">PG I</option>
                      <option value="PG II">PG II</option>
                      <option value="10th FC">10th FC</option>
                      <option value="PUC FC">PUC FC</option>
                      <option value="UG FC">UG FC</option>
                      <option value="PG FC">PG FC</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Description / Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition resize-none"
                      placeholder="Tell us a bit about why you want to join..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-3 bg-gradient-to-r from-[#F5D075] to-[#E5B869] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
