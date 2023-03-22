import { CONTENT_TYPE } from "https://js.sabae.cc/CONTENT_TYPE.js";

export const handleWeb = async (publishDir, req, path, conninfo) => {
  try {
    const getRange = (req) => {
      const range = req.headers.get("Range");
      if (!range || !range.startsWith("bytes=")) {
        return null;
      }
      const res = range.substring(6).split("-");
      if (res.length === 0) {
        return null;
      }
      return res;
    };
    const calcPath = (path) => {
      if (path === "/" || path.indexOf("..") >= 0) {
        return "/index.html";
      }
      if (path.endsWith("/")) {
        return path + "index.html";
      }
      return path;
    };
    const fn = calcPath(path);
    const n = fn.lastIndexOf(".");
    const ext = n < 0 ? "html" : fn.substring(n + 1);
    let range = getRange(req);
    const [data, totallen, gzip] = await readFileRange(publishDir + fn, range);
    if (!range) {
      if (data.length != totallen) {
        range = [0, data.length - 1];
      }
    } else if (range[1] == "") {
      range[1] = parseInt(range[0]) + data.length - 1;
    }

    const ctype = CONTENT_TYPE[ext] || "text/plain";
    const headers = {
      "Content-Type": ctype,
      "Accept-Ranges": "bytes",
      "Content-Length": data.length,
      "Access-Control-Allow-Origin": "*",
      //"Access-Control-Allow-Headers": "*",
    };
    if (gzip) {
      headers["Content-Encoding"] = "gzip";
    }
    if (totallen == data.length) {
      range = null;
    }
    if (range) {
      headers["Content-Range"] = `bytes ${range[0]}-${range[1]}/${totallen}`;
    }
    return new Response(data, {
      status: range ? 206 : 200,
      headers
    });
  } catch (e) {
    if (path !== "/favicon.ico") {
      console.log(e);
      //console.log("err", path, e.stack);
    }
    return new Response("not found", { status: 404 });
  }
};

const DENO_BUF_SIZE = 32 * 1024;

const readFilePartial = async (fn, offset, len) => {
  const f = await Deno.open(fn);
  f.seek(offset, Deno.SeekMode.Start);
  const buf = new Uint8Array(len);
  const rbuf = new Uint8Array(DENO_BUF_SIZE);
  let off = 0;
  A: for (;;) {
    const rlen = await Deno.read(f.rid, rbuf);
    for (let i = 0; i < rlen; i++) {
      buf[off++] = rbuf[i];
      if (off == buf.length) {
        break A;
      }
    }
  }
  await Deno.close(f.rid);
  return buf;
};

//const RANGE_LEN = 1024 * 1024 * 10; // 10Mb
const RANGE_LEN = 1 * 1024 * 1024; // 1Mb
//const RANGE_LEN = 300 * 1024; // 300kb

const readFileRange = async (fn, range) => {
  let gzip = true;
  let data = null;
  let range0 = 0;
  let range1 = RANGE_LEN - 1;
  if (range) {
    range0 = parseInt(range[0]);
    if (range[1] != "") {
      range1 = parseInt(range[1]);
    } else {
      range1 += range0;
    }
  }
  let flen = 0;
  try {
    /* // unsupported gzip & range request
    //data = Deno.readFileSync(fn + ".gz");
    flen = (await Deno.stat(fn + ".gz")).size;
    if (range1 >= flen) {
      range1 = flen - 1;
    }
    data = await readFilePartial(fn + ".gz", range0, range1 - range0 + 1);
    */
    flen = (await Deno.stat(fn + ".gz")).size;
    if (flen < RANGE_LEN) {
      data = await Deno.readFile(fn + ".gz");
      return [data, data.length, gzip];
    }
  } catch (e) {
  }
  gzip = false;
  flen = (await Deno.stat(fn)).size;
  if (range1 >= flen) {
    range1 = flen - 1;
  }
  data = await readFilePartial(fn, range0, range1 - range0 + 1);
  return [data, flen, gzip];
};
