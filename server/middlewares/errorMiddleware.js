export const errorMiddleware = (err, req, res) => {
  // Handle the error here
  console.error(err);
  res.status(500).send("Something broke!");
};
