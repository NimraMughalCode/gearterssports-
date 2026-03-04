"use client"
import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';

export default function BulkUploadTest() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  // Handle file selection and update count
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setStatus(`Ready to upload ${selectedFiles.length} images.`);
  };

//   const handleBulkUpload = async () => {
//     if (files.length === 0) return alert("Please select files first");
    
//     setUploading(true);
//     setStatus("Uploading...");
//     const uploadedUrls = [];

//     for (const file of files) {
//       try {
//         const fileName = `bulk/${Date.now()}-${file.name}`;
        
//         const { data, error } = await supabase.storage
//           .from("product-images")
//           .upload(fileName, file);

//         if (error) throw error;

//         const { data: { publicUrl } } = supabase.storage
//           .from("product-images")
//           .getPublicUrl(fileName);

//         uploadedUrls.push({ name: file.name, url: publicUrl });
//         setStatus(`Uploaded ${uploadedUrls.length} of ${files.length}...`);
//       } catch (err) {
//         console.error("Upload failed for:", file.name, err.message);
//       }
//     }

//     generateCSV(uploadedUrls);
//     setUploading(false);
//     setStatus("Done! CSV downloaded.");
//   };

const handleBulkUpload = async () => {
    if (files.length === 0) return alert("Please select files first");
    
    setUploading(true);
    setStatus("Uploading...");
    
    // 1. Use a local array instead of relying on state during the loop
    const resultsBuffer = []; 

    for (const file of files) {
      try {
        const fileName = `bulk/${Date.now()}-${file.name}`;
        
        const { error } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        // 2. Push to our local buffer
        resultsBuffer.push({ name: file.name, url: publicUrl });
        
        setStatus(`Uploaded ${resultsBuffer.length} of ${files.length}...`);
      } catch (err) {
        console.error("Upload failed for:", file.name, err.message);
      }
    }

    // 3. Pass the local buffer directly to the CSV generator
    generateCSV(resultsBuffer);
    
    setUploading(false);
    setStatus(`Finished! Processed ${resultsBuffer.length} files.`);
  };

  const generateCSV = (data) => {
    if (data.length === 0) return;
    
    // Create CSV content
    const csvRows = ["File Name,Public URL"];
    data.forEach(item => {
      csvRows.push(`${item.name},${item.url}`);
    });
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    // Trigger download
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'uploaded_images.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Bulk Image Uploader</h1>
      
      <div style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '8px' }}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
        
        <p><strong>Total to upload:</strong> {files.length} products</p>
      </div>

      <button 
        onClick={handleBulkUpload} 
        disabled={uploading || files.length === 0}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: uploading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {uploading ? 'Processing...' : 'Upload & Generate CSV'}
      </button>

      {status && <p style={{ marginTop: '10px', color: '#555' }}>{status}</p>}
    </div>
  );
}