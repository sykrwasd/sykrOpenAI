import { useEffect, useState } from "react";
import "./App.css";
import BASE_URL from "../backend/config"; // make sure this points to your backend correctly

function App() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };


  const handleUpload = async () => {
    if (!file) {
      setError(true);
      setTimeout(() => setError(false), 1000);
      return;
    }
    setError(false);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const fileResponse = await fetch(`${BASE_URL}/addFile`, {
        method: "POST",
        body: formData,
      });

      if (!fileResponse.ok) {
        throw new Error(`Upload error! status: ${fileResponse.status}`);
      }

      const { text } = await fileResponse.json();

      // Call the summarize endpoint
      const summaryResponse = await fetch(`${BASE_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!summaryResponse.ok) {
        throw new Error(`Summary error! status: ${summaryResponse.status}`);
      }
   const { sum, message } = await summaryResponse.json();
    setAiResponse(message);





    } catch (error) {
      console.error("Error:", error);
      setAiResponse("⚠️ Something went wrong while processing your file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-6 flex flex-col items-center w-[50vw] h-[90vh]">
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg animate-fade-in">
            <strong className="font-bold">⚠️ Error:</strong>
            <span className="block sm:inline ml-2">
              No file attached. Please choose a file first.
            </span>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        🤖 <span>Resume Parser</span>
      </h1>

      <div className="w-[100%] max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        {/* Chat Window */}
        <div className="bg-gray-100 rounded-xl p-4 h-100 overflow-y-auto flex flex-col gap-3 text-sm">
          <div className="bg-blue-100 text-blue-900 p-3 rounded-2xl rounded-bl-sm w-fit max-w-[80%] shadow-sm">
            Upload your resume here!
          </div>

          {fileName && (
            <div className="bg-green-100 text-green-900 p-3 rounded-2xl rounded-br-sm w-fit max-w-[80%] self-end shadow-sm">
              📄 You selected: {fileName}
            </div>
          )}

          {isLoading && (
            <>
              <div className="bg-blue-100 text-blue-900 p-3 rounded-2xl rounded-bl-sm w-fit max-w-[80%] whitespace-pre-wrap shadow-sm">
                <div className="flex flex-row h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          )}

          {!isLoading && aiResponse && (
            <div className="bg-blue-100 text-blue-900 p-3 rounded-2xl rounded-bl-sm w-fit max-w-[80%] whitespace-pre-wrap shadow-sm">
              {aiResponse}              
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="flex flex-row items-center justify-center gap-3">
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow">
            <input type="file" onChange={handleChange} className="hidden" />
            Choose File
          </label>

          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
