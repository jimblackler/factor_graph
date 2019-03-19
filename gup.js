// http://www.netlobo.com/url_query_string_javascript.html
export function gup(name, _default) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  const regexS = "[\\?&]" + name + "=([^&#]*)";
  const regex = new RegExp(regexS);
  const results = regex.exec(location.href);
  return results == null ? _default : results[1];
}