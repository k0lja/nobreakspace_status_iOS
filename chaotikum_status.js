const params = args.widgetParameter ? args.widgetParameter.split(",") : [];

const isDarkTheme = params?.[0] === 'dark';
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
 widget.backgroundColor = new Color('#1C1C1E');; 
}
widget.setPadding(padding, padding, padding, padding);

widget.url = 'https://status.chaotikum.org/';

const headerStack = widget.addStack();
headerStack.setPadding(0, 0, 25, 0);
const headerText = headerStack.addText("Nobreakspace Status");
headerText.font = Font.mediumSystemFont(16);
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
    const rowStack = widget.addStack();
    rowStack.setPadding(0, 0, 20, 0);
    rowStack.layoutHorizontally();

    let response = await getData()
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
    const name = rowStack.addText( status )
    name.font = Font.mediumSystemFont(16);

    let unixTimestamp = response.state.lastchange
    let lastChangeDate = new Date(unixTimestamp * 1000)
    const date = rowStack.addDate(lastChangeDate)
    date.applyTimerStyle()
    date.font = Font.mediumSystemFont(16);

   if (isDarkTheme) {
     date.textColor = new Color('#FFFFFF');
   }
}

const widget = await createWidget()
Script.setWidget( widget )
Script.complete()
