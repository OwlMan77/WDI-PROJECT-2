module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost:27017/cinemas',
  secret: process.env.SECRET || 'Himitsu'
};
