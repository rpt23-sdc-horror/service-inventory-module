"use strict";

import app from "./routes";
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
