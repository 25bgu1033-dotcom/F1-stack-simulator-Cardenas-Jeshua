class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }

    push(element) {
        this.items[this.count] = element
        this.count += 1
        return this.count - 1
    }

    pop() {
        if (this.count === 0) return undefined
        const removed = this.items[this.count - 1]
        this.items.length = this.count - 1
        this.count -= 1
        return removed
    }

    peek() {
        if (this.count === 0) return undefined
        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count === 0
    }

    size() {
        return this.count
    }

    print() {
        return this.items.join(' ')
    }

    clear() {
        this.items = []
        this.count = 0
        return this.items
    }
}

const stack = new Stack()

function showMessage(text, type) {
    $("#message")
        .removeClass("text-light text-warning text-info")
        .addClass(type || "text-light")
        .text(text)
}

$(document).ready(function () {
    const $input = $("#dataInput")
    let serial = 0

    function clearPeek() {
        $("#stack .push").removeClass("peeked")
    }

    function pushItem() {
        const value = $input.val().trim()
        if (value === "") {
            showMessage("Enter a value before pushing.", "text-warning")
            $input.focus()
            return
        }
        stack.push(value)
        clearPeek()
        const color = serial % 2 === 0 ? "bg-primary" : "bg-success"
        serial += 1
        $("<div>")
            .addClass("row push " + color)
            .attr("title", value)
            .text(value)
            .prependTo("#stack")
        $input.val("").focus()
        showMessage(`Pushed ${value}. ${stack.size()} element(s) in stack.`, "text-info")
    }

    function popItem() {
        const removed = stack.pop()
        if (removed === undefined) {
            showMessage("Stack is empty. Nothing to pop.", "text-warning")
            return
        }
        clearPeek()
        $("#stack .push").first().remove()
        $("<div>")
            .addClass("row pop text-bg-danger border border-light")
            .attr("title", removed)
            .text(removed)
            .prependTo("#popped")
        showMessage(`Popped ${removed}.`, "text-info")
    }

    function peekItem() {
        const top = stack.peek()
        if (top === undefined) {
            showMessage("Stack is empty. Nothing to peek.", "text-warning")
            return
        }
        clearPeek()
        $("#stack .push").first().addClass("peeked")
        showMessage(`Top element is ${top}.`, "text-info")
    }

    function clearStack() {
        stack.clear()
        $("#stack").empty()
        $("#popped").empty()
        $input.val("")
        showMessage("Stack cleared.", "text-info")
    }

    $("#pushBtn").on("click", pushItem)
    $("#popBtn").on("click", popItem)
    $("#peekBtn").on("click", peekItem)
    $("#clearBtn").on("click", clearStack)
    $input.on("keydown", function (e) {
        if (e.key === "Enter") pushItem()
    })
})
