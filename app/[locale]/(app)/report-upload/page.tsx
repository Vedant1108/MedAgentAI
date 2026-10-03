"use client";
import { useState, useCallback } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function ReportUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const simulateUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsDone(true);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const reset = () => {
    setFile(null);
    setIsUploading(false);
    setProgress(0);
    setIsDone(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-6">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Upload Medical Report</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Upload your lab results for instant, private AI analysis.
        </p>
      </div>

      <div 
        className="rounded-3xl p-1"
        style={{ background: "linear-gradient(135deg, var(--primary-muted), transparent)" }}
      >
        <div 
          className="rounded-[23px] p-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                  isDragging ? "bg-[var(--primary-light)] border-[var(--primary)]" : "border-[var(--border)] bg-[var(--bg-hover)]"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div 
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    isDragging ? "bg-[var(--primary)] text-white scale-110 shadow-lg shadow-[var(--primary)]/30" : "bg-[var(--bg-surface)] text-[var(--text-faint)]"
                  }`}
                >
                  <UploadCloud className="h-8 w-8" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {isDragging ? "Drop file here" : "Drag & drop your PDF"}
                </h3>
                <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                  or click to browse from your computer. Only PDF files are supported up to 10MB.
                </p>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}>
                  <Shield className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
                  End-to-end encrypted
                </div>
              </motion.div>
            ) : !isUploading && !isDone ? (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div 
                  className="flex items-center justify-between p-4 rounded-xl border"
                  style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger)" }}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm truncate max-w-[200px] md:max-w-xs" style={{ color: "var(--text-primary)" }}>{file.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                    </div>
                  </div>
                  <button 
                    onClick={reset}
                    className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                    style={{ color: "var(--text-faint)" }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={reset}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={simulateUpload}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-2"
                    style={{ background: "var(--primary)" }}
                  >
                    Upload & Analyze
                  </button>
                </div>
              </motion.div>
            ) : isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="relative w-20 h-20 mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" strokeWidth="6" style={{ stroke: "var(--bg-hover)" }} />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" strokeWidth="6" strokeLinecap="round"
                      style={{ stroke: "var(--primary)", strokeDasharray: 283, strokeDashoffset: 283 - (283 * progress) / 100, transition: "stroke-dashoffset 0.1s linear" }} 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{progress}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Processing Report...</h3>
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Stripping personal identifiers and analyzing medical parameters.
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
                  <Lock className="h-3.5 w-3.5" />
                  PII is being removed locally
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="h-20 w-20 rounded-full flex items-center justify-center mb-6" style={{ background: "var(--primary-muted)", color: "var(--primary)" }}>
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Analysis Complete!</h3>
                <p className="text-sm max-w-sm mb-8" style={{ color: "var(--text-muted)" }}>
                  Your report has been successfully processed and analyzed. No personal data was stored.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={reset}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  >
                    Upload Another
                  </button>
                  <Link 
                    href="/report-analysis"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--primary)" }}
                  >
                    View Analysis
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--info)" }} />
        <div>
          <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Privacy Notice</h4>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            MedAgent processes your reports locally in your browser first. All Personal Identifiable Information (PII) like your name, phone number, and address are stripped before any medical data is sent to the AI for analysis. Your reports are never used to train our models.
          </p>
        </div>
      </div>
      
    </div>
  );
}
