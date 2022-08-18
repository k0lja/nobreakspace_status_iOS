const params = args.widgetParameter ? args.widgetParameter.split(",") : [];

const isDarkTheme = params?.[0] === 'dark';
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
 widget.backgroundColor = new Color('#1C1C1E');; 
}
widget.setPadding(padding, padding, padding, padding);

widget.url = 'https://status.chaotikum.org/';

const headerText = widget.addText("Nobreakspace Status");
headerText.font = Font.mediumSystemFont(16);
headerText.centerAlignText()
widget.addText("")
if (isDarkTheme) {
    headerText.textColor = new Color('#FFFFFF');
}

async function getData(){
  const url = 'https://status.chaotikum.org/spaceapi.json'
  const r = new Request( url )
  const body = await r.loadJSON()

  return body
}

async function createWidget() {

    let response = await getData()
    log(response)
    let isOpen = response.state.open
    let status = ""
    let statusColor = Color.black()
    if(isOpen){
        status = "Offen"
        statusColor = Color.green()
        
    } else {
        status = "Geschlossen"
        statusColor = Color.red()
    }
    const name = widget.addText( status )
    name.font = Font.mediumSystemFont(16);
    name.textColor = statusColor
    name.centerAlignText()

    let unixTimestamp = response.state.lastchange
    let lastChangeDate = new Date(unixTimestamp * 1000)
    const date = widget.addDate(lastChangeDate)
    date.applyTimerStyle()
    date.font = Font.mediumSystemFont(16);
    date.centerAlignText()

   if (isDarkTheme) {
     date.textColor = new Color('#FFFFFF');
   }
}

await createWidget()
Script.setWidget( widget )
Script.complete()