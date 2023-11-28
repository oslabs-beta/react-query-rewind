import React, { useEffect, useState } from 'react';
import { QueryKey } from '@tanstack/react-query';

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

type ChromeComponentProps = {
  queryData: QueryData;
};

type SelectedQueriesState = {
  [key: string]: boolean;
};

type QuerySnapshot = {
  [queryHash: string]: QueryEvent;
};

const ChromeComponent: React.FC<ChromeComponentProps> = ({ queryData }) => {
  const [querySnapshot, setQuerySnapshot] = useState<QuerySnapshot>({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedQueries, setSelectedQueries] = useState<SelectedQueriesState>(
    Object.keys(queryData).reduce((acc, queryName) => {
      acc[queryName] = false;
      return acc;
    }, {} as SelectedQueriesState)
  );

  const [combinedUpdates, setCombinedUpdates] = useState<QueryEvent[]>([]);

  const currentUpdate = combinedUpdates[currentIndex];

  useEffect(() => {
    // Combine updates from selected queries and sort them by timestamp
    const updates = Object.entries(queryData)
      .filter(([queryName]) => selectedQueries[queryName])
      .flatMap(([, data]) => data.updates)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    setCombinedUpdates(updates);
  }, [queryData, selectedQueries]);

  useEffect(() => {
    const initialSelection = Object.keys(queryData).reduce((acc, queryName) => {
      acc[queryName] = false; // Initially, all queries are unselected
      return acc;
    }, {} as SelectedQueriesState); // Cast the initial accumulator to SelectedQueriesState
    setSelectedQueries(initialSelection);
  }, [queryData]);

  useEffect(() => {
    // Initialize querySnapshot with the first update for each selected query
    const initialSnapshot: QuerySnapshot = {};
    Object.entries(queryData)
      .filter(([queryName]) => selectedQueries[queryName])
      .forEach(([queryName, data]) => {
        if (data.updates.length > 0) {
          initialSnapshot[queryName] = data.updates[0];
        }
      });
    setQuerySnapshot(initialSnapshot);
  }, [queryData, selectedQueries]);

  useEffect(() => {
    if (currentUpdate) {
      setQuerySnapshot(prevSnapshot => ({
        ...prevSnapshot,
        [currentUpdate.queryHash]: currentUpdate,
      }));
    }
  }, [currentUpdate]);

  const handleCheckboxChange = (queryName: string) => {
    setSelectedQueries(prev => ({ ...prev, [queryName]: !prev[queryName] }));
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, combinedUpdates.length - 1)
    );
  };

  return (
    <>
      <div className="select-query">
        {/* checkboxes */}
        {Object.keys(queryData).map(queryName => (
          <label key={queryName}>
            <input
              type="checkbox"
              checked={selectedQueries[queryName]}
              onChange={() => handleCheckboxChange(queryName)}
            />
            {queryName}
          </label>
        ))}
      </div>

      <div className="navigation">
        <button
          onClick={() => setCurrentIndex(0)}
          disabled={currentIndex === 0}
        >
          Start
        </button>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <span>
          {currentIndex + 1} / {combinedUpdates.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === combinedUpdates.length - 1}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentIndex(combinedUpdates.length - 1)}
          disabled={currentIndex === combinedUpdates.length - 1}
        >
          Latest
        </button>
      </div>

      <div className="data">
        {Object.entries(selectedQueries).map(([queryName, isSelected]) => {
          if (!isSelected) return null;
          const update = querySnapshot[queryName];

          return (
            <div key={queryName}>
              <h3>Query: {queryName}</h3>
              {update && (
                <>
                  <p>Event Type: {update.eventType}</p>
                  <p>Timestamp: {update.timestamp.toLocaleString()}</p>
                  {update.queryData && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      <strong>State:</strong>
                      <pre>{JSON.stringify(update.queryData, null, 2)}</pre>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChromeComponent;
