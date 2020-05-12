/**
 * Создание HEX цвета из rgb от 0 до 100.
 * @param {String} hexString""
 * @param {Object} changes{b: 0,g:0,r:0}
 * @return {string}
 **/
function changeHexColor(hexString, changes = {
  r,
  g,
  b
}) {
  var clearHexString = hexString[0] == '#' ? hexString.substring(1) : hexString
  var arrayChange = [changes.r || 0, changes.g || 0, changes.b || 0]
  var hexColorsInRGB = clearHexString.match(/../g).map(function(hexCol, i) {
    let newHex = parseInt(hexCol, 16) + arrayChange[i]
    if (newHex > 255)
      newHex = 255
    if (newHex < 0)
      newHex = 0
    return newHex
  })
  var newHexStrin = hexColorsInRGB.reduce(function(acc, cur) {
    return acc += ""+cur.toString(16).padStart(2, "0")
  }, "")
  return "#" + newHexStrin
}

function changeMatterColor(MatterColorString, changes={
    r,
    g,
    b
}) {
  if(MatterColorString[0] == "#") return changeHexColor(MatterColorString,changes)
    var arrayChange = [changes.r || 0, changes.g || 0, changes.b || 0]
    // console.log(MatterColorString);
    var newColors = MatterColorString.match(/\d+/g).map(function(existColor, i) {
        // console.log(existColor + " " + arrayChange[i])
        let newColor = parseInt(existColor, 10) + arrayChange[i]
        if (newColor > 255) {
            return 255
        } else if (newColor < 0) {
            return 0
        }
        return newColor
    })
    var newHexStrin = newColors.reduce(function(acc, cur) {
        return acc += cur.toString(16).padStart(2, "0")
    }, "")
    return "#" + newHexStrin + ""
}
