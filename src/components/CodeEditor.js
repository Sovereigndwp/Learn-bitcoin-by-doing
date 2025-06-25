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
      // eslint-disable-next-line no-new-func
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
        // Show success message and provide a continue button
        setIsSuccess(true);
        setOutput(outputStr + "\n\nYou've successfully completed this challenge! Click Continue to move on.");
        onSuccess(result);
      }

    } catch (err) {
      let errorMsg = err.message || 'An error occurred';
      
      // Provide more helpful error messages
      if (errorMsg.includes('is not defined')) {
        const varName = errorMsg.split(' ')[0];
        errorMsg = `${errorMsg}\n\nHint: Make sure you're using the ${varName} function or variable correctly. Check for typos or missing imports.`;
      } else if (errorMsg.includes('is not a function')) {
        errorMsg = `${errorMsg}\n\nHint: Check that you're calling the function with the correct name and parameters.`;
      } else if (errorMsg.includes('unexpected token')) {
        errorMsg = `${errorMsg}\n\nHint: There might be a syntax error in your code. Check for missing brackets, parentheses, or semicolons.`;
      }
      
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
              <p className="error-message">{error}</p>
              <div className="error-tips">
                <p>Common solutions:</p>
                <ul>
                  <li>Check for syntax errors (missing brackets, quotes, etc.)</li>
                  <li>Verify you're using the correct function names</li>
                  <li>Make sure all variables are properly defined</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="code-output">
              {output || (isRunning ? 'Running...' : 'No output yet')}
              {isSuccess && !isRunning && (
                <button 
                  className="continue-button"
                  onClick={() => onSuccess && onSuccess()}
                  style={{ marginTop: '1rem' }}
                >
                  Continue
                </button>
              )}
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