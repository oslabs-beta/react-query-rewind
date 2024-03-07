import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import jsondiffpatch from 'jsondiffpatch';
import '../css/jsonDiff.css';
import { JsonDiffType } from '../types';

const JsonDiff: React.FC<JsonDiffType> = ({
  oldJson,
  currentJson,
  isHidden,
}) => {
  // handle scenario where we're on the first state - getting currentJson but not oldJson
  if (currentJson === '')
    return (
      <Typography variant="body1" style={{ fontStyle: 'italic' }}>
        Initial state - no comparison available
      </Typography>
    );

  // get comparison obj
  const delta = jsondiffpatch.diff(oldJson, currentJson);
  // delta is undefined if the 2 objects are the exact same

  if (delta) {
    // Use library's html formatter that generates vanilla CSS
    const htmlFormatter = (jsondiffpatch as any).formatters.html;
    const htmlDiff = htmlFormatter.format(delta, oldJson);
    // React-specific functions to handle raw html
    const createMarkupHtml = () => ({ __html: htmlDiff });

    return (
      <div
        className={`json-diff-container ${
          isHidden ? 'jsondiffpatch-unchanged-hidden' : ''
        }`}
      >
        <Container>
          <div dangerouslySetInnerHTML={createMarkupHtml()}></div>
        </Container>
      </div>
    );
  }

  // handle errors - this is appearing when there is no change tho?
  return (
    <Typography variant="body1" style={{ fontStyle: 'italic' }}>
      QueryKey data not modified on this state change
    </Typography>
  );
};

export default JsonDiff;
