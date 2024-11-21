import { useEffect, useRef } from "react";
import { Graph, Node, Edge } from '@antv/x6';

Graph.registerNode('custom-node', {
  markup: [{
    tagName: 'rect',
    selector: 'body',
  }, {
    tagName: 'text',
    selector: 'header',
    textContent: '这是头部'
  }, {
    tagName: 'text',
    selector: 'content',
    textContent: '这是身体'
  }, {
    tagName: 'text',
    selector: 'footer',
    textContent: '这是尾巴'
  }],
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
      refWidth: 1,
      refHeight: 1,
    },
    header: {
      stroke: 'red',
      fill: '#ff0000',
      x: 80,
      y: 30,
    },
    content: {
      stroke: 'green',
      fill: '#00ff00',
      x: 80,
      y: 60,
    },
    footer: {
      stroke: 'yellow',
      fill: '#0000ff',
      x: 80,
      y: 90,
    }
  }
}, true);

function Home() {
  const containerRef = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      autoResize: true,
      grid: true
    });

    const source = graph.addNode({
      id: 'source',
      label: 'source',
      data: { ipAddress: '127.0.0.1' },
      shape: 'custom-node',
    });

    const target = graph.addNode({
      id: 'target',
      label: 'target',
      data: { ipAddress: '127.0.0.2' },
      shape: 'custom-node',
    });

    const edge = graph.addEdge({
      source,
      target,
    });

    if (!edge.isNode()) {
      console.log('edge 不是节点');
    }

    source.position(50, 50);
    source.size(240, 120);
    source.angle(45);
    console.log('---box---', source.getBBox());

    target.position(450, 450);
    target.size(240, 120);

    graph.on('node:dblclick', function ({ node }) {
      // const { width, height } = node.size();
      // node.resize(width * 2, height * 2, { direction: 'bottom-right' });
      node.scale(1.2, 1.2);
    });
  }, []);

  return (
    <div ref={containerRef}></div>
  );
}

export default Home;
