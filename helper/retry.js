const axios = require("axios");

class Retry {
  constructor(url, params = null, maxRetries = 3) {
    (this.url = url), (this.params = params), (this.maxRetries = maxRetries);
  }

  retryGet() {
    return new Promise(async (resolve, reject) => {
      let retries = 0;
      let success = false;
      let status;
      while (retries < this.maxRetries && !success && status != 404) {
        try {
          const response = await axios.get(
            this.params ? `${this.url}/${this.params}` : this.url
          );
          success = true;
          resolve(response.data);
          break;
        } catch (err) {
          status = err?.response?.status;
          console.log("status: ", status);
          retries > this.maxRetries
            ? console.log("Too many retries")
            : status == 404
            ? console.log(`Product doesn't exist.`)
            : console.log(`Cannot fetch data.Retry attempt ${retries}`);
        }
        retries++;
      }
      reject();
    });
  }

  retryPost(payload) {
    return new Promise(async (resolve, reject) => {
      let retries = 0;
      let success = false;
      while (retries < this.maxRetries && !success) {
        try {
          const response = await axios.post(this.url, payload);
          success = true;
          resolve(response.data);
        } catch (err) {
          const status = err?.response?.status || 500;
          retries > this.maxRetries
            ? console.log("Too many retries")
            : console.log(`Cannot Post data.Retry attempt ${retries}`);
        }
        retries++;
      }
      reject();
    });
  }

  retryDelete() {
    return new Promise(async (resolve, reject) => {
      let retries = 0;
      let success = false;
      let status;
      while (retries < this.maxRetries && !success && status != 404) {
        try {
          const response = await axios.delete(this.url);
          success = true;
          resolve(response.data);
        } catch (err) {
          status = err?.response?.status;
          console.log("status: ", status);
          retries > this.maxRetries
            ? console.log("Too many retries")
            : status == 404
            ? console.log(`Product doesn't exist.`)
            : console.log(`Cannot delete data.Retry attempt ${retries}`);
        }
        retries++;
      }
      reject();
    });
  }
}

module.exports = Retry;
