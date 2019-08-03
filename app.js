const express = require("express");
const app = express();
const path = require("path");
const logger = require("./middleware/logger");
const memberRouter = require("./routes/api/members");

const PORT = process.env.PORT || 2019;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use("/api/members", memberRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}..`));
