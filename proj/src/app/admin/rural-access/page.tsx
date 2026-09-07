import React from "react";
import { prisma } from "@/lib/prisma";
import { Mail, Calendar, Building, User, Phone, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RuralAccessEnquiriesPage() {
  const enquiries = await prisma.ruralAccessInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
            Rural Access Enquiries
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            View all enquiries submitted for the Rural Access Initiative.
          </p>
        </div>
        <div className="bg-[#10192A] border border-[#1E2D45] rounded-xl px-4 py-2 flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#E5B869]" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total</span>
            <span className="text-sm font-bold text-white">{enquiries.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0B1220] border border-[#1E2D45] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E2D45] bg-[#10192A]">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Location (Place)</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D45]">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-[#10192A]/50 transition-colors">
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-8 h-8 rounded-full bg-[#1A2639] flex items-center justify-center shrink-0 border border-[#2A3A55]">
                          <Building className="w-4 h-4 text-[#E5B869]" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">{enquiry.institutionName}</div>
                          <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E5B869]/10 text-[#E5B869] border border-[#E5B869]/20">
                            {enquiry.institutionType}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        {enquiry.place}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-200">
                          <User className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          {enquiry.contactPerson}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <a href={`mailto:${enquiry.email}`} className="hover:text-[#E5B869] hover:underline transition-colors">{enquiry.email}</a>
                        </div>
                        {enquiry.phone && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            {enquiry.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-xs">
                      <div className="text-sm text-gray-300 whitespace-pre-wrap break-words line-clamp-3 hover:line-clamp-none cursor-pointer group">
                        {enquiry.message || <span className="text-gray-600 italic">No message provided.</span>}
                        {enquiry.message && <div className="text-[10px] text-[#E5B869] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Show more</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(enquiry.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
