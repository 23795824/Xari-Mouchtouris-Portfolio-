const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const staticDir = __dirname;

// Serve the static site (for local preview)
app.use(express.static(staticDir));

// Fallback to index.html so deep links still work in dev
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Static preview available at http://localhost:${port}`);
});
