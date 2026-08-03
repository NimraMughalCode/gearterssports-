"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { templates } from "@/app/utils/emailTemplates";

export default function CampaignsManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [recipients, setRecipients] = useState([]);
  
  // Form states for creating campaign
  const [isCreating, setIsCreating] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("standard");
  const [headingText, setHeadingText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [btnUrl, setBtnUrl] = useState("");
  const [promoImgUrl, setPromoImgUrl] = useState("");
  
  // CSV / List Upload states
  const [manualEmails, setManualEmails] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvRecipients, setCsvRecipients] = useState([]);
  const [importCount, setImportCount] = useState(0);

  // Sending progress state
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0, remaining: 0 });
  const isSendingRef = useRef(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      if (res.ok) {
        setCampaigns(data.campaigns || []);
      } else {
        toast.error(data.error || "Failed to load campaigns");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error loading campaigns");
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaignDetails = async (campaignId) => {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/dispatch`);
      const data = await res.json();
      if (res.ok) {
        setSelectedCampaign(data.campaign);
        setRecipients(data.recipients || []);
        
        // Setup initial progress counters
        const pendingCount = (data.recipients || []).filter(r => r.status === "pending" || r.status === "failed").length;
        const total = (data.recipients || []).length;
        setSendProgress({
          sent: total - pendingCount,
          total: total,
          remaining: pendingCount
        });
      } else {
        toast.error(data.error || "Failed to load campaign details");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error loading campaign details");
    }
  };

  // CSV parsing logic
  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      try {
        const parsed = parseCsvContent(text);
        setCsvRecipients(parsed);
        setImportCount(parsed.length);
        toast.success(`Parsed ${parsed.length} recipients successfully!`);
      } catch (err) {
        toast.error(err.message || "Failed to parse CSV file");
        setCsvFile(null);
      }
    };
    reader.readAsText(file);
  };

  const parseCsvContent = (text) => {
    const lines = text.split(/\r?\n/);
    const result = [];
    if (lines.length === 0 || !lines[0].trim()) {
      throw new Error("CSV file is empty");
    }

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/["']/g, ''));
    const emailIdx = headers.findIndex(h => h.includes("email") || h.includes("mail"));
    const firstNameIdx = headers.findIndex(h => h.includes("first") || (h.includes("name") && !h.includes("last")));
    const lastNameIdx = headers.findIndex(h => h.includes("last"));

    if (emailIdx === -1) {
      throw new Error("CSV file must contain an 'email' column.");
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const row = line.split(",").map(val => val.trim().replace(/["']/g, ''));
      const email = row[emailIdx];
      if (!email) continue;

      const firstName = firstNameIdx !== -1 && row[firstNameIdx] ? row[firstNameIdx] : "Customer";
      const lastName = lastNameIdx !== -1 && row[lastNameIdx] ? row[lastNameIdx] : "";

      result.push({
        email: email,
        metadata: {
          first_name: firstName,
          last_name: lastName
        }
      });
    }

    return result;
  };

  const handleManualEmailsParse = () => {
    if (!manualEmails.trim()) return [];
    
    // Match line-by-line emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = manualEmails.match(emailRegex) || [];
    
    const parsed = matches.map(email => ({
      email: email.trim().toLowerCase(),
      metadata: {
        first_name: "Customer",
        last_name: ""
      }
    }));

    return parsed;
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!campaignName || !subject || !bodyText) {
      return toast.error("Please fill in campaign name, subject, and content.");
    }

    let finalRecipients = [];

    // Process uploaded CSV first, otherwise process manual input list
    if (csvRecipients.length > 0) {
      finalRecipients = csvRecipients;
    } else {
      finalRecipients = handleManualEmailsParse();
    }

    if (finalRecipients.length === 0) {
      return toast.error("Please upload a CSV or write manual emails in the list.");
    }

    // Get the HTML blueprint from template file
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
    const compiledBody = selectedTemplateId === "custom_html" 
      ? bodyText 
      : bodyText.replace(/\n/g, "<br>");

    const compiledBaseHtml = selectedTemplate.getHtml({
      subject,
      bodyHtml: compiledBody,
      buttonText: btnText,
      buttonUrl: btnUrl,
      promoImageUrl: promoImgUrl
    });

    const loadingId = toast.loading("Saving campaign and processing recipient list...");
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName,
          subject,
          template_html: compiledBaseHtml,
          recipients: finalRecipients
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Campaign created successfully! Bounces/unsubscribes automatically skipped.", { id: loadingId });
        setIsCreating(false);
        setCampaignName("");
        setSubject("");
        setBodyText("");
        setBtnText("");
        setBtnUrl("");
        setPromoImgUrl("");
        setManualEmails("");
        setCsvFile(null);
        setCsvRecipients([]);
        setImportCount(0);
        fetchCampaigns();
      } else {
        toast.error(data.error || "Failed to create campaign", { id: loadingId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error creating campaign", { id: loadingId });
    }
  };

  // Batch Sending Loops
  const startSendingLoop = async (campaignId) => {
    if (isSending) return;
    setIsSending(true);
    isSendingRef.current = true;
    toast.success("Sending sequence started! Processing rate-limited batches of 100...");

    let remaining = sendProgress.remaining;
    let total = sendProgress.total;
    let sent = sendProgress.sent;

    while (isSendingRef.current && remaining > 0) {
      try {
        const res = await fetch(`/api/campaigns/${campaignId}/dispatch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "send_batch" })
        });

        const data = await res.json();
        
        if (!res.ok) {
          toast.error(data.error || "Batch sending error occurred.");
          isSendingRef.current = false;
          break;
        }

        if (data.completed || data.remaining === 0) {
          toast.success("All campaign emails dispatched successfully!");
          isSendingRef.current = false;
          break;
        }

        // Update loop state counters
        sent += data.sent_in_batch;
        remaining = data.remaining;
        setSendProgress({ sent, total, remaining });
        
        // Introduce small 1.5s delay to keep inside rate limits safely
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (err) {
        console.error(err);
        toast.error("Network error during batch transmission.");
        isSendingRef.current = false;
        break;
      }
    }

    setIsSending(false);
    isSendingRef.current = false;
    fetchCampaignDetails(campaignId);
    fetchCampaigns();
  };

  const pauseSendingLoop = async (campaignId) => {
    isSendingRef.current = false;
    setIsSending(false);

    try {
      const res = await fetch(`/api/campaigns/${campaignId}/dispatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pause" })
      });
      if (res.ok) {
        toast.success("Campaign dispatch paused.");
        fetchCampaignDetails(campaignId);
        fetchCampaigns();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to pause campaign.");
    }
  };

  const handleRetryRecipient = async (campaignId, recipientId) => {
    const loadingId = toast.loading("Retrying email dispatch...");
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/dispatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry", recipientId })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Email sent successfully!", { id: loadingId });
        fetchCampaignDetails(campaignId);
      } else {
        toast.error(data.error || "Failed to retry email", { id: loadingId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to retry email due to network error", { id: loadingId });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "opened":
      case "clicked":
        return "bg-green-900/30 text-green-400 border border-green-700/50";
      case "processing":
      case "sent":
        return "bg-blue-900/30 text-blue-400 border border-blue-700/50";
      case "paused":
      case "scheduled":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-700/50";
      case "failed":
      case "bounced":
      case "complained":
        return "bg-red-900/30 text-red-400 border border-red-700/50";
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700";
    }
  };

  if (selectedCampaign) {
    // Campaign details view
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
        {/* Back header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <button
            onClick={() => {
              isSendingRef.current = false;
              setIsSending(false);
              setSelectedCampaign(null);
              fetchCampaigns();
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-yellow-400 hover:text-yellow-400 text-sm font-semibold rounded-lg transition"
          >
            <Icon icon="mdi:arrow-left" width="18" /> Back to Campaigns
          </button>
          
          <div className="flex gap-3">
            {selectedCampaign.status !== "completed" && (
              <>
                {isSending ? (
                  <button
                    onClick={() => pauseSendingLoop(selectedCampaign.id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-lg transition text-sm"
                  >
                    <Icon icon="mdi:pause" width="18" /> Pause Send
                  </button>
                ) : (
                  <button
                    onClick={() => startSendingLoop(selectedCampaign.id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition text-sm shadow-lg shadow-green-900/20"
                  >
                    <Icon icon="mdi:play" width="18" /> Start/Resume Send
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => fetchCampaignDetails(selectedCampaign.id)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-850 border border-gray-700 hover:bg-gray-800 rounded-lg text-sm text-white"
            >
              <Icon icon="mdi:refresh" width="18" /> Refresh Statuses
            </button>
          </div>
        </div>

        {/* Campaign Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-black/40 p-6 rounded-xl border border-gray-800">
          <div className="md:col-span-2 space-y-2">
            <h2 className="text-2xl font-bold text-yellow-400">{selectedCampaign.name}</h2>
            <p className="text-gray-400 text-sm"><strong className="text-gray-300">Subject:</strong> {selectedCampaign.subject}</p>
            <div className="inline-flex items-center gap-1.5 mt-2">
              <span className={`text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wider ${getStatusColor(selectedCampaign.status)}`}>
                {selectedCampaign.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 col-span-2 gap-4">
            <div className="bg-gray-850 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-white">{selectedCampaign.total_recipients}</div>
              <div className="text-xs text-gray-400 uppercase font-semibold mt-1">Total List</div>
            </div>
            <div className="bg-gray-850 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-blue-400">{selectedCampaign.sent_count}</div>
              <div className="text-xs text-gray-400 uppercase font-semibold mt-1">Dispatched</div>
            </div>
            <div className="bg-gray-850 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-green-400">{selectedCampaign.delivered_count}</div>
              <div className="text-xs text-gray-400 uppercase font-semibold mt-1">Delivered</div>
            </div>
            <div className="bg-gray-850 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {selectedCampaign.sent_count > 0 
                  ? Math.round((selectedCampaign.opened_count / selectedCampaign.sent_count) * 100) 
                  : 0}%
              </div>
              <div className="text-xs text-gray-400 uppercase font-semibold mt-1">Open Rate</div>
            </div>
          </div>
        </div>

        {/* Progress Bar for Active Dispatch */}
        {isSending && (
          <div className="bg-gray-850 p-6 rounded-xl border border-yellow-700/30 animate-pulse">
            <div className="flex justify-between items-center mb-2 text-sm text-yellow-400 font-semibold">
              <span className="flex items-center gap-2">
                <Icon icon="line-md:loading-loop" /> Transmitting emails batch-by-batch...
              </span>
              <span>{Math.round((sendProgress.sent / sendProgress.total) * 100)}% ({sendProgress.sent} / {sendProgress.total})</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${(sendProgress.sent / sendProgress.total) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs mt-2 text-right">{sendProgress.remaining} pending/failed emails remaining.</p>
          </div>
        )}

        {/* Recipients Table */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Icon icon="mdi:account-group" className="text-yellow-400" /> Recipient Details
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="min-w-full bg-black/20 divide-y divide-gray-800 text-sm">
              <thead className="bg-gray-850 text-gray-300 text-left font-semibold">
                <tr>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">First Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Sent At</th>
                  <th className="px-6 py-4">Delivered At</th>
                  <th className="px-6 py-4">Feedback / Errors</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 text-gray-300">
                {recipients.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No recipients mapped to this campaign yet.
                    </td>
                  </tr>
                ) : (
                  recipients.map((rec) => (
                    <tr key={rec.id} className="hover:bg-gray-850/40">
                      <td className="px-6 py-4 font-medium text-white">{rec.email}</td>
                      <td className="px-6 py-4">{rec.metadata?.first_name || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${getStatusColor(rec.status)}`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {rec.sent_at ? new Date(rec.sent_at).toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {rec.delivered_at ? new Date(rec.delivered_at).toLocaleString() : "—"}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {rec.error_message ? (
                          <span className="text-red-400 flex items-center gap-1">
                            <Icon icon="mdi:alert-circle" /> {rec.error_message}
                          </span>
                        ) : rec.status === "opened" ? (
                          <span className="text-green-400 flex items-center gap-1 font-semibold">
                            <Icon icon="mdi:email-open" /> Opened Email
                          </span>
                        ) : rec.status === "clicked" ? (
                          <span className="text-blue-400 flex items-center gap-1 font-semibold animate-pulse">
                            <Icon icon="mdi:cursor-default-click" /> Clicked Link
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {rec.status === "failed" && (
                          <button
                            onClick={() => handleRetryRecipient(selectedCampaign.id, rec.id)}
                            className="p-1.5 border border-red-800/50 hover:bg-red-500 hover:text-black rounded text-red-400 transition"
                            title="Retry Email"
                          >
                            <Icon icon="mdi:reload" width="16" />
                          </button>
                        )}
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

  // Create Campaign modal/panel view
  if (isCreating) {
    const getPreviewHtml = () => {
      const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
      let previewBody = bodyText;
      
      // If standard template, convert newlines to <br> to preview correctly
      if (selectedTemplateId === "standard") {
        previewBody = bodyText.replace(/\n/g, "<br>");
      }
      
      const rawHtml = selectedTemplate.getHtml({
        subject: subject || "Gearters Sports Update",
        bodyHtml: previewBody,
        buttonText: btnText,
        buttonUrl: btnUrl,
        promoImageUrl: promoImgUrl
      });
      
      // Replace merge tags for preview
      return rawHtml
        .replace(/{{first_name}}/g, "John")
        .replace(/{{last_name}}/g, "Doe")
        .replace(/{{email}}/g, "john.doe@example.com");
    };

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-850">
          <div>
            <h2 className="text-xl font-bold text-yellow-400">Create New Email Campaign</h2>
            <p className="text-xs text-gray-500 mt-1">Configure your message and preview how it will appear to recipients.</p>
          </div>
          <button
            onClick={() => setIsCreating(false)}
            className="px-4 py-2 text-gray-400 hover:text-white rounded-lg border border-gray-800 hover:border-gray-650 transition text-xs font-semibold"
          >
            Cancel & Exit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (Col-span 7) */}
          <form onSubmit={handleCreateCampaign} className="lg:col-span-7 space-y-6 text-sm text-gray-300">
            {/* Main info row */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-400 font-medium">Campaign Name (Internal reference)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boxing Gloves Promo August 2026"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none text-white focus:border-yellow-400 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-400 font-medium">Subject Line (What customer sees)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. World Class Boxing Gloves - 20% Off This Week!"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none text-white focus:border-yellow-400 transition"
                  />
                </div>
              </div>

              {/* Template Selection */}
              <div className="space-y-2">
                <label className="block text-gray-400 font-medium font-semibold">Select Email Layout Template</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {templates.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplateId(t.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                        selectedTemplateId === t.id
                          ? "bg-yellow-500/10 border-yellow-500 text-white"
                          : "bg-black/40 border-gray-800 hover:border-gray-700 text-gray-400"
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-white mb-1">{t.name}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{t.description}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-end">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          selectedTemplateId === t.id ? "bg-yellow-500 text-black" : "bg-gray-800 text-gray-400"
                        }`}>
                          {selectedTemplateId === t.id ? "Active" : "Select"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template personalization fields */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
              <h3 className="text-white font-bold pb-2 border-b border-gray-850 flex items-center gap-2">
                <Icon icon="mdi:lead-pencil" className="text-yellow-400" /> Customize Template Content
              </h3>
              
              <div className="space-y-2">
                <label className="block text-gray-400">Email Body Text {selectedTemplateId === "custom_html" ? "(Paste your entire responsive HTML here)" : "(Supports HTML, inserts <br> automatically)"}</label>
                <textarea
                  required
                  placeholder={selectedTemplateId === "custom_html" ? "Paste raw custom HTML email code here..." : "Write your email body content here..."}
                  rows="8"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none text-white focus:border-yellow-400 transition font-mono text-xs"
                ></textarea>
                <p className="text-xs text-gray-500">Use merge tag <strong><code>{"{{first_name}}"}</code></strong> to personalize greeting (e.g. <code>{"Hello {{first_name}},"}</code>)</p>
              </div>

              {/* Custom CTA options */}
              {selectedTemplateId !== "custom_html" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-gray-400">Button Label (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Buy Now / View Catalog"
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none text-white focus:border-yellow-400 transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-400">Button Redirect Link (URL)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://www.gearterssports.com/products"
                      value={btnUrl}
                      onChange={(e) => setBtnUrl(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg p-3 outline-none text-white focus:border-yellow-400 transition"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* List import / CSV options */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
              <h3 className="text-white font-bold pb-2 border-b border-gray-850 flex items-center gap-2">
                <Icon icon="mdi:file-upload" className="text-yellow-400" /> Recipients List Upload
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* CSV Upload */}
                <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white">Option A: Drag-and-drop CSV File</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Upload a CSV file containing an <code>email</code> column.
                  </p>
                  <div className="relative border-2 border-dashed border-gray-700 hover:border-yellow-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Icon icon="mdi:file-delimited-outline" width="36" className="text-gray-500 mb-2" />
                    <span className="text-xs font-semibold text-yellow-500">
                      {csvFile ? csvFile.name : "Select CSV File"}
                    </span>
                    {csvFile && <span className="text-[10px] text-gray-400 mt-1">{importCount} recipients loaded</span>}
                  </div>
                </div>

                {/* Manual Email List */}
                <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-gray-800 flex flex-col">
                  <h4 className="font-semibold text-white">Option B: Write Email Addresses Manually</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Type or paste a list of emails directly (comma/space separated).
                  </p>
                  <textarea
                    placeholder="e.g. customer1@gmail.com, customer2@yahoo.com"
                    rows="4"
                    value={manualEmails}
                    onChange={(e) => {
                      setManualEmails(e.target.value);
                      if (csvFile) {
                        setCsvFile(null);
                        setCsvRecipients([]);
                      }
                    }}
                    disabled={csvFile !== null}
                    className="w-full bg-black border border-gray-700 rounded-lg p-2.5 outline-none text-white text-xs focus:border-yellow-400 transition resize-none flex-grow"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-3 bg-gray-850 hover:bg-gray-800 text-white font-medium rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/10 transition"
              >
                Save Campaign Draft
              </button>
            </div>
          </form>

          {/* Right Column: Live Email Preview (Col-span 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Icon icon="mdi:eye-outline" className="text-yellow-400" /> Live Email Preview
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 bg-green-500/15 text-green-400 rounded-full font-bold border border-green-500/25">
                  Real-time Sync
                </span>
              </div>
              
              <div className="text-xs text-gray-400 bg-black/40 p-3 rounded-lg space-y-1">
                <div><strong>Subject:</strong> {subject || "(No Subject)"}</div>
                <div><strong>From:</strong> info@gearterssports.com</div>
              </div>

              <div className="relative border border-gray-800 rounded-lg overflow-hidden bg-white shadow-inner" style={{ height: "550px" }}>
                <iframe
                  title="Email Preview"
                  srcDoc={getPreviewHtml()}
                  className="w-full h-full border-0 bg-white"
                />
              </div>
              
              <div className="text-[10px] text-gray-500 text-center leading-relaxed">
                This renders a direct preview of the email HTML. Merge tags (like <code>{"{{first_name}}"}</code>) are compiled with placeholder data.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Overview List View
  return (
    <div className="space-y-8">
      {/* Head header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon icon="mdi:email-campaign-outline" className="text-yellow-400" /> Email Campaigns
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage marketing emails, bulk list sends, and live tracking status.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/20 transition"
        >
          <Icon icon="mdi:plus" width="20" /> Create Campaign
        </button>
      </div>

      {/* Campaigns Listing */}
      {loading ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center justify-center gap-2">
          <Icon icon="line-md:loading-loop" width="36" className="text-yellow-400" />
          <p className="text-sm">Retrieving campaign logs from database...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-16 text-center text-gray-500 space-y-4">
          <Icon icon="mdi:email-outline" width="48" className="mx-auto text-gray-600" />
          <h3 className="text-lg font-bold text-white">No campaigns found</h3>
          <p className="text-sm max-w-sm mx-auto">Build your first email list campaign and draft custom newsletters with branding colors.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="mt-4 px-5 py-2.5 border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold text-sm rounded-lg transition"
          >
            Create First Draft
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="min-w-full bg-black/20 divide-y divide-gray-800 text-sm text-left">
            <thead className="bg-gray-850 text-gray-300 font-semibold">
              <tr>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">List Size</th>
                <th className="px-6 py-4 text-center">Sent</th>
                <th className="px-6 py-4 text-center">Bounced</th>
                <th className="px-6 py-4 text-center">Open Rate</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-850 text-gray-300">
              {campaigns.map((camp) => {
                const openRate = camp.sent_count > 0 
                  ? Math.round((camp.opened_count / camp.sent_count) * 100) 
                  : 0;

                return (
                  <tr key={camp.id} className="hover:bg-gray-850/40">
                    <td className="px-6 py-4 font-bold text-white">{camp.name}</td>
                    <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{camp.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${getStatusColor(camp.status)}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">{camp.total_recipients}</td>
                    <td className="px-6 py-4 text-center text-blue-400 font-semibold">{camp.sent_count}</td>
                    <td className="px-6 py-4 text-center text-red-400 font-semibold">{camp.bounced_count}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-semibold text-green-400">{openRate}%</div>
                      <div className="text-[10px] text-gray-500">{camp.opened_count} opens</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(camp.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => fetchCampaignDetails(camp.id)}
                        className="px-4 py-2 border border-gray-700 hover:border-yellow-400 hover:text-yellow-400 rounded-lg text-xs font-bold transition flex items-center gap-1.5 mx-auto"
                      >
                        <Icon icon="mdi:open-in-new" width="14" /> View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
