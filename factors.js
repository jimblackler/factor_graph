import {gup} from "./gup.js";

const graph = new Springy.Graph();

const up_to_element = document.getElementById("upto");

let factors = new Map();

function updateDiagram() {

  const up_to = up_to_element.value | 0;

  if (up_to != gup('u', 0)) {
    window.history.pushState({}, "", "?u=" + up_to);
  }

  for (let node of factors.values()) {
    graph.detachNode(node);
  }

  let new_factors = new Map();
  for (let n = 2; n <= up_to; n++) {
    if (up_to % n === 0) {
      if (factors.has(n)) {
        let node = factors.get(n);
        new_factors.set(n, node);
        factors.delete(n);
      } else {
        new_factors.set(n, graph.newNode({label: n}));
      }
    }
  }

  for (let node of factors.values()) {
    graph.removeNode(node);
  }

  factors = new_factors;

  for (let v of factors.keys()) {
    const factors2 = [];

    for (let f = v / 2 | 0; f > 1; f--) {
      if (v % f !== 0) {
        continue;
      }
      let factor_exists = false;
      for (let i = 0; i < factors2.length; i++) {
        if (factors2[i] % f === 0) {
          factor_exists = true;
          break;
        }
      }

      if (!factor_exists) {
        factors2.push(f);
        graph.newEdge(factors.get(v), factors.get(f), {length: 2});
      }
    }
  }
}

up_to_element.addEventListener("change", updateDiagram);

function set_input_from_url() {
  up_to_element.value = '' + gup('u', 56);
}
set_input_from_url();

window.addEventListener("popstate", evt => {
  set_input_from_url();
  updateDiagram();
});

updateDiagram();

$(() => {
  window.springy = $('#springy').springy({
    graph: graph
  });
});