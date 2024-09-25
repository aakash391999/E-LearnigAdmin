import React, { useRef, useState } from "react";

const Settings = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [copied, setCopied] = useState(false);
  const editableDiv = useRef(null);

  const handlePaste = (e) => {
    e.preventDefault();
    const html = (e.clipboardData || window.clipboardData).getData("text/html");
    document.execCommand("insertHTML", false, html);
  };

  const getHTML = () => {
    const content = editableDiv.current.innerHTML;
    setHtmlContent(content);
    setShowCopyButton(true);
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Remove "Copied" message after 2 seconds
    });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-warning">Settings</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="notification" className="form-label">
                Notifications
              </label>
              <select className="form-select" id="notification">
                <option value="all">All Notifications</option>
                <option value="email">Email Only</option>
                <option value="none">No Notifications</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="privacy" className="form-label">
                Privacy Settings
              </label>
              <select className="form-select" id="privacy">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>
            <button type="submit" className="btn btn-warning">
              Save Settings
            </button>
          </form>
        </div>
      </div>

      <h1>HTML Input & Output</h1>
      <div
        id="editable"
        ref={editableDiv}
        contentEditable="true"
        onPaste={handlePaste}
        className="editable"
      >
        Paste your HTML content here...
      </div>

      <button onClick={getHTML} className="btn-primary">
        Get HTML Code
      </button>

      {htmlContent && (
        <div>
          <div id="output" className="output">
            {htmlContent}
          </div>

          {showCopyButton && (
            <button onClick={copyHTML} className="btn-primary">
              Copy HTML to Clipboard
            </button>
          )}

          {copied && <p className="copied">HTML code copied to clipboard!</p>}
        </div>
      )}
    </div>
  );
};

export default Settings;
