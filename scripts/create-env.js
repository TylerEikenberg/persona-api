const fs = require('fs');
fs.writeFileSync(
  '../.env',
  `MONGO_USERNAME=${process.env.MONGO_USERNAME}\n``MONGO_PASSWORD=${process.env.MONGO_PASSWORD}\n``MONGO_URL=${process.env.MONGO_URL}\n``NODE_ENV=${process.env.NODE_ENV}\n``PORT=${process.env.PORT}\n``SERVER_HOSTNAME=${process.env.URL}\n`
);
