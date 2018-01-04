var table = document.querySelector('.table');
var data = localStorage.mandala || [];

function fill(filldata) {
    var data = filldata;
    if (typeof filldata === 'string') {
        data = JSON.parse(filldata);
    }
    var trList = table.querySelectorAll('tr');
    [].forEach.call(trList, function (tr, idx) {
        var tdList = tr.querySelectorAll('td');
        [].forEach.call(tdList, function (td, indexTd) {
            td.querySelector('textarea').value = data[idx][indexTd];
        });
    });
}

function restore() {
    if (localStorage.bk === 'undefined') return true;
    fill(localStorage.bk);
    return true;
}

function init() {
    if (data && data.length) {
        fill(data);
    }
}

function reset() {
    if (confirm('모두 지우시겠습니까?')) {
        localStorage.bk = localStorage.mandala;
        localStorage.removeItem('mandala');
        var trList = table.querySelectorAll('tr');
        [].forEach.call(trList, function (tr, idx) {
            var tdList = tr.querySelectorAll('td');
            [].forEach.call(tdList, function (td, indexTd) {
                td.querySelector('textarea').value = '';
            });
        });
        return true;
    }
    return false;
}

function save(e) {
    if (e.target && e.target.nodeName === 'TEXTAREA') {
        data = [];

        var trList = table.querySelectorAll('tr');
        [].forEach.call(trList, function (tr, idx) {
            data.push([]);

            var tdList = tr.querySelectorAll('td');
            [].forEach.call(tdList, function (td) {
                data[idx].push(td.querySelector('textarea').value);
            });
        });

        localStorage.mandala = JSON.stringify(data);
    }
}

function prt() {
    window.print();
}

function getElementIndex(node) {
    var index = 0;
    while ((node = node.previousElementSibling)) {
        index++;
    }
    return index;
}

function focusMove(event) {
    var target = event.target;
    var td = target.parentNode;
    var tr = target.parentNode.parentNode;
    var e = event || window.event;
    var tdIndex = getElementIndex(td);
    var trIndex = getElementIndex(tr);

    if (e.keyCode == '38') {
        if (table.querySelectorAll('tr')[trIndex-1]) {
            table.querySelectorAll('tr')[trIndex-1].querySelectorAll('td')[tdIndex].querySelector('textarea').focus();
        }
    }
    else if (e.keyCode == '40') {
        if (table.querySelectorAll('tr')[trIndex+1]) {
            table.querySelectorAll('tr')[trIndex+1].querySelectorAll('td')[tdIndex].querySelector('textarea').focus();
        }
    }
    else if (e.keyCode == '37') {
        if (td.previousElementSibling) {
            td.previousElementSibling.querySelector('textarea').focus();
        }
    }
    else if (e.keyCode == '39') {
        if (td.nextElementSibling) {
            td.nextElementSibling.querySelector('textarea').focus();
        }
    }
}

init();

table.addEventListener('keydown', focusMove);
table.addEventListener('focusout', save);
document.querySelector('.print button').addEventListener('click', prt);
document.querySelector('.reset button').addEventListener('click', function (e) {
    if (reset(e)) {
        document.querySelector('.restore').style.display = '';
    }
});
document.querySelector('.restore button').addEventListener('click', function (e) {
    if (restore(e)) {
        // e.currentTarget.style.display = 'none';
    }
});
