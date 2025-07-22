import React, { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";

// Web Worker for heavy calculations
const createWorker = () => {
  const workerCode = `
    self.onmessage = function(e) {
      const { iterations } = e.data;
      let sum = 0;
      
      // Perform heavy calculation
      for (let i = 0; i < iterations; i++) {
        sum += Math.sqrt(i);
        
        // Report progress every 100,000 iterations
        if (i % 100000 === 0) {
          self.postMessage({
            type: 'progress',
            progress: (i / iterations) * 100,
            currentSum: sum
          });
        }
      }
      
      // Send final result
      self.postMessage({
        type: 'complete',
        result: sum
      });
    };
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

interface HeavyComponentProps {
  iterations?: number;
}

// This component is heavy and should be lazy-loaded where used:
// const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
const HeavyComponent: React.FC<HeavyComponentProps> = ({ 
  iterations = 1e7 
}) => {
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startCalculation = useCallback(() => {
    setIsCalculating(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const worker = createWorker();
      
      worker.onmessage = (e) => {
        const { type, progress: workerProgress, result: workerResult } = e.data;
        
        if (type === 'progress') {
          setProgress(workerProgress);
        } else if (type === 'complete') {
          setResult(workerResult);
          setIsCalculating(false);
          setProgress(100);
          worker.terminate();
        }
      };
      
      worker.onerror = (error) => {
        setError('Calculation failed: ' + error.message);
        setIsCalculating(false);
        worker.terminate();
      };
      
      // Start the calculation
      worker.postMessage({ iterations });
      
    } catch (error) {
      // Fallback to main thread if Web Workers are not supported
      setError('Web Workers not supported, using main thread...');
      
      setTimeout(() => {
        let sum = 0;
        for (let i = 0; i < iterations; i++) {
          sum += Math.sqrt(i);
        }
        setResult(sum);
        setIsCalculating(false);
        setProgress(100);
      }, 10);
    }
  }, [iterations]);

  // Auto-start calculation on mount
  useEffect(() => {
    startCalculation();
  }, [startCalculation]);

  return (
    <Box 
      sx={{ 
        p: 3, 
        border: 1, 
        borderColor: 'divider', 
        borderRadius: 2,
        mt: 2,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Heavy Calculation Component
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Calculating square roots of {iterations.toLocaleString()} numbers using Web Workers
      </Typography>
      
      {isCalculating && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <CircularProgress 
            variant="determinate" 
            value={progress} 
            size={40} 
          />
          <Typography variant="body2">
            Progress: {Math.round(progress)}%
          </Typography>
        </Box>
      )}
      
      {error && (
        <Typography color="error" variant="body2" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}
      
      {result !== null && (
        <Box sx={{ my: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Calculation Result: {result.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Calculation completed in background thread
          </Typography>
        </Box>
      )}
      
      <Button 
        variant="outlined" 
        onClick={startCalculation}
        disabled={isCalculating}
        sx={{ mt: 2 }}
      >
        {isCalculating ? 'Calculating...' : 'Recalculate'}
      </Button>
    </Box>
  );
};

export default React.memo(HeavyComponent);

