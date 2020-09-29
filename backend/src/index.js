const express = require ("express");
const routes = require("./routes");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/**
 * Route / Feature
 */

 /**
  * Http methods:
  * 
  * GET: Search for information on the backend
  * POST: Create information on the backend
  * PUT: Change information on the backend
  *  DELETE: Deletes information on the backend
  */

  /**
   * Parameter types:
   * 
   * Query Params: Named parameters sent on the route after 
   *
   */

   /**
    * 

    /**
     * Driver: SELECT * FROM users
     * Query Builder: table ('users'). Select ('*'). Where ()
     */