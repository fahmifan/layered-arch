module.exports = {
  production: {
    url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/prod_mars_inventory',
  },
  development: {
    url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/dev_mars_inventory',
  },
  test: {
    url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test_mars_inventory',
  },
};
