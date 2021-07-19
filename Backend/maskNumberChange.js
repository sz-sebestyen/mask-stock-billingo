const MyDatas = require("./models/myDatas");

module.exports = async function maskNumberChange(changeNumber) {
  console.log(" In maskNumberChange");
  return MyDatas.updateOne(
    { selfID: "selfData" },
    { $inc: { number_of_masks: changeNumber } }
  );
};
