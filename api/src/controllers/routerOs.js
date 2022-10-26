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
    })
    .catch((err) => {
      // Got an error while trying to connect
      console.log(err.message);
    });
  // Connection closed
  await conn.close();
  return response;
};

module.exports = {
  getIps,
};
