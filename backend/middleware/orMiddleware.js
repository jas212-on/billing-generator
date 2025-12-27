// middlewares/orMiddleware.js
export const orMiddleware = (...middlewares) => {
  return (req, res, next) => {
    let index = 0;

    const run = () => {
      if (index >= middlewares.length) {
        return res.status(403).json({ message: "Access denied" });
      }

      middlewares[index](req, res, (err) => {
        if (!err) {
          // ✅ one middleware passed
          return next();
        }
        index++;
        run();
      });
    };

    run();
  };
};

