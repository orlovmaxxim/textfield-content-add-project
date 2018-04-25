export const addSubstr = (pos, str, oldStr) => {
  var beforeSubStr = oldStr.substring(0, pos);
  var afterSubStr = oldStr.substring(pos, oldStr.length);
  return beforeSubStr + str + afterSubStr;
}

export const noop = e => e.preventDefault();
