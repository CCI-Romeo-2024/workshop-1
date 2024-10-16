export class animateTable {
    constructor(tableSelector, rowSelector, anim) {
        this.boxes = []
        this.tableSelector = tableSelector
        this.rowSelector = rowSelector

        this.ease = anim;
    }

    setupAnimation() {
        let nodes = document.querySelectorAll(`${this.tableSelector} > ${this.rowSelector}`);

        nodes.forEach((node, i) => {
            // Initialize transforms on node
            TweenLite.set(node, { y: 0 });

            this.boxes[i] = {
                transform: node._gsTransform,
                x: node.offsetLeft,
                y: node.offsetTop,
                node
            };
        })
    }

    animate() {
        this.boxes.forEach((box) => {
            let lastX = box.x;
            let lastY = box.y;

            box.x = box.node.offsetLeft;
            box.y = box.node.offsetTop;

            // Continue if box hasn't moved
            if (lastX === box.x && lastY === box.y) return;

            // Reversed delta values taking into account current transforms
            let x = box.transform.x + lastX - box.x;
            let y = box.transform.y + lastY - box.y;

            // Tween to 0 to remove the transforms
            TweenLite.fromTo(box.node, 0.5, { x, y }, { x: 0, y: 0, ease: this.ease });
        })
    }
}