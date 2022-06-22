const textColor = Color.black()

if ( config.runsInWidget ) {
    const widget = await createWidget()
    Script.setWidget( widget )
    Script.complete()
}

async function getData(){
    const url = 'https://status.chaotikum.org/spaceapi.json';
    const r = new Request( url )
    const body = await r.loadJSON()

    return body
}

async function createWidget() {
    const widget = new ListWidget()

    let response = await getData();
    let status = response.state.open;
    let unixTimestamp = response.state.lastchange;
    let lastChangeDate = new Date(unixTimestamp * 1000);
    let lastChangeString = `${lastChangeDate.getMonth() + 1}/${lastChangeDate.getDate()} ${zeroPad(lastChangeDate.getHours())}:${zeroPad(lastChangeDate.getMinutes())}`

    const name = widget.addText( status )
    name.font = Font.boldSystemFont( 36 )
    name.centerAlignText()
    name.textColor = textColor



    const subscribersLabel = widget.addText( lastChange )
    subscribersLabel.font = Font.semiboldSystemFont( 26 )
    subscribersLabel.centerAlignText()
    subscribersLabel.textColor = textColor

    widget.addSpacer()

    let reloadStack = widget.addStack()
    reloadStack.layoutHorizontally()
    reloadStack.centerAlignContent()

    reloadStack.addSpacer()

    let reloadSymbol = SFSymbol.named("arrow.triangle.2.circlepath")
    let reloadImage = reloadStack.addImage(reloadSymbol.image)
    reloadImage.tintColor = Color.white()
    reloadImage.imageSize = new Size(8, 8)
    reloadImage.imageOpacity = 0.9
    reloadImage.centerAlignImage()

    reloadStack.addSpacer(2)


    reloadStack.addSpacer()

    const startColor = new Color("#c3c3c3")
    const endColor = new Color("#a4a4a4")
    const gradient = new LinearGradient()
    gradient.colors = [startColor, endColor]
    gradient.locations = [0.0, 1]
    widget.backgroundGradient = gradient

    return widget
}

function zeroPad(numToPad) {
    if (numToPad > 9) {
        return numToPad
    } else {
        return `0${numToPad}`
    }
}