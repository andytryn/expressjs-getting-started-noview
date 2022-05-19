"use strict";

/*
|--------------------------------------------------------------------------
| Module dependencies.
|--------------------------------------------------------------------------
|
*/
const fetch = require("node-fetch");

module.exports = {

    /*
    | cURL: Post
    */
    Post: async (par_a, par_b, par_c, par_d, par_e, par_f) => {
        const setMethod = par_a || "null";
        const setURL = par_b || "null";
        const setHeader = par_c || "null";
        const setBody = par_d || "null";
        var setType, getData;

        if (par_e === "json") {
            setType = JSON.stringify(setBody);
        } else if (par_e === "urlencoded") {
            setType = new URLSearchParams(setBody)
        }
      
        const getOutput = await fetch(setURL, {
            method: setMethod,
            body: setType,
            headers: setHeader,
        });

        if (par_f === "json") {
            getData = await getOutput.json();
        } else if (par_f === "urlencoded") {
            getData = await getOutput.text()
        }

        await getData;
        return getData;
    },

    /*
    | cURL: Get
    */
    Get: async (par_a, par_b, par_c) => {
        const setMethod = par_a || "null";
        const setURL = par_b || "null";
        const setHeader = par_c || "null";
      
        const getOutput = await fetch(setURL, {
          method: setMethod,
          headers: setHeader,
        });
        const getData = await getOutput.json();
      
        await getData;
        return getData;
    },

};
