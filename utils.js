import config from "./config.js"

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

function elt(name, attrs, ...children) {
    const dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr])
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

function drawGrid(level) {
    const { scale } = config;
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row => elt("tr", { style: `height: ${scale}px` },
        ...row.map(type => elt("td", { class: type })))
    ));
}

function drawActors(actors) {
    const { scale } = config;
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
    }))
}

export * from "./config.js";
export {drawActors, overlap, drawGrid, elt}