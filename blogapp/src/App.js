/**import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
**/
import React, { useState } from "react";
import axios from "axios";
import './App.css';
function App() {
    const [prompt, setPrompt] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/generate", { prompt });
            setBlogContent(response.data.blog);
        } catch (error) {
            console.error("Error generating blog:", error);
        }
        setLoading(false);
    };
    const handleDownload = () => {
      // Create a Blob from the blog content
      const blob = new Blob([blogContent], { type: "text/html" });

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "blog.html"; // Name of the downloaded file
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up the temporary link
      document.body.removeChild(link);
  };
    return (
        <div style={{ padding: "20px" }}>
            <h1>AI Blog Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                rows="5"
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Blog"}
            </button>
          
            {blogContent && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Generated Blog:</h2>
                    <button onClick={handleDownload} style={{ marginTop: "10px" }}>
                        Download Blog as HTML
                    </button>
                    <div dangerouslySetInnerHTML={{ __html: blogContent }}
                      className="blog-content"
                     style={{ border: "1px solid #ccc", padding: "10px" }}/>
                     
                </div>
            )}
          </div>
    );
}

export default App;
