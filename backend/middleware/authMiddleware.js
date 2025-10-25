import jwt from "jsonwebtoken";

export function verifyAccessToken(req, res, next) {
  const token = req.cookies?.[process.env.COOKIE_NAME || "token"];

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload; // { sub: userId, email, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
