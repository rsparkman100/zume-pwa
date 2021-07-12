import React from 'react';

/* 
  DOMParser builds a html document from the string provided.
  Our transpiled string is located inside the body element,
  so we take all of its child nodes (array-like object).

  Note: DOMParser can build a XML document as well, that's why we provide a type.
*/
const DOCUMENT_TYPE = 'text/html';
const getHTMLNodes = (string) =>
  new DOMParser().parseFromString(string, DOCUMENT_TYPE).body.childNodes;

/* 
  createJSX is a recursive function to build a React element for every child
  available in the node array. 

  Note: We need to build a node array first from the array-like object provided by DOMParser.
*/
const createJSX = (nodeArray) => {
  return nodeArray.map((node) => {
    const reactProps = {};
    const { attributes, localName, childNodes, nodeValue } = node;

    // localName is the html element name, if we don't have this then the nodeValue is pure text.
    if (!localName) return nodeValue;

    // Setting props from attributes
    if (attributes) {
      Array.from(attributes).forEach((attribute) => {
        if (attribute.name === 'style') {
          // Building inline styles object
          let styleAttributes = attribute.nodeValue.split(';');
          let styleObj = {};
          styleAttributes.forEach((attribute) => {
            let [key, value] = attribute.split(':');
            styleObj[key] = value;
          });
          reactProps[attribute.name] = styleObj;
        } else {
          reactProps[attribute.name] = attribute.nodeValue;
        }
      });
    }

    // BR elements doesn't have childs. We get an error if we try to force it.
    return localName !== 'br' ? (
      React.createElement(
        localName,
        reactProps,
        childNodes && Array.isArray(Array.from(childNodes))
          ? createJSX(Array.from(childNodes))
          : [],
      )
    ) : (
      <br />
    );
  });
};

export const useTranspiler = () => {
  return (string) => createJSX(Array.from(getHTMLNodes(string)));
};
