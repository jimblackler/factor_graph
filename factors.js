import {gup} from "./gup.js";

const graph = new Springy.Graph();

const up_to_element = document.getElementById("upto");

const nodes = [];

function updateDiagram() {

  const up_to = up_to_element.value | 0;
  const number_factors = up_to - 1;

  if (up_to != gup('u', 0)) {
    window.history.pushState({}, "", "?u=" + up_to);
  }

  for (let n = 0; n < nodes.length; n++) {
    graph.detachNode(nodes[n]);
  }

  for (let n = nodes.length; n < number_factors; n++) {
    nodes.push(graph.newNode({label: n + 2}));
  }

  for (let n = number_factors; n < nodes.length; n++) {
    graph.removeNode(nodes[n]);
  }

  nodes.splice(number_factors, nodes.length - number_factors);

  for (let n = 0; n != number_factors; n++) {
    const v = n + 2;

    let f = Math.sqrt(v) | 0;
    while (f > 1) {
      const f2  = v / f;
      if (f2 == (f2 | 0)) {
        graph.newEdge(nodes[n], nodes[f2 - 2], {length: 2});

        if (f2 % f > 0) {
          graph.newEdge(nodes[n], nodes[f - 2], {length: 2});
        }
        break;
      }
      f--;
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