export const isAdmin = (req, res, next) => {
  console.log("role:", req.session?.role);
  if (req.session?.role === "admin") {
    return next();
  }
  return next(new Error("NOT_ADMIN"));
};

export const isUser = (req, res, next) => {
  console.log("role:", req.session?.role);
  if (req.session?.role === "user") {
    return next();
  }
  return next(new Error("NOT_USER"));
};



