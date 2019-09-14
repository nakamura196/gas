function doGet(e) {
  //JSONオブジェクト格納用の入れ物
  var rowData = {};
  if (e.parameter == undefined) {
    //パラメータ不良の場合はundefinedで返す
    var getvalue = "undefined"
    //エラーはJSONで返すつもりなので
    rowData.value = getvalue;
    var result = JSON.stringify(rowData);
    return ContentService.createTextOutput(result);
  } else {
    payload = JSON.stringify(main())
    // payloadをreturnするだけではだめ
    // ContentServiceを利用して、responseを作成
    ContentService.createTextOutput()
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(payload);
    // return response-data
    return output;
  }
}

function main() {
  var sp_id = "17q2Fi_u4gtfyL_DGCdZnuO92w4QtZqkk3DDJXlg4D_U"
  var spreadsheet = SpreadsheetApp.openById(sp_id);
  var sheet = spreadsheet.getSheetByName("日本橋-品川 写真・画像一覧")
  
  var dat = sheet.getDataRange().getValues();
  
  var fields = {}
  for(var col_index = 0; col_index < dat[0].length; col_index++){
    var label = dat[0][col_index]
    fields[label] = col_index
  }
  
  var result = []
  
  for(var row_index = 1; row_index < dat.length; row_index++){
    var row = dat[row_index]
    
    var obj = {}
    result.push(obj)
    
    var label = row[fields["おおよその宿場名"]]
    var url = row[fields["画像のURL"]]
    var lat = row[fields["緯度"]]
    var long = row[fields["経度"]]
    var description = row[fields["メモ"]]
    
    obj.label = label
    obj.url = url
    obj.lat = lat
    obj.long = long
    obj.description = description
  }
  
  return result
  
}