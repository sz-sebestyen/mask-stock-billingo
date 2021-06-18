const MyDatas = require("./models/myDatas");

module.exports = async function maskNumberChange(changeNumber) {
  console.log(" In maskNumberChange");
  const response = await MyDatas.updateOne(
    { selfID: "selfData" },
    { $inc: { number_of_masks: changeNumber } }
    // { upsert: true, new: true }
  );
  return response;
};
