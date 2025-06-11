import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import './CodeEditor.css';

const CodeEditor = ({ 
  initialCode = '', 
  testFunction, 
  expectedOutput,
  onSuccess,
  onError,
  readonly = false,
  title = "Code Lab"
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setIsSuccess(false);

    try {
      // Create a function from the user's code
      const userFunction = new Function('return ' + code)();
      
      let result;
      if (testFunction) {
        // Run with test function
        result = await testFunction(userFunction);
      } else {
        // Direct execution
        result = await userFunction();
      }

      const outputStr = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
      setOutput(outputStr);

      // Check if output matches expected
      if (expectedOutput !== undefined) {
        const success = outputStr === expectedOutput || result === expectedOutput;
        setIsSuccess(success);
        
        if (success && onSuccess) {
          onSuccess(result);
        } else if (!success && onError) {
          onError('Output does not match expected result');
        }
      } else if (onSuccess) {
        onSuccess(result);
      }

    } catch (err) {
      const errorMsg = err.message || 'An error occurred';
      setError(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setIsSuccess(false);
  };

  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <h3 className="code-editor-title">{title}</h3>
        <div className="code-editor-actions">
          <button 
            onClick={resetCode}
            className="action-button reset-button"
            disabled={isRunning}
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button 
            onClick={runCode}
            className="action-button run-button"
            disabled={isRunning || readonly}
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <div className="code-editor-body">
        <div className="code-input-section">
          <label className="code-label">Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-textarea"
            placeholder="Write your code here..."
            disabled={readonly || isRunning}
            rows={8}
          />
        </div>

        <div className="code-output-section">
          <div className="output-header">
            <label className="output-label">Output:</label>
            {isSuccess && (
              <div className="success-indicator">
                <CheckCircle size={16} />
                Success!
              </div>
            )}
            {error && (
              <div className="error-indicator">
                <XCircle size={16} />
                Error
              </div>
            )}
          </div>
          
          {error ? (
            <div className="error-output">
              {error}
            </div>
          ) : (
            <div className="code-output">
              {output || (isRunning ? 'Running...' : 'No output yet')}
            </div>
          )}
        </div>
      </div>

      {expectedOutput !== undefined && (
        <div className="expected-output-section">
          <label className="expected-label">Expected Output:</label>
          <div className="expected-output">
            {typeof expectedOutput === 'object' ? JSON.stringify(expectedOutput, null, 2) : String(expectedOutput)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor; 