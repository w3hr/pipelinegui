function Pipelinegui() {

    Me = null;

    this.Current = {
        Div: {
            Id: null,
            Link: null
        }
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

}

Pipelinegui.prototype.createDiv = function () {
    var n = document.createElement('div');
    return n;
}

Pipelinegui.prototype.appendDiv = function (options) {
    var n = this.createDiv();
    n.classList.add('pipeLineDiv');

    var style = 'position: fixed; ';
    if (typeof options !== 'undefined') {
        if (typeof options.clientX !== 'undefined')
            style += 'left: ' + options.clientX + 'px;';
        if (typeof options.clientY !== 'undefined')
            style += 'top: ' + options.clientY + 'px;';
    }
    n.setAttribute('style', style);
    this.Current.Div.Link.appendChild(n);
}

Pipelinegui.prototype.mousedown = function (event) {

    document.oncontextmenu = function () {
        return false;
    };
    event.preventDefault();
    event.stopPropagation();

    var b = event.button;

    console.log(event);

    if (b === 0) { //left
        console.log(event.target);

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