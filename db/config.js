module.exports =
{ port: process.env.PORT || 3000,
  db: 'mongodb://localhost:27017/eiga_wdi_project_2',
  secret: process.env.SECRET || 'Himitsu'
};
