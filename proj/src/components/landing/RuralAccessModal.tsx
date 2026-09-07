"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RuralAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RuralAccessModal({ isOpen, onClose }: RuralAccessModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "10th",
    place: "",
    contactPerson: "",
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
      const res = await fetch("/api/rural-access-inquiry", {
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
            className="relative w-full max-w-2xl bg-[#0B1220] border border-[#1E2D45] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E2D45] bg-[#10192A]">
              <div>
                <h3 className="text-xl font-bold text-white font-serif">Partner with Rural Access Initiative</h3>
                <p className="text-sm text-gray-400 mt-1">Help us bring quality education to underserved schools.</p>
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
                  <h4 className="text-2xl font-bold text-white">Inquiry Submitted!</h4>
                  <p className="text-gray-300 max-w-md">
                    Thank you for your interest in the Rural Access Initiative. Our team will review your details and get back to you shortly.
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Institute Name <span className="text-red-400">*</span></label>
                      <input
                        required
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                        placeholder="e.g. Govt High School"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Institute Type <span className="text-red-400">*</span></label>
                      <select
                        name="institutionType"
                        value={formData.institutionType}
                        onChange={handleChange}
                        className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                      >
                        <option value="10th">10th</option>
                        <option value="PU">PU</option>
                        <option value="College">College</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Place / Location <span className="text-red-400">*</span></label>
                    <input
                      required
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                      placeholder="City, District, State"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Contact Person <span className="text-red-400">*</span></label>
                      <input
                        required
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5B869] focus:ring-1 focus:ring-[#E5B869] transition"
                        placeholder="Full Name"
                      />
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
                      placeholder="Tell us a bit about your institution and how we can help..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-[#F5D075] to-[#E5B869] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Inquiry"
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
