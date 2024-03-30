const express = require("express");
const cookieParser = require("cookie-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const cors = require("cors");
const morgan = require("morgan");
const userAgent = require("express-useragent");
const dotEnv = require("dotenv");
const { mainRoutes } = require("./src/app.routes");
const notFoundHandler = require("./src/common/exeption/notFound.handler");
const allExceptionHandler = require("./src/common/exeption/allexeption.handler");
dotEnv.config();

async function main(){
    const app = express();
    const port = process.env.PORT;
    const baseUrl = process.env.BASEURL;
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser(process.env.TOKEN_SECRET_KEY));
    app.use(express.static("public"));
    app.use(expressEjsLayouts);
    app.set("view engine", "ejs");
    app.set("layout", "./layouts/dashboard/main.ejs");
    app.use(cors());
    app.use(morgan("dev"));
    app.use(userAgent.express());
    require("./src/config/mongoose.config");
    app.use(mainRoutes);
    notFoundHandler(app);
    allExceptionHandler(app);

    app.listen(port, () => {
        console.log(`Server On: ${baseUrl}:${port}`);
    });


};
main();