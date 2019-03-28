function Pipelinegui() {
    Me = null;
    this.Current = {
        Div: {
            Id: null,
            Link: null
        },
        ClickedDiv: null
    };
}

Pipelinegui.prototype.run = function (divid) {
    this.linkDiv(divid);
    this.addEventHandler();
    Pipelinegui.Me = this;
}

Pipelinegui.prototype.linkDiv = function (divid) {
    var div = document.getElementById(divid);
    if (div === null)
        throw "cannot find div with id " + divid;
    this.Current.Div.Id = divid;
    this.Current.Div.Link = div;
}

Pipelinegui.prototype.addEventHandler = function () {
    this.Current.Div.Link.addEventListener('mousedown', this.mousedown, false);
    this.Current.Div.Link.addEventListener('mouseup', this.mouseup, false);
    this.Current.Div.Link.addEventListener('mousemove', this.mousemove, false);
}

Pipelinegui.prototype.createDiv = function (headerText) {
    var dParent = document.createElement('div');
    var dHeader = document.createElement('div');
    var dBody = document.createElement('div');
    var dBodyLeft = document.createElement('div');
    var dBodyRight = document.createElement('div');
    var dTestDot = document.createElement('div');
    dTestDot.classList.add('dot');
    dHeader.setAttribute('title', 'boxHeader')
    dBodyLeft.classList.add('left');
    dBodyLeft.appendChild(dTestDot);
    dBodyRight.classList.add('right');
    dHeader.innerText = headerText;
    dParent.classList.add('pipeLineDiv');
    dHeader.classList.add('pipeLineDiv');
    dBody.classList.add('pipeLineDiv');
    dHeader.classList.add('header');
    dBody.appendChild(dBodyLeft);
    dBody.appendChild(dBodyRight);
    dBody.classList.add('body');
    dParent.appendChild(dHeader);
    dParent.appendChild(dBody);
    return dParent;
}

Pipelinegui.prototype.appendDiv = function (options) {
    var n = this.createDiv('TEST');
    this.moveDiv(n, options.clientX, options.clientY);
    this.Current.Div.Link.appendChild(n);
}

Pipelinegui.prototype.mousedown = function (event) {

    document.oncontextmenu = function () {
        return false;
    };

    event.preventDefault();
    event.stopPropagation();

    var b = event.button;
    var t = event.target;

    if (b === 0) { //left
        Pipelinegui.Me.setCurrentClickedDiv(t);
    } else if (b === 1) { //middle

    } else if (b === 2) { //right
        Pipelinegui.Me.appendDiv({
            clientX: event.clientX,
            clientY: event.clientY
        });
    } else {

    }

    return false;
}

Pipelinegui.prototype.mouseup = function (event) {
    Pipelinegui.Me.releaseCurrentClickedDiv();
}

Pipelinegui.prototype.mousemove = function (event) {
    if (Pipelinegui.Me.Current.ClickedDiv === null)
        return;
    Pipelinegui.Me.moveDiv(Pipelinegui.Me.Current.ClickedDiv, event.clientX, event.clientY);
}

Pipelinegui.prototype.setCurrentClickedDiv = function (div) {
    //ignore "parent" div
    if (typeof div.id === 'undefined' || div.id === this.Current.Div.Id)
        return;
    if (div.title !== 'boxHeader')
        return;
    this.Current.ClickedDiv = div.parentElement;
    this.Current.ClickedDiv.classList.add('drag');
}

Pipelinegui.prototype.releaseCurrentClickedDiv = function () {
    if (this.Current.ClickedDiv === null)
        return;
    Pipelinegui.Me.Current.ClickedDiv.classList.remove('drag');
    this.Current.ClickedDiv = null;
}

Pipelinegui.prototype.moveDiv = function (div, posx, posy) {
    var style = 'position: fixed; ';
    style += 'left: ' + posx + 'px;';
    style += 'top: ' + posy + 'px;';
    div.setAttribute('style', style);
}