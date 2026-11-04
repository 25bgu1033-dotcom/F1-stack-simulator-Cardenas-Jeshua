class Queue {
    constructor() {
        this.items = {}
        this.head = 0
        this.tail = 0
    }

    enqueue(element) {
        this.items[this.tail] = element
        this.tail += 1
        return this.size() - 1
    }

    dequeue() {
        if (this.isEmpty()) return undefined
        const removed = this.items[this.head]
        delete this.items[this.head]
        this.head += 1
        return removed
    }

    peek() {
        if (this.isEmpty()) return undefined
        return this.items[this.head]
    }

    isEmpty() {
        return this.tail - this.head === 0
    }

    size() {
        return this.tail - this.head
    }

    print() {
        const out = []
        for (let i = this.head; i < this.tail; i++) out.push(this.items[i])
        return out.join(' ')
    }

    clear() {
        this.items = {}
        this.head = 0
        this.tail = 0
        return this.items
    }
}

const queue = new Queue()

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
        $("#queue .push").removeClass("peeked")
    }

    function enqueueItem() {
        const value = $input.val().trim()
        if (value === "") {
            showMessage("Enter a value before enqueueing.", "text-warning")
            $input.focus()
            return
        }
        queue.enqueue(value)
        clearPeek()
        const color = serial % 2 === 0 ? "bg-primary" : "bg-success"
        serial += 1
        $("<div>")
            .addClass("row push " + color)
            .attr("title", value)
            .text(value)
            .appendTo("#queue")
        $input.val("").focus()
        showMessage(`Enqueued ${value}. ${queue.size()} element(s) in queue.`, "text-info")
    }

    function dequeueItem() {
        const removed = queue.dequeue()
        if (removed === undefined) {
            showMessage("Queue is empty. Nothing to dequeue.", "text-warning")
            return
        }
        clearPeek()
        $("#queue .push").first().remove()
        $("<div>")
            .addClass("row pop text-bg-danger border border-light")
            .attr("title", removed)
            .text(removed)
            .appendTo("#dequeued")
        showMessage(`Dequeued ${removed} from the front.`, "text-info")
    }

    function peekItem() {
        const front = queue.peek()
        if (front === undefined) {
            showMessage("Queue is empty. Nothing to peek.", "text-warning")
            return
        }
        clearPeek()
        $("#queue .push").first().addClass("peeked")
        showMessage(`Front element is ${front}.`, "text-info")
    }

    function clearQueue() {
        queue.clear()
        $("#queue").empty()
        $("#dequeued").empty()
        $input.val("")
        showMessage("Queue cleared.", "text-info")
    }

    $("#enqueueBtn").on("click", enqueueItem)
    $("#dequeueBtn").on("click", dequeueItem)
    $("#peekBtn").on("click", peekItem)
    $("#clearBtn").on("click", clearQueue)
    $input.on("keydown", function (e) {
        if (e.key === "Enter") enqueueItem()
    })
})
