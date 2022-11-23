function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function setCookie(name, value, exp) {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); // 일
  let cookieText = escape(name) + "=" + escape(value);
  cookieText += exp
    ? "; EXPIRES=" + exp.toGMTString()
    : "; EXPIRES=" + date.toUTCString();
  document.cookie = cookieText;
}

async function getCookie(name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  sleep(100);
  return value ? unescape(value[2]) : null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}

export { setCookie, getCookie, deleteCookie };
