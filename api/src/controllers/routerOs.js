const RouterOSAPI = require("node-routeros").RouterOSAPI;
const USER = "admin";
const PASSWORD = "CM_helloisp!";

/**
 * Process connection to API RouterOs.
 * @important the connection always have to close.
 *
 */
const connection = (host) => {
  const conn = new RouterOSAPI({
    host,
    user: USER,
    password: PASSWORD,
    timeout: 30,
  });

  return conn;
};

/**
 * Process get IP/ARP of API RouterOs.
 * @important the connection always have to close.
 *
 */
const getIps = async (host) => {
  const conn = connection(host),
    response = [];
  await conn
    .connect()
    .then(async () => {
      // Connection successful
      await conn.write("/ip/arp/print").then((data) =>
        data.forEach((user) => {
          let arr = [
            user.address,
            user["mac-address"],
            user.interface,
            user.comment,
            user.disabled === "false" ? "ACTIVO" : "SUSPENDIDO",
          ];
          response.push(arr);
        })
      );
      // Connection closed
      await conn.close();
    })
    .catch(async (err) => {
      // Got an error while trying to connect
      console.log(`host ${host} - ${err.message}`);
      getIps(host);
    });

  return response;
};

module.exports = {
  getIps,
};
