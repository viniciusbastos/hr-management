import React, { useState } from 'react';
import axios from 'axios';

const AI: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post(import.meta.env.VITE_APP_API_URL+'/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessages(response.data.messages); // Adjust based on API response structure
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">PDF Chat App</h1>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button onClick={handleFileUpload} className="px-4 py-2 bg-blue-500 text-white rounded">Upload and Process PDF</button>
            <div className="chat mt-8 p-4 bg-white shadow-md rounded w-full max-w-2xl">
                {messages.map((message, index) => (
                    <div key={index} className="message mb-2 p-2 border-b border-gray-300">{message}</div>
                ))}
            </div>
        </div>
    );
}

export default AI;
