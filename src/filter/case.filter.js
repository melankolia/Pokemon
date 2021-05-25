import Vue from "vue";
// import Converter from '@/common/converter';
/**
 * Converts a snake case string to title case.
 * Example: snake_case => Snake Case
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter("snakeToTitle", str => {
  return (
    str &&
    str
      .split("_")
      .map(function(item) {
        return item.charAt(0).toUpperCase() + item.substring(1);
      })
      .join(" ")
  );
});

Vue.filter("camelToTitle", str => {
  return str
    ? str
        .replace(/([A-Z])/g, match => ` ${match}`)
        .replace(/^./, match => match.toUpperCase())
    : "";
});

Vue.filter("toTitle", str => {
  return (
    str &&
    str
      .split(" ")
      .map(function(item) {
        return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
      })
      .join(" ")
  );
});

Vue.filter("upperCase", str => {
  return str && str.toUpperCase();
});